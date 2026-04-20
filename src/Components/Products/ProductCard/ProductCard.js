import React, { useState } from "react";
import ValidationService from "../../../Validation/validation";

function ProductCard({ product, onClick, onEdit }) {
  const [editing, setEditing] = useState(null);
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);

  const formatPrice = (price) => {
    return price.toLocaleString("fa-IR") + " تومان";
  };

  const handleEdit = (field, currentValue) => {
    setEditing(field);
    setValue(currentValue);
    setError(null);
  };

  const handleSave = (field) => {
    const validation = ValidationService.validate(field, value);
    
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }

    onEdit(product.id, field, value);
    setEditing(null);
    setError(null);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    setError(null);
  };

  return (
    <div className="product-card bg-theme" onClick={() => onClick(product.id)}>
      {product.stock === 0 && <span className="out-of-stock-badge">ناموجود</span>}
      <div className="product-image">
        <img src={product.image.main} alt={product.title} />
      </div>
      <div className="product-overlay">
        <div className="product-info" onClick={(e) => e.stopPropagation()}>

          {/* عنوان */}
          <div className="info-row">
            {editing === "title" ? (
              <>
                <input
                  value={value}
                  onChange={handleChange}
                  onBlur={() => handleSave("title")}
                  autoFocus
                />
                {error && <span className="error-text">{error}</span>}
              </>
            ) : (
              <>
                <span>{product.title}</span>
                <button onClick={() => handleEdit("title", product.title)}>✏️</button>
              </>
            )}
          </div>

          {/* قیمت */}
          <div className="info-row">
            {editing === "price" ? (
              <>
                <input
                  value={value}
                  onChange={handleChange}
                  onBlur={() => handleSave("price")}
                  autoFocus
                  type="number"
                />
                {error && <span className="error-text">{error}</span>}
              </>
            ) : (
              <>
                {/* ✅ فقط در حالت نمایش فرمت می‌شه */}
                <span>{formatPrice(product.price)}</span>
                <button onClick={() => handleEdit("price", product.price)}>✏️</button>
              </>
            )}
          </div>

          {/* موجودی */}
          <div className="info-row">
            {editing === "stock" ? (
              <>
                <input
                  value={value}
                  onChange={handleChange}
                  onBlur={() => handleSave("stock")}
                  autoFocus
                  type="number"
                />
                {error && <span className="error-text">{error}</span>}
              </>
            ) : (
              <>
                <span>موجودی: {product.stock}</span>
                <button onClick={() => handleEdit("stock", product.stock)}>✏️</button>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductCard;
