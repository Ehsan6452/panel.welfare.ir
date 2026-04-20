// Components/Discount/VariableRow/VariableRow.jsx

import React from "react";
import DiscountFields from "../DiscountField/DiscountFields";
import "./VariableRow.css";

function VariableRow({ variable, parentValues, onChange }) {

  // مقادیر پیش‌فرض از والد می‌گیره اگر خودش نداشت
  const values = {
    startDate:   variable.startDate   ?? parentValues.startDate   ?? "",
    endDate:     variable.endDate     ?? parentValues.endDate     ?? "",
    minPrice:    variable.minPrice    ?? parentValues.minPrice    ?? "",
    maxPrice:    variable.maxPrice    ?? parentValues.maxPrice    ?? "",
    maxDiscount: variable.maxDiscount ?? parentValues.maxDiscount ?? "",
  };

  const handleCheck = (e) =>
    onChange({ ...variable, ...values, included: e.target.checked });

  const handleFields = (newVals) =>
    onChange({ ...variable, ...newVals });

  return (
    <div className={`variable-row ${!variable.included ? "excluded" : ""}`}>

      <div className="vr-header">

        <label className="vr-checkbox">
          <input
            type="checkbox"
            checked={variable.included ?? true}
            onChange={handleCheck}
          />
          <span className="vr-checkbox-label">شامل تخفیف</span>
        </label>

        <span className="vr-name">
          <span className="vr-icon">◆</span>
          {variable.label}
        </span>

      </div>

      {variable.included !== false && (
        <div className="vr-fields">
          <DiscountFields values={values} onChange={handleFields} />
        </div>
      )}

    </div>
  );
}

export default VariableRow;
