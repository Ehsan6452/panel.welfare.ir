// Components/Discount/ProductRow/ProductRow.jsx

import React, { useState } from "react";
import DiscountFields from "../DiscountField/DiscountFields";
import VariableRow from "../VariableRow/VariableRow";
import "./ProductRow.css";

function ProductRow({ product, parentValues, onChange }) {

  const [open, setOpen] = useState(false);

  const hasVariables = product.variables && product.variables.length > 0;

  const values = {
    startDate:   product.startDate   ?? parentValues.startDate   ?? "",
    endDate:     product.endDate     ?? parentValues.endDate     ?? "",
    minPrice:    product.minPrice    ?? parentValues.minPrice    ?? "",
    maxPrice:    product.maxPrice    ?? parentValues.maxPrice    ?? "",
    maxDiscount: product.maxDiscount ?? parentValues.maxDiscount ?? "",
  };

  const handleCheck = (e) =>
    onChange({ ...product, ...values, included: e.target.checked });

  const handleFields = (newVals) =>
    onChange({ ...product, ...newVals });

  const handleVariableChange = (updatedVar) => {
    const newVars = product.variables.map(v =>
      v.id === updatedVar.id ? updatedVar : v
    );
    onChange({ ...product, variables: newVars });
  };

  return (
    <div className={`product-row-wrapper ${!product.included ? "excluded" : ""}`}>

      {/* ردیف اصلی محصول */}
      <div className="pr-row">

        <label className="pr-checkbox">
          <input
            type="checkbox"
            checked={product.included ?? true}
            onChange={handleCheck}
          />
          <span>شامل تخفیف</span>
        </label>

        <span className="pr-name">
          <span className="pr-icon">📦</span>
          {product.title}
        </span>

        {product.included !== false && (
          <DiscountFields values={values} onChange={handleFields} />
        )}

        {hasVariables && (
          <button
            className={`pr-toggle ${open ? "open" : ""}`}
            onClick={() => setOpen(p => !p)}
            title="متغیرهای محصول"
          >
            <span className="pr-toggle-arrow">▼</span>
            <span className="pr-toggle-label">
              {open ? "بستن" : `${product.variables.length} متغیر`}
            </span>
          </button>
        )}

      </div>

      {/* لیست متغیرها */}
      {open && hasVariables && (
        <div className="pr-variables">
          {product.variables.map(variable => (
            <VariableRow
              key={variable.id}
              variable={variable}
              parentValues={values}
              onChange={handleVariableChange}
            />
          ))}
        </div>
      )}

    </div>
  );
}

export default ProductRow;
