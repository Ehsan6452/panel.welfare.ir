import React from "react";
import SelectField from "../../../Elements/SelectField/SelectField";

function CategorySelect({
  label,
  categories = [],
  value,
  onChange,
  placeholder = "همه محصولات",
  error = "",
  className = "",
}) {

  const options = [];

  categories
    .filter(cat => cat.count > 0)   // حذف دسته‌هایی که هیچ محصول ندارند
    .forEach((cat) => {

      options.push({
        value: `cat-${cat.id}`,
        label: `${cat.name} (${cat.count})`,
      });

      cat.subCategories
        .filter(sub => sub.count > 0)  // حذف زیردسته‌های بدون محصول
        .forEach((sub) => {
          options.push({
            value: `sub-${sub.id}`,
            label: `- ${sub.name} (${sub.count})`,
          });
        });

    });

  const handleChange = (e) => {
    const rawValue = e.target.value;

    if (!rawValue) {
      onChange && onChange([], "");
      return;
    }

    const [type, idStr] = rawValue.split("-");
    const id = Number(idStr);

    if (type === "sub") {
      onChange && onChange(id, rawValue);
    }

    if (type === "cat") {
      const cat = categories.find((c) => c.id === id);
      const subIds = cat?.subCategories
        .filter(sub => sub.count > 0)
        .map((s) => s.id) || [];

      onChange && onChange(subIds, rawValue);
    }
  };

  return (
    <SelectField
      label={label}
      value={value}
      onChange={handleChange}
      options={options}
      placeholder={placeholder}
      error={error}
      className={className}
    />
  );
}

export default CategorySelect;
