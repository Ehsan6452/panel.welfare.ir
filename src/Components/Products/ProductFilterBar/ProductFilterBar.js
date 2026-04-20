import React, { useEffect, useState } from "react";
import { categoryAPI } from "../../../Services/Api";
import CategorySelect from "../CustomCategorySelect/CustomCategorySelect";
import Button from "../../../Elements/Button/Button";
import InputField from "../../../Elements/InputField/input";

function ProductFilterBar({ onFilterChange, onAddProduct }) {

  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [stockFilter, setStockFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [selectValue, setSelectValue] = useState("");

  // دریافت دسته بندی ها
  useEffect(() => {
    (async () => {
      const result = await categoryAPI.getCategoriesInUse();
      setCategories(result);
    })();
  }, []);

  // ارسال فیلترها به والد
  useEffect(() => {
    onFilterChange({
      search,
      stockFilter,
      categoryFilter
    });
  }, [search, stockFilter, categoryFilter]);

  const handleCategoryChange = (result, rawValue) => {

    setSelectValue(rawValue);

    if (!result || result.length === 0) {
      setCategoryFilter([]);
      return;
    }

    setCategoryFilter(Array.isArray(result) ? result : [result]);
  };

  return (
    <div className="filters-bar w-full">

      <Button onClick={onAddProduct} variant="add">
        افزودن محصول
      </Button>

      <div className="search-wrapper">
        <span className="mx-3">🔍</span>

        <input
          type="text"
          placeholder="جستجو بر اساس نام محصول..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <CategorySelect
        categories={categories}
        value={selectValue}
        onChange={handleCategoryChange}
        className="my-4"
      />

      <div className="stock-filter">
        {[
          { value: "all", label: "همه" },
          { value: "inStock", label: "✅ موجود" },
          { value: "outOfStock", label: "❌ ناموجود" },
        ].map(option => (

          <button
            key={option.value}
            className={`filter-btn ${stockFilter === option.value ? "active" : ""}`}
            onClick={() => setStockFilter(option.value)}
          >
            {option.label}
          </button>

        ))}
      </div>

    </div>
  );
}

export default ProductFilterBar;
