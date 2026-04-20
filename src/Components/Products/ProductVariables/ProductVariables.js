import React from "react";
import InputField from "../../../Elements/InputField/input";
import SelectField from "../../../Elements/SelectField/SelectField";
import Button from "../../../Elements/Button/Button"
import "./style.css";

function ProductVariables({
  variables,
  attributes,
  errors,
  addVariable,
  removeVariable,
  updateVariable,
  addAttributeLayer,
  removeAttributeLayer,
  updateVariableAttribute,
  getValuesForAttribute,
}) {
  return (
    <div className="product-variables">

      <div className="variables-header">
        <h3>متغیرهای محصول</h3>

          <Button variant="add" onClick={addVariable}>
            + افزودن متغیر
          </Button>
      </div>

      {variables.length === 0 ? (
        <div className="empty-variables">
          <p>هیچ متغیری تعریف نشده است</p>
        </div>
      ) : (
        <div className="variables-list">

          {variables.map((variable) => (
            <div key={variable.id} className="variable-item">

              {/* ATTRIBUTE LAYERS */}

              {variable.attributes.map((attr, index) => (
                <div key={index} className="variable-attribute-layer">

                  <SelectField label="ویژگی" value={attr.attributeId}
                    onChange={(e) => updateVariableAttribute(variable.id, index,"attributeId",e.target.value)}
                    options={attributes.map((a) => ({
                      value: a.id,
                      label: a.name,
                    }))}
                    placeholder="انتخاب ویژگی"
                    className="variable-field mx-2"
                  />

                  <SelectField
                    label="مقدار"
                    value={attr.valueId}
                    onChange={(e) =>
                      updateVariableAttribute(
                        variable.id,
                        index,
                        "valueId",
                        e.target.value
                      )
                    }
                    options={getValuesForAttribute(attr.attributeId).map(
                      (val) => ({
                        value: val.id,
                        label: val.value,
                      })
                    )}
                    placeholder="انتخاب مقدار"
                    className="variable-field"
                  />

                  {/* حذف فقط برای لایه دوم */}
                  {index === 1 && (
                    <Button
                      variant="danger"
                      onClick={() => removeAttributeLayer(variable.id, index)}
                    >
                      حذف
                    </Button>

                  )}

                </div>
              ))}

              {/* فقط اگر کمتر از 2 لایه بود */}
              {variable.attributes.length < 2 && (
                <Button variant="add" onClick={() => addAttributeLayer(variable.id)} className="set-end">
                  + افزودن ویژگی
                </Button>
              )}

              <div className="variable-attribute-PriceStock">
                {/* PRICE */}

                <InputField
                  label="قیمت"
                  type="number"
                  value={variable.price}
                  onChange={(e) =>
                    updateVariable(variable.id, "price", e.target.value)
                  }
                  placeholder="قیمت"
                  className="variable-field mx-1"
                />

                {/* STOCK */}

                <InputField
                  label="موجودی"
                  type="number"
                  value={variable.stock}
                  onChange={(e) =>
                    updateVariable(variable.id, "stock", e.target.value)
                  }
                  placeholder="موجودی"
                  className="variable-field mx-1"
                />
              </div>



              {/* REMOVE VARIABLE */}

                <Button variant="danger" onClick={() => removeVariable(variable.id)} className="set-end">
                   حذف متغیر
                </Button>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default ProductVariables;
