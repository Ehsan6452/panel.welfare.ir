import React, { useEffect, useState, useRef } from "react";
import { productAPI, categoryAPI } from "../../../../Services/Api";
import CategorySelect from "../../../../Components/Products/CustomCategorySelect/CustomCategorySelect";
import DiscountProducts from "../../../../Components/Discount/DiscountProducts"
import "./Discount.css";

function Discount() {

    const [categories, setCategories] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState([]);
    const [selectValue, setSelectValue] = useState("");
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [selectionResult, setSelectionResult] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [allCategories, setAllCategories] = useState([]);

    const dropdownRef = useRef(null);

    useEffect(() => {
        (async () => {
            const cats = await categoryAPI.getCategoriesInUse();
            setAllCategories(cats);
        })();
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        (async () => {
            const result = await categoryAPI.getCategoriesInUse();
            setCategories(result);
        })();
    }, []);

    useEffect(() => {
        const fetchSearchResults = async () => {
            setLoading(true);
            try {
                const data = await productAPI.getProducts(1, 100, searchQuery, "", []);
                setSearchResults(data.products);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchSearchResults();
    }, [searchQuery]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleFocus = () => {
        setIsDropdownOpen(true);
    };

    const formatPrice = (price) => {
        return price.toLocaleString("fa-IR") + " تومان";
    };


    const handleCategoryChange = (result) => {

    if (!result || (Array.isArray(result) && result.length === 0)) {
        setSelectionResult(null);
        setSelectedCategory(null);
        return;
    }
    setSelectionResult(result);

    // پیدا کردن آبجکت دسته اصلی برای نمایش نام
    if (Array.isArray(result)) {
        // دسته اصلی انتخاب شده، result = [subId1, subId2, ...]
        const cat = allCategories.find(c =>
        c.subCategories.some(s => result.includes(s.id))
        );
        setSelectedCategory(cat || null);
    } else {
        setSelectedCategory(null);
    }
    };

    // handleSelectProduct:
    const handleSelectProduct = (product) => {
    setSelectionResult(product);   // آبجکت کامل محصول
    setSelectedCategory(null);
    };

    return (
        <section className="flex-1 flex Discount">

            <div className="w-full flex Discount-Filter">
                <div className="search-wrapper px-3" ref={dropdownRef}>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="جستجوی محصول..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onFocus={handleFocus}
                    />

                    {isDropdownOpen && (
                        <div className="search-dropdown">
                            {loading ? (
                                <div className="search-loading">در حال جستجو...</div>
                            ) : searchResults.length === 0 ? (
                                <div className="search-empty">محصولی یافت نشد</div>
                            ) : (
                                searchResults.map((product) => (
                                    <div
                                        key={product.id}
                                        className="search-item"
                                        onClick={() => handleSelectProduct(product)}
                                    >
                                        <img
                                            src={product.image.main}
                                            alt={product.title}
                                            className="search-item-image"
                                        />
                                        <div className="search-item-info">
                                            <span className="search-item-title">
                                                {product.title}
                                            </span>
                                            <span className="search-item-price">
                                                {formatPrice(product.price)}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>

                <CategorySelect
                    categories={categories}
                    value={selectValue}
                    onChange={handleCategoryChange}
                    placeholder="دسته بندی را انتخاب کنید"
                    className="filter-category-select my-5 mx-2"
                />

            </div>

            <div className="w-full Discount-Products">
                <DiscountProducts
                selectionResult={selectionResult}
                selectedCategory={selectedCategory}
                allCategories={allCategories}
                />
            </div>

        </section>
    );
}

export default Discount;
