// Components/Discount/DiscountFields/DiscountFields.jsx

import React from "react";
import "./DiscountFields.css";

function DiscountFields({ values, onChange, disabled = false }) {

  const handle = (field) => (e) =>
    onChange({ ...values, [field]: e.target.value });

  return (
    <div className="discount-fields">

      <div className="df-group">
        <label className="df-label">از تاریخ</label>
        <input
          className="df-input"
          type="text"
          placeholder="1404/01/01"
          value={values.startDate || ""}
          onChange={handle("startDate")}
          disabled={disabled}
        />
      </div>

      <div className="df-group">
        <label className="df-label">تا تاریخ</label>
        <input
          className="df-input"
          type="text"
          placeholder="1404/03/01"
          value={values.endDate || ""}
          onChange={handle("endDate")}
          disabled={disabled}
        />
      </div>

      <div className="df-group">
        <label className="df-label">از مبلغ</label>
        <input
          className="df-input"
          type="number"
          placeholder="0"
          value={values.minPrice || ""}
          onChange={handle("minPrice")}
          disabled={disabled}
        />
      </div>

      <div className="df-group">
        <label className="df-label">تا مبلغ</label>
        <input
          className="df-input"
          type="number"
          placeholder="0"
          value={values.maxPrice || ""}
          onChange={handle("maxPrice")}
          disabled={disabled}
        />
      </div>

      <div className="df-group">
        <label className="df-label">سقف تخفیف</label>
        <input
          className="df-input"
          type="number"
          placeholder="0"
          value={values.maxDiscount || ""}
          onChange={handle("maxDiscount")}
          disabled={disabled}
        />
      </div>

    </div>
  );
}

export default DiscountFields;
