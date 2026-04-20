// ProductImageManager.js
import React from "react";
import ImageUploadCard from "../../../Elements/ImageUploadCard/ImageUploadCard";
import './style.css'
function ProductImageManager({
  mainImage,
  galleryImages = [],
  onMainImageUpload,
  onGalleryImageUpload,
  isLoading = false,
  maxGalleryImages = 4, 
}) {
 
  const normalizedGallery = Array.from({ length: maxGalleryImages }).map(
    (_, index) => galleryImages[index] || null
  );

  return (
    <div className="product-image-manager space-y-3">
      {/* تصویر اصلی */}
      <div>
        <div className="w-60 h-60 my-2">
          <ImageUploadCard
            imageUrl={mainImage}
            onImageUpload={onMainImageUpload}
            label={isLoading ? "در حال آپلود..." : "افزودن تصویر اصلی"}
            size="large"
            className="w-full h-full"
          />
        </div>
      </div>

      {/* گالری تصاویر */}
      <div>
        <div className="grid grid-cols-4 gap-3">
          {normalizedGallery.map((imageUrl, index) => (
            <div key={index} className="w-24 h-24">
              <ImageUploadCard
                imageUrl={imageUrl}
                onImageUpload={(e) => onGalleryImageUpload(e, index)}
                label={
                  isLoading
                    ? "در حال آپلود..."
                    : `افزودن تصویر ${index + 1}`
                }
                size="small"
                className="w-full h-full "
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductImageManager;
