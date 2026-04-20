// Components/Discount/DiscountProducts/DiscountProducts.jsx

import React, { useState, useEffect } from "react";
import DiscountFields from "./DiscountField/DiscountFields";
import SubCategoryRow from "./SubCategoryRow/SubCategoryRow";
import ProductRow from "./ProductRow/ProductRow";
import { productAPI,discountAPI } from "../../Services/Api";
import "./DiscountProducts.css";


// ─── state اولیه خالی برای فیلدها ────────────────────────────────────────────
const emptyFields = {
  startDate: "", endDate: "",
  minPrice: "",  maxPrice: "", maxDiscount: "",
};

// ─── آماده‌سازی محصولات برای نمایش ────────────────────────────────────────────
function prepareProduct(p) {
  return {
    ...p,
    included: true,
    ...emptyFields,
    variables: (p.variables || []).map(v => ({
      ...v,
      label: v.label || `متغیر ${v.id}`,
      included: true,
      ...emptyFields,
    })),
  };
}

// ─── کامپوننت اصلی ────────────────────────────────────────────────────────
function DiscountProducts({ selectionResult, selectedCategory, allCategories }) {

  const [discountState, setDiscountState] = useState(null);
  const [existingId, setExistingId]       = useState(null);
  const [saving, setSaving]               = useState(false);
  const [saved, setSaved]                 = useState(false);
  const [open, setOpen]                   = useState(false);  

// ── بارگذاری اولیه ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!selectionResult) {
    setDiscountState(null);
    setExistingId(null);
    return;
    }
    loadInitialState();
  }, [selectionResult]);

  const loadInitialState = async () => {

      // حالت ۱: دسته اصلی → result آرایه‌ی id زیردسته‌هاست
    if (Array.isArray(selectionResult)) {
      const cat = selectedCategory;
      const existing = await discountAPI.getByTarget("category", cat.id);

      if (existing) {
        setExistingId(existing.id);
        setDiscountState(existing);
      } else {
        setExistingId(null);
        setDiscountState({
        type: "category",
        categoryId: cat.id,
        categoryName: cat.name,
        ...emptyFields,
        subCategories: cat.subCategories.map(s => ({
          ...s,
          included: true,
          ...Object.fromEntries(Object.keys(emptyFields).map(k => [k, null])),
          products: null,
          })),
        });
      }

    // حالت ۲: زیردسته → result یک عدد است
    } else if (typeof selectionResult === "number") {
      const existing = await discountAPI.getByTarget("subCategory", selectionResult);

      let subName = "";
      for (const cat of allCategories) {
        const found = cat.subCategories.find(s => s.id === selectionResult);
        if (found) { subName = found.name; break; }
      }

      if (existing) {
        setExistingId(existing.id);
        setDiscountState(existing);
      } else {
        setExistingId(null);
        setDiscountState({
        type: "subCategory",
        subCategoryId: selectionResult,
        subCategoryName: subName,
        included: true,
        ...emptyFields,
        products: null,
      });
      }

    // حالت ۳: محصول → result آبجکت محصول است
    } else if (selectionResult && typeof selectionResult === "object") {
      const product = selectionResult;
      const existing = await discountAPI.getByTarget("product", product.id);

      if (existing) {
      setExistingId(existing.id);
      setDiscountState(existing);
      } else {
      setExistingId(null);
      setDiscountState({
      type: "product",
      productId: product.id,
      productTitle: product.title,
      included: true,
      ...emptyFields,
      variables: (product.variables || []).map(v => ({
      ...v,
      label: v.label || `متغیر ${v.id}`,
      included: true,
      ...Object.fromEntries(Object.keys(emptyFields).map(k => [k, null])),
      })),
      });
      }
      }
  };

  // ── fetch محصولات یک زیردسته (پاس به SubCategoryRow) ─────────────────────
  const loadProductsForSub = async (subId) => {
    const res = await productAPI.getProducts(1, 100, "", "all", [subId]);
    return (res.products || []).map(prepareProduct);
  };

  // ── ذخیره ────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    setSaving(true);
    try {
      if (existingId) {
        await discountAPI.update(existingId, discountState);
      } else {
        const created = await discountAPI.create(discountState);
        setExistingId(created.id);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
    console.error("خطا در ذخیره:", e);
    } finally {
    setSaving(false);
    }
  };

  // ── آپدیت فیلدهای سطح اول ────────────────────────────────────────────────
  const handleTopFields = (newVals) =>
    setDiscountState(prev => ({ ...prev, ...newVals }));

    const handleSubChange = (updatedSub) =>
    setDiscountState(prev => ({
    ...prev,
    subCategories: prev.subCategories.map(s =>
    s.id === updatedSub.id ? updatedSub : s
    ),
  }));

// ── وضعیت باقی‌مانده تخفیف ────────────────────────────────────────────────
  const remaining = discountState ? getRemainingDays(discountState.endDate) : null;

  if (!discountState) return null;

  const topValues = {
    startDate:   discountState.startDate,
    endDate:     discountState.endDate,
    minPrice:    discountState.minPrice,
    maxPrice:    discountState.maxPrice,
    maxDiscount: discountState.maxDiscount,
  };

