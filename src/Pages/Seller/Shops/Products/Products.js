import React, { useState, useEffect } from "react";
import { productAPI } from "../../../../Services/Api";
import ProductList from "../../../../Components/Products/ProductList/ProductList";
import Pagination from "../../../../Elements/Pageingation/Pageingation";
import { useNavigate } from "react-router-dom";

import ProductFilterBar from "../../../../Components/Products/ProductFilterBar/ProductFilterBar";

import "./style.css";

function Products() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    stockFilter: "all",
    categoryFilter: []
  });

  const pageSize = 8;

  // گرفتن محصولات با فیلترها
  useEffect(() => {
    fetchProducts();
  }, [currentPage, filters]);

  const fetchProducts = async () => {
    setLoading(true);

    try {

      const response = await productAPI.getProducts(
        currentPage,
        pageSize,
        filters.search,
        filters.stockFilter,
        filters.categoryFilter
      );

      setProducts(response.products);
      setTotalPages(response.totalPages);

    } catch (error) {
      console.error("خطا در دریافت محصولات:", error);
    } finally {
      setLoading(false);
    }
  };

  // دریافت فیلترهای جدید از فیلتر بار
  const handleFilterChange = (newFilters) => {
    setCurrentPage(1); // هر بار فیلتر عوض شد برو صفحه 1
    setFilters(newFilters);
  };

  const handleProductClick = (id) => {
    navigate("/shop/edit-product/" + id);
  };

  const handleProductEdit = (id, field, value) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, [field]: value } : p
      )
    );
  };

  return (
    <section className="h-full flex-1">

      {/* FILTER BAR */}
      <ProductFilterBar
        onFilterChange={handleFilterChange}
        onAddProduct={() => navigate("/shop/new-product")}
      />

      {/* PRODUCT LIST */}
      <div className="product-list w-full h-full my-2 p-2">
        {loading ? (
          <div className="w-full loading-spinner text-center">
            در حال بارگذاری...
          </div>
        ) : (
          <ProductList
            products={products}
            onProductClick={handleProductClick}
            onProductEdit={handleProductEdit}
          />
        )}
      </div>

      {/* PAGINATION */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        maxVisible={5}
        onPageChange={(page) => setCurrentPage(page)}
      />

    </section>
  );
}

export default Products;
