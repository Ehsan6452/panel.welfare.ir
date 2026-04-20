import React from "react";
import './input.css'

function InputField({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  error = "",
  className = "",
  inputClassName =""
}) {
  return (
    <div className={`input-field ${className}`}>
      {label && <label className="input-label">{label}</label>}
      {type === "textarea" ? 
      <textarea
      type="text"
      value={value}
      onChange={onchange}
      className={`input-element ${inputClassName} ${error ? "input-error" : ""}`}
      placeholder={placeholder}
      />
      :       
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input-element ${inputClassName} ${error ? "input-error" : ""}`}
      />}
      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
}

export default InputField;
