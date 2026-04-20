// SingleProduct.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { categoryAPI, productAPI, variableAPI } from "../../../../Services/Api";
import ProductVariables from "../../../../Components/Products/ProductVariables/ProductVariables";
import ProductCategory from "../../../../Components/Products/ProductCategory/ProductCategory";
import ProductImageManager from "../../../../Components/Products/ProductGallery/ProductImageManager";
import Validation from "../../../../Validation/validation";
import InputField from "../../../../Elements/InputField/input";
import Button from "../../../../Elements/Button/Button";
import "./SingleProduct.css";

function SingleProduct({ productId = null }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const currentProductId = productId || id;

    // ------------ public states
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // image states
    const [mainImage, setMainImage] = useState(null);
    const [galleryImages, setGalleryImages] = useState([null, null, null, null]);
    const [isImageUploading, setIsImageUploading] = useState(false);

    // info states
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");

    // variables states
    const [variables, setVariables] = useState([]);
    const [attributes, setAttributes] = useState([]);
    const [attributeValues, setAttributeValues] = useState([]);

    // Categories
    const [allCategories, setAllCategories] = useState([]); 
    const [categories, setCategories] = useState([]);
    const [categorySearch, setCategorySearch] = useState("");
    const [categorySearchResults, setCategorySearchResults] = useState([]);
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);

    // Descriptions
    const [description, setDescription] = useState("");
    // --------------  Fetch attributes
    const fetchAttributes = async () => {
        try {
            const attrs = await variableAPI.getAttributes();
            const values = await variableAPI.getAllAttributeValues();

            setAttributes(attrs);
            setAttributeValues(values);
        } catch (error) {
            console.log("خطا در بارگزاری ویژگی های محصول : ", error);
        }
    };

    //---------------  Load product or empty
    useEffect(() => {
        const fetchCategories = async () => {
            const data = await categoryAPI.getCategories();
            setAllCategories(data);
            setCategorySearchResults(data);
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        fetchAttributes();
        if (currentProductId) {
        loadProduct();
        }
    }, [currentProductId]);

    const loadProduct = async () => {
        setIsLoading(true);
        try {
            console.log(currentProductId)
            const id = Number(currentProductId);
            const product = await productAPI.getProduct(id);
            if (product) {
                setMainImage(product.image.main);
                setGalleryImages([
                    ...product.image.gallery,
                    ...Array(4 - product.image.gallery.length).fill(null),
                ]);
                setTitle(product.title);
                setPrice(product.price);
                setStock(product.stock);
                setCategories(product.categories);
                setDescription(product.description);
                // اگر در بک‌اند همچنان نام فیلد variabels است، آن را همین‌طور نگه دار
            setVariables(product.variabels || product.variables || []);
            }
        } catch (error) {
            console.error("خطا در بارگذاری محصول:", error);
        }
        setIsLoading(false);
    };

    // Image handler functions
    const handleMainImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setIsImageUploading(true);

            // اینجا اگر API برای آپلود داری، صداش بزن
            // const uploadedUrl = await productApi.uploadImage(file);
            // setMainImage(uploadedUrl);

            const url = URL.createObjectURL(file); // موقت برای پیش‌نمایش
            setMainImage(url);
        } catch (err) {
            console.error(err);
        } finally {
            setIsImageUploading(false);
        }
    };

    const handleGalleryImageUpload = async (e, index) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setIsImageUploading(true);

            // اگر API داری:
            // const uploadedUrl = await productApi.uploadImage(file);

            const url = URL.createObjectURL(file); // موقت
            setGalleryImages((prev) => {
            const copy = [...prev];
            copy[index] = url;
            return copy;
            });
        } catch (err) {
            console.error(err);
        } finally {
            setIsImageUploading(false);
        }
    };

    // variables handler functions
    const addVariable = () => {
        setVariables([
            ...variables,
            {
                id: Date.now(),
                attributes: [
                    { attributeId: "", valueId: "" }
                ],
                price: "",
                stock: "",
            },
        ]);
    };

    const removeVariable = (id) => {
        setVariables(variables.filter((v) => v.id !== id));
    };

    const updateVariable = (id, field, value) => {
        setVariables(
            variables.map((v) =>
                v.id === id
                    ? {
                        ...v,
                        [field]: value,
                    }
                    : v
            )
        );
    };

    const addAttributeLayer = (variableId) => {
        setVariables((vars) =>
            vars.map((v) =>
                v.id === variableId
                    ? {
                        ...v,
                        attributes: [
                            ...v.attributes,
                            { attributeId: "", valueId: "" },
                        ],
                    }
                    : v
            )
        );
    };

    const removeAttributeLayer = (variableId, index) => {
        setVariables((vars) =>
            vars.map((v) =>
                v.id === variableId
                    ? {
                        ...v,
                        attributes: v.attributes.filter((_, i) => i !== index),
                    }
                    : v
            )
        );
    };

    const updateVariableAttribute = (variableId, index, field, value) => {
        setVariables((vars) =>
            vars.map((v) =>
                v.id === variableId
                    ? {
                        ...v,
                        attributes: v.attributes.map((attr, i) =>
                            i === index
                                ? {
                                        ...attr,
                                        [field]: value,
                                        ...(field === "attributeId"
                                            ? { valueId: "" }
                                            : {}),
                                    }
                                : attr
                        ),
                    }
                    : v
            )
        );
    };

    const getValuesForAttribute = (attributeId) => {
        if (!attributeId) return [];
        return attributeValues.filter(
            (v) => v.attributeId === Number(attributeId)
        );
    };

    // function for categories 
    const handleCategorySearch = (e) => {
        const value = e.target.value;
        setCategorySearch(value);

        if (!value.trim()) {
            setCategorySearchResults(allCategories);
            return;
        }

        const lower = value.toLowerCase();

        const filtered = allCategories
            .map((cat) => {
            const matchedSubs = cat.subCategories.filter((sub) =>
                sub.name.toLowerCase().includes(lower)
            );

            if (
                cat.name.toLowerCase().includes(lower) ||
                matchedSubs.length > 0
            ) {
                return {
                ...cat,
                subCategories:
                    matchedSubs.length > 0 ? matchedSubs : cat.subCategories,
                };
            }

            return null;
            })
            .filter(Boolean);

        setCategorySearchResults(filtered);
    };

    const toggleSubCategory = (mainId, subId) => {
        const exists = selectedSubCategories.find(
            (c) => c.mainCategoryId === mainId && c.subCategoryId === subId
        );

        if (exists) {
            setSelectedSubCategories((prev) =>
            prev.filter(
                (c) =>
                !(c.mainCategoryId === mainId && c.subCategoryId === subId)
            )
            );
        } else {
            setSelectedSubCategories((prev) => [
            ...prev,
            { mainCategoryId: mainId, subCategoryId: subId },
            ]);
        }
    };

    const addSelectedCategories = () => {
        if (selectedSubCategories.length === 0) return;

        const newCategories = [...categories];

        selectedSubCategories.forEach((item) => {
            const exists = newCategories.find(
            (c) =>
                c.mainCategoryId === item.mainCategoryId &&
                c.subCategoryId === item.subCategoryId
            );

            if (!exists) {
            newCategories.push(item);
            }
        });

        setCategories(newCategories);
        setSelectedSubCategories([]);
    };


    //---------------  validation form
    const validateForm = () => {
        const newErrors = {};

        const titleValidation = Validation.validate("title", title);
        if (!titleValidation.isValid) newErrors.title = titleValidation.error;

        const priceValidation = Validation.validate("price", price);
        if (!priceValidation.isValid) newErrors.price = priceValidation.error;

        const stockValidation = Validation.validate("stock", stock);
        if (!stockValidation.isValid) newErrors.stock = stockValidation.error;

        variables.forEach((variable) => {
            if (!variable.attributeId) {
                newErrors[`variable_${variable.id}_attribute`] =
                    "ویژگی را انتخاب کنید";
            }
            if (!variable.valueId) {
                newErrors[`variable_${variable.id}_value`] =
                    "مقدار را انتخاب کنید";
            }
            const varPriceValidation = Validation.validate(
                "price",
                variable.price
            );
            if (!varPriceValidation.isValid) {
                newErrors[`variable_${variable.id}_price`] =
                    varPriceValidation.error;
            }
            const varStockValidation = Validation.validate(
                "stock",
                variable.stock
            );
            if (!varStockValidation.isValid) {
                newErrors[`variable_${variable.id}_stock`] =
                    varStockValidation.error;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const productData = {
                title,
                price: Number(price),
                stock: Number(stock),
                image: {
                    main: mainImage,
                    gallery: galleryImages.filter((img) => img !== null),
                },
                variables: variables.map((v) => ({
                    attributeId: Number(v.attributeId),
                    valueId: Number(v.valueId),
                    price: Number(v.price),
                    stock: Number(v.stock),
                })),
                categories : categories,
                description: description
            };

            if (currentProductId) {
                await productAPI.updateProduct(
                    Number(currentProductId),
                    productData
                );
            } else {
                await productAPI.createProduct(productData);
            }

            navigate("/products");
        } catch (error) {
            console.error("خطا در ذخیره محصول:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const cancelSelectedCategories = () => {
        setSelectedSubCategories([]);
    };

    const removeCategory = (mainId, subId) => {
        setCategories((prev) =>
            prev.filter(
            (c) =>
                !(c.mainCategoryId === mainId && c.subCategoryId === subId)
            )
        );
    };

    const getCategoryLabel = (mainId, subId) => {
        const main = allCategories.find((c) => c.id === mainId);
        const sub = main?.subCategories.find((s) => s.id === subId);

        if (!main || !sub) return "";

        return `${main.name} - ${sub.name}`;
    };

    return (
        <form className="flex-1 single-product px-2">
            <div className="layout">
                {/* Product Images */}
                <div className="product-images">
                    <ProductImageManager mainImage={mainImage} galleryImages={galleryImages} onMainImageUpload={handleMainImageUpload}
                        onGalleryImageUpload={handleGalleryImageUpload} isLoading={isImageUploading} maxGalleryImages={4}/>
                </div>
                {/* Product Information */}
                <div className="product-information px-5">

                        <InputField label="عنوان محصول" value={title}
                            onChange={(e) => setTitle(e.target.value)} placeholder="عنوان محصول را وارد نمایید"
                            error={errors.title} className="w-full"/>

                    <div className="form-row w-full">
                        <InputField label="قیمت (تومان)" type="number" value={price}
                            onChange={(e) => setPrice(e.target.value)} placeholder="قیمت"
                            error={errors.price} className="flex-1"/>

                        <InputField label="موجودی" type="number" value={stock}
                            onChange={(e) => setStock(e.target.value)} placeholder="موجودی"
                            error={errors.stock} className="flex-1"/>
                    </div>

                    <ProductVariables
                        variables={variables}
                        attributes={attributes}
                        errors={errors}

                        addVariable={addVariable}
                        removeVariable={removeVariable}
                        updateVariable={updateVariable}

                        addAttributeLayer={addAttributeLayer}
                        removeAttributeLayer={removeAttributeLayer}
                        updateVariableAttribute={updateVariableAttribute}

                        getValuesForAttribute={getValuesForAttribute}
                    />

                </div>
            </div>


            <div className="product-detail p-2 my-2">
                
                <div className="product-category-box">
                    <ProductCategory
                        categorySearch={categorySearch}
                        handleCategorySearch={handleCategorySearch}
                        categories={categories}
                        allCategories={allCategories}
                        categorySearchResults={categorySearchResults}
                        selectedSubCategories={selectedSubCategories}
                        toggleSubCategory={toggleSubCategory}
                        addSelectedCategories={addSelectedCategories}
                        cancelSelectedCategories={cancelSelectedCategories}
                        removeCategory={removeCategory}
                        getCategoryLabel={getCategoryLabel}
                    />
                </div>


                <div className="product-description px-5">
                    <div className="form-group w-full">
                        <label className="my-2">معرفی محصول</label>
                        <textarea
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={errors.description ? "input-error" : ""}
                            placeholder="محصول خود را معرفی کنید و کمی درباره آن توضیح دهید ..."
                        />
                        {errors.title && (
                            <span className="error-message">{errors.description}</span>
                        )}
                    </div>
                </div> 
            
            </div>

            
            <div className="w-full form-actions">
                <Button onClick={handleSave}
                variant={currentProductId ? "update" : "save"}
                disabled={isLoading} className="mx-2">
                    {currentProductId ? "ویرایش محصول" : "ذخیره محصول"}
                </Button>

                <Button variant={currentProductId ? "delete" : "cancel"}
                onClick={handleSave} disabled={isLoading}
                className="mx-2">
                    {currentProductId ? "حذف محصول" : "انصراف"}
                </Button>
            </div>
        </form>
    );
}

export default SingleProduct;
