import React, { useEffect, useState } from "react";
import { shopAPi , productAPI} from "../../../Services/Api"; 
import ImageUploadCard from "../../../Elements/ImageUploadCard/ImageUploadCard";
import InputFiled from "../../../Elements/InputField/input";
import ProductList from "../../../Components/Products/ProductList/ProductList";
import ProductFilterBar from "../../../Components/Products/ProductFilterBar/ProductFilterBar";
import "./shop.css"
import { Navigate } from "react-router-dom";
function Shop() {

    const [shopProfile, setShopProfile]= useState({});
    const [productList , setProducts]= useState([]);

    useEffect(()=>{
        const fetchSopProfile = async () =>{
            try{
                const data = await shopAPi.getShop();
                setShopProfile(data);
            }catch(error){
                console.log("fetch shop info faild : ", error);
            }
        }
        const fetchProducts = async () =>{
            try {
                const data = await productAPI.getProducts(1,4);
                setProducts(data.products);
                console.log(productList);
            } catch (error) {
                console.log('fetch products faild : ', error);
            }
        }
        fetchProducts();

        fetchSopProfile();
    },[])

    const handleProductClick = (id) => {
        Navigate("/shop/edit-product/" + id);
    };

    const handleProductEdit = (id, field, value) => {
        setProducts(prev =>
        prev.map(p =>
            p.id === id ? { ...p, [field]: value } : p
        )
        );
    };
    return (
        <section className="flex-1 shop">
                <div className="flex w-full shop-info p-0">
                    <div className="flex profile-image h-80">
                        <ImageUploadCard imageUrl={shopProfile.image} className="rounded" label="تنظیم تصویر پروفایل"/>
                    </div>
                    <div className="flex profile-info h-80 px-5">
                        <InputFiled value={shopProfile.name} label="نام فروشگاه" placeholder="نام فروشگاه شما که مشتریان نمایش داده می شود." type="text" inputClassName="w-mid"/>
                        <InputFiled value={shopProfile.description} label="توضیحات فروشگاه" placeholder="فروشگاه خود را معرفی کنید و کمی در مورد کسب و کار خود برای مشتریان توضیح دهید." type="textarea" className="h-full" inputClassName="h-full "/>
                    </div>
                    <div className="flex profile-badg h-20">
                        <div className="badg mx-3 p-4 flex">
                            {shopProfile.rate}
                        </div>
                        <div className="badg mx-3 p-4 flex">
                            {shopProfile.saleCount}
                        </div>
                        <div className="badg mx-3 p-4 flex">
                            {shopProfile.productCount}
                        </div>
                        <div className="badg mx-3 p-4 flex">
                            {shopProfile.activeTime}
                        </div>
                    </div>
                </div>
                <div className="flex w-full shop-products pt-3">
                    <ProductList products={productList} onProductClick={handleProductClick} onProductEdit={handleProductEdit}/>
                </div>
        </section>
    )

}

export default Shop;