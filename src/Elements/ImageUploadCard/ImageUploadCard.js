import React, { useRef, useState } from "react";
import './style.css'
function ImageUploadCard({ 
  imageUrl, 
  onImageUpload, 
  label = "افزودن تصویر",
  size = "large",
  className = "w-full",
  imageClass=""
}) {
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef(null);

  const sizeClasses = size === "large" ? "w-16 h-16" : "w-8 h-8";
  const iconSize = size === "large" ? "w-16 h-16" : "w-8 h-8";
  const editIconSize = size === "large" ? "w-12 h-12" : "w-8 h-8";

  return (
    <div 
      className={`relative aspect-square rounded-lg flex items-center justify-center cursor-pointer overflow-hidden group xy-80 ${!imageUrl ? 'product-images-empty' : ''} ${className}`}onClick={() => inputRef.current?.click()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {imageUrl ? (
        <>
          <img 
            src={imageUrl} 
            alt={label} 
            className={`max-w-full max-h-full object-contain ${imageClass}`}
          />
          {isHovered && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <svg className={`${editIconSize} text-white`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center text-gray-400">
          <svg className={`${iconSize} mb-2`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {size === "large" && <span className="text-sm">{label}</span>}
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onImageUpload}
      />
    </div>
  );
}

export default ImageUploadCard;