// ─── هلپر: محاسبه روزهای باقی‌مانده ─────────────────────────────────────────
  function getRemainingDays(endDateStr) {
    if (!endDateStr) return null;
    try {
      const [y, m, d] = endDateStr.split("/").map(Number);
      // تبدیل تقریبی جلالی به میلادی
      const endDate = new Date(y - 621, m - 1, d);
      const diff = Math.ceil((endDate - Date.now()) / (1000 * 60 * 60 * 24));
      return diff;
    } catch {
      return null;
    }
  }
// ══════════════════════════════════════════════════════════════════════════
    return (
      <div className="discount-products">

        {/* ── نوار وضعیت تخفیف موجود ── */}
        {existingId && (
          <div className="dp-status-bar">
            <span className="dp-status-edit">✏️ ویرایش تخفیف موجود</span>
            {remaining !== null && (
              <span className={`dp-remaining ${remaining <= 3 ? "urgent" : remaining < 0 ? "expired" : ""}`}>
                {remaining < 0
                ? "⚠️ منقضی شده"
                : remaining === 0
                ? "⚠️ آخرین روز"
                : `⏳ ${remaining} روز مانده`}
              </span>
            )}
          </div>
        )}

        {/* ════════════════════════
        حالت ۱ — دسته اصلی
        ════════════════════════ */}
        {discountState.type === "category" && (
        <div className="dp-block">

        {/* هدر دسته اصلی */}
        <div className="dp-header category-level">
        <span className="dp-icon">🗂️</span>
        <span className="dp-title">{discountState.categoryName}</span>

        <div className="dp-fields-wrap">
        <DiscountFields values={topValues} onChange={handleTopFields} />
        </div>

        <div className="dp-actions">
        <button
        className={`dp-save-btn ${saved ? "saved" : ""}`}
        onClick={handleSave}
        disabled={saving}
        >
        {saving ? "ذخیره..." : saved ? "✅ ذخیره شد" : "اعمال تخفیف"}
        </button>

        <button
        className={`dp-arrow-btn ${open ? "open" : ""}`}
        onClick={() => setOpen(p => !p)}
        title="زیردسته‌ها"
        >
        ▼
        </button>
        </div>
        </div>

        {/* زیردسته‌ها */}
        {open && (
        <div className="dp-children">
        {discountState.subCategories.map(sub => (
          console.log(sub),
        <SubCategoryRow
        key={sub.id}
        sub={sub}
        parentValues={topValues}
        onChange={handleSubChange}
        onLoadProducts={loadProductsForSub}
        />
        ))}
        </div>
        )}

        </div>
        )}

        {/* ════════════════════════
        حالت ۲ — زیردسته
        ════════════════════════ */}
        {discountState.type === "subCategory" && (
        <div className="dp-block">
        <SubCategoryRow
        sub={{
        id:          discountState.subCategoryId,
        name:        discountState.subCategoryName,
        included:    discountState.included,
        startDate:   discountState.startDate,
        endDate:     discountState.endDate,
        minPrice:    discountState.minPrice,
        maxPrice:    discountState.maxPrice,
        maxDiscount: discountState.maxDiscount,
        products:    discountState.products,
        }}
        parentValues={{}}
        onChange={(updated) =>
        setDiscountState(prev => ({
        ...prev,
        ...updated,
        type: "subCategory",
        subCategoryId:   prev.subCategoryId,
        subCategoryName: prev.subCategoryName,
        }))
        }
        onLoadProducts={loadProductsForSub}
        />

        <div className="dp-standalone-action">
        <button
        className={`dp-save-btn ${saved ? "saved" : ""}`}
        onClick={handleSave}
        disabled={saving}
        >
        {saving ? "ذخیره..." : saved ? "✅ ذخیره شد" : "اعمال تخفیف"}
        </button>
        </div>
        </div>
        )}

        {/* ════════════════════════
        حالت ۳ — محصول
        ════════════════════════ */}
        {discountState.type === "product" && (
        <div className="dp-block">
        <ProductRow
        product={{
        id:          discountState.productId,
        title:       discountState.productTitle,
        included:    discountState.included,
        startDate:   discountState.startDate,
        endDate:     discountState.endDate,
        minPrice:    discountState.minPrice,
        maxPrice:    discountState.maxPrice,
        maxDiscount: discountState.maxDiscount,
        variables:   discountState.variables,
        }}
        parentValues={{}}
        onChange={(updated) =>
        setDiscountState(prev => ({
        ...prev,
        ...updated,
        type:         "product",
        productId:    prev.productId,
        productTitle: prev.productTitle,
        }))
        }
        />

        <div className="dp-standalone-action">
        <button
        className={`dp-save-btn ${saved ? "saved" : ""}`}
        onClick={handleSave}
        disabled={saving}
        >
        {saving ? "ذخیره..." : saved ? "✅ ذخیره شد" : "اعمال تخفیف"}
        </button>
        </div>
        </div>
        )}

      </div>
    );
}

export default DiscountProducts;
