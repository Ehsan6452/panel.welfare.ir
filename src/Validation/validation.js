// services/ValidationService.js

class Validation {
  // قوانین اعتبارسنجی برای فیلدهای مختلف
  static rules = {
    title: [
      { validate: (v) => v && v.trim().length >= 3, message: 'عنوان باید حداقل ۳ کاراکتر باشد' },
      { validate: (v) => v && v.trim().length <= 100, message: 'عنوان نباید بیشتر از ۱۰۰ کاراکتر باشد' }
    ],
    price: [
      { validate: (v) => !isNaN(v), message: 'قیمت باید عدد باشد' },
      { validate: (v) => Number(v) >= 1000, message: 'قیمت باید حداقل ۱۰۰۰ تومان باشد' },
      { validate: (v) => Number(v) <= 1000000000, message: 'قیمت نامعتبر است' }
    ],
    stock: [
      { validate: (v) => !isNaN(v), message: 'موجودی باید عدد باشد' },
      { validate: (v) => Number(v) >= 0, message: 'موجودی باید بیشتر از صفر باشد' },
      { validate: (v) => Number.isInteger(Number(v)), message: 'موجودی باید عدد صحیح باشد' }
    ],
    email: [
      { validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), message: 'ایمیل نامعتبر است' }
    ],
    phone: [
      { validate: (v) => /^09\d{9}$/.test(v), message: 'شماره موبایل باید با ۰۹ شروع شود و ۱۱ رقم باشد' }
    ],
    nationalCode: [
      { validate: (v) => /^\d{10}$/.test(v), message: 'کد ملی باید ۱۰ رقم باشد' }
    ]
  };

  // اعتبارسنجی یک فیلد
  static validate(field, value) {
    const fieldRules = this.rules[field];
    if (!fieldRules) return { isValid: true, error: null };

    for (const rule of fieldRules) {
      if (!rule.validate(value)) {
        return { isValid: false, error: rule.message };
      }
    }

    return { isValid: true, error: null };
  }

  // اعتبارسنجی چند فیلد همزمان
  static validateMultiple(fields) {
    const errors = {};
    let isValid = true;

    Object.entries(fields).forEach(([field, value]) => {
      const result = this.validate(field, value);
      if (!result.isValid) {
        errors[field] = result.error;
        isValid = false;
      }
    });

    return { isValid, errors };
  }

  // افزودن قانون جدید
  static addRule(field, rule) {
    if (!this.rules[field]) {
      this.rules[field] = [];
    }
    this.rules[field].push(rule);
  }
}

export default Validation;
