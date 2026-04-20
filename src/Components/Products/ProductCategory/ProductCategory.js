import React from "react";
import Button from "../../../Elements/Button/Button";
import './style.css'
function ProductCategory({
    categorySearch,
    handleCategorySearch,
    categories,
    allCategories,
    categorySearchResults,
    selectedSubCategories,
    toggleSubCategory,
    addSelectedCategories,
    cancelSelectedCategories,
    removeCategory,
    getCategoryLabel
}) {

    const list = categorySearch ? categorySearchResults : allCategories;

    return (
        <div className="product-category p-3">

            <h3>دسته‌بندی محصول</h3>

            {/* search */}
            <input
                type="text"
                placeholder="جستجوی دسته..."
                value={categorySearch}
                onChange={handleCategorySearch}
                className="category-search"
            />

            {/* selected tags */}
            <div className="selected-categories">

                {categories.length === 0 && (
                    <div className="empty-category">
                        دسته‌ای انتخاب نشده است
                    </div>
                )}

                {categories.map((cat, index) => (
                    <div key={index} className="category-tag">

                        {getCategoryLabel(cat.mainCategoryId, cat.subCategoryId)}

                        <button
                            type="button"
                            onClick={() =>
                                removeCategory(cat.mainCategoryId, cat.subCategoryId)
                            }
                        >
                            ×
                        </button>

                    </div>
                ))}

            </div>


            {/* categories list */}
            <div className="category-list">

                {list.map((category) => (

                    <div key={category.id} className="category-group">

                        <div className="category-title">
                            {category.name}
                        </div>

                        <div className="subcategory-list">

                            {category.subCategories.map((sub) => {

                                const selected = selectedSubCategories.find(
                                    (c) =>
                                        c.mainCategoryId === category.id &&
                                        c.subCategoryId === sub.id
                                );

                                const alreadyAdded = categories.find(
                                    (c) =>
                                        c.mainCategoryId === category.id &&
                                        c.subCategoryId === sub.id
                                );

                                return (
                                    <div
                                        key={sub.id}
                                        className={
                                            "subcategory-item " +
                                            (selected ? "selected " : "") +
                                            (alreadyAdded ? "disabled" : "")
                                        }
                                        onClick={() => {
                                            if (!alreadyAdded)
                                                toggleSubCategory(category.id, sub.id);
                                        }}
                                    >
                                        {sub.name}
                                    </div>
                                );
                            })}

                        </div>

                    </div>

                ))}

            </div>


            {/* actions */}
            <div className="category-actions">

            <Button
            variant="save"
            onClick={addSelectedCategories}
            >
            افزودن
            </Button>

            <Button
            variant="cancel"
            onClick={cancelSelectedCategories}
            >
            لغو
            </Button>


            </div>

        </div>
    );
}

export default ProductCategory;
