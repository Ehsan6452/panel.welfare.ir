// Components/Discount/SubCategoryRow/SubCategoryRow.jsx

import React, { useState } from "react";
import DiscountFields from "../DiscountField/DiscountFields";
import ProductRow from "../ProductRow/ProductRow";
import "./SubCategoryRow.css";

function SubCategoryRow({ sub, parentValues, onChange, onLoadProducts }) {
  /**
   * Props:
   *  sub           → { id, name, included, startDate, endDate, minPrice, maxPrice, maxDiscount, products }
   *  parentValues  → مقادیر دسته والد برای fallback
   *  onChange      → callback با sub جدید
   *  onLoadProducts → (subId) => Promise<products[]>  برای fetch محصولات
   */

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const values = {
    startDate:   sub.startDate   ?? parentValues.startDate   ?? "",
    endDate:     sub.endDate     ?? parentValues.endDate     ?? "",
    minPrice:    sub.minPrice    ?? parentValues.minPrice    ?? "",
    maxPrice:    sub.maxPrice    ?? parentValues.maxPrice    ?? "",
    maxDiscount: sub.maxDiscount ?? parentValues.maxDiscount ?? "",
  };

  const handleToggle = async () => {
    // اولین بار که باز میشه محصولات رو لود میکنه
    if (!open && !sub.products) {
      setLoading(true);
      try {
        const products = await onLoadProducts(sub.id);
        onChange({ ...sub, products });
      } catch (e) {
        console.error("خطا در بارگذاری محصولات:", e);
      } finally {
        setLoading(false);
      }
    }
    setOpen(p => !p);
  };

  const handleCheck = (e) =>
    onChange({ ...sub, ...values, included: e.target.checked });

  const handleFields = (newVals) =>
    onChange({ ...sub, ...newVals });

  const handleProductChange = (updatedProduct) => {
    const newProducts = (sub.products || []).map(p =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    onChange({ ...sub, products: newProducts });
  };

  return (
    <div className={`subcategory-row-wrapper ${!sub.included ? "excluded" : ""}`}>

      {/* ردیف اصلی زیردسته */}
      <div className="scr-row">

        <label className="scr-checkbox">
          <input
            type="checkbox"
            checked={sub.included ?? true}
            onChange={handleCheck}
          />
          <span>شامل تخفیف</span>
        </label>

        <span className="scr-name">
          <span className="scr-icon">📂</span>
          {sub.name}
        </span>

        {sub.included !== false && (
          <DiscountFields values={values} onChange={handleFields} />
        )}

        <button
          className={`scr-toggle ${open ? "open" : ""}`}
          onClick={handleToggle}
          disabled={loading}
        >
          {loading ? (
            <span className="scr-loading">در حال بارگذاری...</span>
          ) : (
            <>
              <span className="scr-toggle-arrow">▼</span>
              <span className="scr-toggle-label">
                {open
                  ? "بستن"
                  : sub.products
                    ? `${sub.products.length} محصول`
                    : "مشاهده محصولات"
                }
              </span>
            </>
          )}
        </button>

      </div>

      {/* لیست محصولات */}
      {open && sub.products && (
        <div className="scr-products">
          {sub.products.length === 0 ? (
            <p className="scr-empty">محصولی در این زیردسته وجود ندارد.</p>
          ) : (
            sub.products.map(product => (
              <ProductRow
                key={product.id}
                product={product}
                parentValues={values}
                onChange={handleProductChange}
              />
            ))
          )}
        </div>
      )}

    </div>
  );
}

export default SubCategoryRow;
