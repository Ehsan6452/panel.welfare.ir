import React from "react";


function SelectField({
  label,
  value,
  onChange,
  options = [],
  placeholder = "انتخاب کنید",
  error = "",
  className = "",
}) {
  return (
    <div className={`input-field ${className}`}>
      {label && <label className="input-label">{label}</label>}

      <select
        value={value}
        onChange={onChange}
        className={`input-element ${error ? "input-error" : ""}`}
      >
        <option value="">{placeholder}</option>

        {options.map((op) => (
          <option key={op.value} value={op.value}>
            {op.label}
          </option>
        ))}
      </select>

      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
}

export default SelectField;
