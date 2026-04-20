// MockData.js

// مقادیر هر ویژگی (Attribute Values)
export const MOCK_ATTRIBUTE_VALUES = [
  // رنگ‌ها
  { id: 1, attributeId: 1, value: "آبی" },
  { id: 2, attributeId: 1, value: "قرمز" },
  { id: 3, attributeId: 1, value: "زرد" },
  { id: 4, attributeId: 1, value: "صورتی" },
  
  // سایزها
  { id: 5, attributeId: 2, value: "کوچک" },
  { id: 6, attributeId: 2, value: "متوسط" },
  { id: 7, attributeId: 2, value: "بزرگ" },
  
  // وزن‌ها
  { id: 8, attributeId: 3, value: "100 گرم" },
  { id: 9, attributeId: 3, value: "250 گرم" },
  { id: 10, attributeId: 3, value: "500 گرم" },
  
  // حجم‌ها
  { id: 11, attributeId: 4, value: "50 میلی‌لیتر" },
  { id: 12, attributeId: 4, value: "100 میلی‌لیتر" },
  { id: 13, attributeId: 4, value: "250 میلی‌لیتر" }
];

// ویژگی‌های از پیش تعریف شده (Attributes)
export const MOCK_ATTRIBUTES = [
  { id: 1, name: "رنگ" },
  { id: 2, name: "سایز" },
  { id: 3, name: "وزن" },
  { id: 4, name: "حجم" }
];

// Orders 
export const MOCK_ORDERS =  [
  [1234 ,'1404/12/28', 'امیرعلی صادقی', '475,000 تومان', 'پرداخت شده'],
  [4567 ,'1404/12/20', 'مهسا کرامت', '340,000 تومان', 'بسته بندی'],
  [1234 ,'1404/12/28', 'امیرعلی صادقی', '475,000 تومان', 'آماده ارسال'],
  [4567 ,'1404/12/20', 'مهسا کرامت', '340,000 تومان', 'بسته بندی'],
  [1234 ,'1404/12/28', 'امیرعلی صادقی', '475,000 تومان', 'پرداخت شده'],
  [4567 ,'1404/12/20', 'مهسا کرامت', '340,000 تومان', 'ارسال شده'],
  [1234 ,'1404/12/28', 'امیرعلی صادقی', '475,000 تومان', 'پرداخت شده']
]

// Comments
export const MOCK_COMMENTS = [
  [1234 ,'1404/12/28','کلاه بافتنی','امیرحسین صحرایی','جنس بافت عالی بود و به موقع بدستم رسید ...','پاسخ داده نشده'],
  [1234 ,'1404/12/28','کلاه بافتنی','امیرحسین صحرایی','جنس بافت عالی بود و به موقع بدستم رسید ...','پاسخ داده شده'],
  [1234 ,'1404/12/28','کلاه بافتنی','امیرحسین صحرایی','جنس بافت عالی بود و به موقع بدستم رسید ...','پاسخ داده نشده'],
  [1234 ,'1404/12/28','کلاه بافتنی','امیرحسین صحرایی','جنس بافت عالی بود و به موقع بدستم رسید ...','پاسخ داده شده'],
  [1234 ,'1404/12/28','کلاه بافتنی','امیرحسین صحرایی','جنس بافت عالی بود و به موقع بدستم رسید ...','پاسخ داده نشده'],   
]

// Payments
export const MOCK_PAYMENTS = [
  [1234 ,'1404/12/28','475,000 تومان','واریز', '500,000 تومان'],
  [4567 ,'1404/12/28','300,000 تومان','واریز', '800,000 تومان'],
  [2468 ,'1404/12/27','400,000 تومان','برداشت', '400,000 تومان'],
  [1234 ,'1404/12/28','475,000 تومان','واریز', '500,000 تومان'],
  [4567 ,'1404/12/28','300,000 تومان','واریز', '800,000 تومان'],
  [2468 ,'1404/12/27','400,000 تومان','برداشت', '400,000 تومان'],
  [2468 ,'1404/12/27','400,000 تومان','برداشت', '400,000 تومان'],
]

// Support
export const MOCK_SUPPORT = [
  [1234 ,'1404/12/28','خطا در بارگذاری محصول','فنی','پاسخ داده شده'],
  [2345 ,'1404/11/20','عدم واریز موجودی حساب','مالی','بسته شده'],
  [2468 ,'1404/11/18','مرسوله برگشتی','مشتریان','در صف پاسخگویی'],
]

// دسته‌بندی‌های اصلی و زیر دسته‌ها
export const MOCK_CATEGORIES = [
  {
    id: 1,
    name: "خوراکی",
    subCategories: [
      { id: 1, name: "ارگانیک" },
      { id: 2, name: "میوه خشک" },
      { id: 3, name: "کنسرو میوه" },
    ],
  },
  {
    id: 2,
    name: "آرایشی و بهداشتی",
    subCategories: [
      { id: 4, name: "مراقبت پوست" },
      { id: 5, name: "مراقبت مو" },
      { id: 6, name: "آرایش صورت" },
    ],
  },
  {
    id: 3,
    name: "پوشاک",
    subCategories: [
      { id: 7, name: "زنانه" },
      { id: 8, name: "مردانه" },
      { id: 9, name: "بچگانه" },
    ],
  },
  {
    id: 4,
    name: "لوازم الکترونیکی",
    subCategories: [
      { id: 10, name: "موبایل و تبلت" },
      { id: 11, name: "لپ‌تاپ" },
      { id: 12, name: "لوازم جانبی" },
    ],
  },
  {
    id: 5,
    name: "خانه و آشپزخانه",
    subCategories: [
      { id: 13, name: "لوازم آشپزخانه" },
      { id: 14, name: "دکوراسیون" },
      { id: 15, name: "بافتنی و نساجی" },
    ],
  },
];

// داده‌های تستی محصولات
export const MOCK_PRODUCTS = [
  { 
    id: 1, 
    title: "محصول 1", 
    price: 100000, 
    stock: 50, 
    image: {
      main: "https://s33.uupload.ir/files/mafarinesh/Welfare/P01/P01.webp",
      gallery: [
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P01/P02.webp",
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P01/P03.webp",
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P01/P04.webp"
      ]
    },
    variables: [],
    description: "این یک متن تستی برای توضیحات محصول ۱ است.",
    categories: [
      { mainCategoryId: 1, subCategoryId: 2 },
      { mainCategoryId: 1, subCategoryId: 3 }
    ]
  },
  { 
    id: 2, 
    title: "محصول 2", 
    price: 150000, 
    stock: 30, 
    image: {
      main: "https://s33.uupload.ir/files/mafarinesh/Welfare/P02/P01.webp",
      gallery: [
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P02/P02.webp",
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P02/P03.webp",
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P02/P04.webp"
      ]
    },
    variables: [
      {   
        id: 1,
        attributes: [
          { attributeId: 1, valueId: 2 }, // رنگ آبی
          { attributeId: 2, valueId: 7 }  // سایز XL
        ],
        price: 200000,
        stock: 15
      },
      {   
        id: 2,
        attributes: [
          { attributeId: 1, valueId: 2 }, // رنگ آبی
          { attributeId: 2, valueId: 7 }  // سایز XL
        ],
        price: 200000,
        stock: 15
      },
    ],
    description: "این یک متن تستی برای توضیحات محصول ۲ است.",
    categories: [
      { mainCategoryId: 2, subCategoryId: 5 },
      { mainCategoryId: 3, subCategoryId: 7 }
    ]
  },
  { 
    id: 3, 
    title: "محصول 3", 
    price: 200000, 
    stock: 20, 
    image: {
      main: "https://s33.uupload.ir/files/mafarinesh/Welfare/P03/P01.webp",
      gallery: [
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P03/P02.webp",
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P03/P03.webp",
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P03/P04.webp"
      ]
    },
    variables: [
      {   
        id: 1,
        attributes: [
          { attributeId: 1, valueId: 2 }, // رنگ آبی
          { attributeId: 2, valueId: 7 }  // سایز XL
        ],
        price: 200000,
        stock: 15
      },
      {   
        id: 2,
        attributes: [
          { attributeId: 1, valueId: 2 }, // رنگ آبی
          { attributeId: 2, valueId: 7 }  // سایز XL
        ],
        price: 200000,
        stock: 15
      },
    ],
    description: "این یک متن تستی برای توضیحات محصول ۲ است.",
    categories: [
      { mainCategoryId: 3, subCategoryId: 8 }
    ]
  },
  { 
    id: 4, 
    title: "محصول 4", 
    price: 250000, 
    stock: 45, 
    image: {
      main: "https://s33.uupload.ir/files/mafarinesh/Welfare/P04/P01.webp",
      gallery: [
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P04/P02.webp",
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P04/P03.webp",
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P04/P04.webp"
      ]
    },
    variables: [
      {   
        id: 1,
        attributes: [
          { attributeId: 1, valueId: 2 }, // رنگ آبی
          { attributeId: 2, valueId: 7 }  // سایز XL
        ],
        price: 200000,
        stock: 15
      },
      {   
        id: 2,
        attributes: [
          { attributeId: 1, valueId: 2 }, // رنگ آبی
          { attributeId: 2, valueId: 7 }  // سایز XL
        ],
        price: 200000,
        stock: 15
      },
    ],
    description: "این یک متن تستی برای توضیحات محصول ۲ است.",
    categories: [
      { mainCategoryId: 3, subCategoryId: 8 }
    ]
  },
  { 
    id: 5, 
    title: "محصول 5", 
    price: 180000, 
    stock: 30, 
    image: {
      main: "https://s33.uupload.ir/files/mafarinesh/Welfare/P05/P01.webp",
      gallery: [
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P05/P02.webp",
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P05/P03.webp",
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P05/P04.webp"
      ]
    },
    variables: [],
    description: "این یک متن تستی برای توضیحات محصول ۲ است.",
    categories: [
      { mainCategoryId: 2, subCategoryId: 5 }
    ]
  },
  { 
    id: 6, 
    title: "محصول 6", 
    price: 1150000, 
    stock: 0, 
    image: {
      main: "https://s33.uupload.ir/files/mafarinesh/Welfare/P06/P01.webp",
      gallery: [
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P06/P02.webp",
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P06/P03.webp",
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P06/P04.webp"
      ]
    },
    variables: [
      {   
        id: 1,
        attributes: [
          { attributeId: 1, valueId: 2 }, // رنگ آبی
          { attributeId: 2, valueId: 7 }  // سایز XL
        ],
        price: 200000,
        stock: 15
      },
      {   
        id: 2,
        attributes: [
          { attributeId: 1, valueId: 2 }, // رنگ آبی
          { attributeId: 2, valueId: 7 }  // سایز XL
        ],
        price: 200000,
        stock: 15
      },
    ],
    description: "این یک متن تستی برای توضیحات محصول ۲ است.",
    categories: [
      { mainCategoryId: 4, subCategoryId: 13 }
    ]
  },
  { 
    id: 7, 
    title: "محصول 7", 
    price: 980000, 
    stock: 60, 
    image: {
      main: "https://s33.uupload.ir/files/mafarinesh/Welfare/P07/P01.webp",
      gallery: [
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P07/P02.webp",
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P07/P03.webp",
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P07/P04.webp"
      ]
    },
    variables: [
      {   
        id: 1,
        attributes: [
          { attributeId: 1, valueId: 2 }, // رنگ آبی
          { attributeId: 2, valueId: 7 }  // سایز XL
        ],
        price: 200000,
        stock: 15
      },
      {   
        id: 2,
        attributes: [
          { attributeId: 1, valueId: 2 }, // رنگ آبی
          { attributeId: 2, valueId: 7 }  // سایز XL
        ],
        price: 200000,
        stock: 15
      },
    ],
    description: "این یک متن تستی برای توضیحات محصول ۲ است.",
    categories: [
      { mainCategoryId: 4, subCategoryId: 13 }
    ]
  },
  { 
    id: 8, 
    title: "محصول 8", 
    price: 590000, 
    stock: 10, 
    image: {
      main: "https://s33.uupload.ir/files/mafarinesh/Welfare/P08/P01.webp",
      gallery: [
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P08/P02.webp",
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P08/P03.webp",
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P08/P04.webp"
      ]
    },
    variables: [],
    description: "این یک متن تستی برای توضیحات محصول ۲ است.",
    categories: [
      { mainCategoryId: 3, subCategoryId: 9 }
    ]
  },
  { 
    id: 9, 
    title: "محصول 9", 
    price: 975000, 
    stock: 40, 
    image: {
      main: "https://s33.uupload.ir/files/mafarinesh/Welfare/P09/P01.webp",
      gallery: [
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P09/P02.webp",
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P09/P03.webp",
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P09/P04.webp"
      ]
    },
    variables: [
      {   
        id: 1,
        attributes: [
          { attributeId: 1, valueId: 2 }, // رنگ آبی
          { attributeId: 2, valueId: 7 }  // سایز XL
        ],
        price: 200000,
        stock: 15
      },
      {   
        id: 2,
        attributes: [
          { attributeId: 1, valueId: 2 }, // رنگ آبی
          { attributeId: 2, valueId: 7 }  // سایز XL
        ],
        price: 200000,
        stock: 15
      },
    ],
    description: "این یک متن تستی برای توضیحات محصول ۲ است.",
    categories: [
      { mainCategoryId: 3, subCategoryId: 9 }
    ]
  },
  { 
    id: 10, 
    title: "محصول 10", 
    price: 450000, 
    stock: 0, 
    image: {
      main: "https://s33.uupload.ir/files/mafarinesh/Welfare/P10/P01.webp",
      gallery: [
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P10/P02.webp",
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P10/P03.webp",
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P10/P04.webp"
      ]
    },
    variables: [],
    description: "این یک متن تستی برای توضیحات محصول ۲ است.",
    categories: [
      { mainCategoryId: 4, subCategoryId: 12 }
    ]
  },
  { 
    id: 11, 
    title: "محصول 11", 
    price: 350000, 
    stock: 0, 
    image: {
      main: "https://s33.uupload.ir/files/mafarinesh/Welfare/P11/P01.webp",
      gallery: [
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P11/P02.webp",
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P11/P03.webp",
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P11/P04.webp"
      ]
    },
    variables: [],
    description: "این یک متن تستی برای توضیحات محصول ۲ است.",
    categories: [
      { mainCategoryId: 3, subCategoryId: 9 }
    ]
  },
  { 
    id: 12, 
    title: "محصول 12", 
    price: 580000, 
    stock: 55, 
    image: {
      main: "https://s33.uupload.ir/files/mafarinesh/Welfare/P12/P01.webp",
      gallery: [
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P12/P02.webp",
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P12/P03.webp",
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P12/P04.webp"
      ]
    },
    variables: [
      {   
        id: 1,
        attributes: [
          { attributeId: 1, valueId: 2 }, // رنگ آبی
          { attributeId: 2, valueId: 7 }  // سایز XL
        ],
        price: 200000,
        stock: 15
      },
      {   
        id: 2,
        attributes: [
          { attributeId: 1, valueId: 2 }, // رنگ آبی
          { attributeId: 2, valueId: 7 }  // سایز XL
        ],
        price: 200000,
        stock: 15
      },
    ],
    description: "این یک متن تستی برای توضیحات محصول ۲ است.",
    categories: [
      { mainCategoryId: 1, subCategoryId: 1 }
    ]
  },
  { 
    id: 13, 
    title: "محصول 13", 
    price: 775000, 
    stock: 12, 
    image: {
      main: "https://s33.uupload.ir/files/mafarinesh/Welfare/P13/P01.webp",
      gallery: [
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P13/P02.webp",
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P13/P03.webp",
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P13/P04.webp"
      ]
    },
    variables: [
      {   
        id: 1,
        attributes: [
          { attributeId: 1, valueId: 2 }, // رنگ آبی
          { attributeId: 2, valueId: 7 }  // سایز XL
        ],
        price: 200000,
        stock: 15
      },
      {   
        id: 2,
        attributes: [
          { attributeId: 1, valueId: 2 }, // رنگ آبی
          { attributeId: 2, valueId: 7 }  // سایز XL
        ],
        price: 200000,
        stock: 15
      },
    ],
    description: "این یک متن تستی برای توضیحات محصول ۲ است.",
    categories: [
      { mainCategoryId: 4, subCategoryId: 14 }
    ]
  },
  { 
    id: 14, 
    title: "محصول 14", 
    price: 1250000, 
    stock: 38, 
    image: {
      main: "https://s33.uupload.ir/files/mafarinesh/Welfare/P14/P01.webp",
      gallery: [
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P14/P02.webp",
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P14/P03.webp",
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P14/P04.webp"
      ]
    },
    variables: [
      {   
        id: 1,
        attributes: [
          { attributeId: 1, valueId: 2 }, // رنگ آبی
          { attributeId: 2, valueId: 7 }  // سایز XL
        ],
        price: 200000,
        stock: 15
      },
      {   
        id: 2,
        attributes: [
          { attributeId: 1, valueId: 2 }, // رنگ آبی
          { attributeId: 2, valueId: 7 }  // سایز XL
        ],
        price: 200000,
        stock: 15
      },
    ],
    description: "این یک متن تستی برای توضیحات محصول ۲ است.",
    categories: [
      { mainCategoryId: 4, subCategoryId: 12 }
    ]
  },
  { 
    id: 15, 
    title: "محصول 15", 
    price: 1550000, 
    stock: 22, 
    image: {
      main: "https://s33.uupload.ir/files/mafarinesh/Welfare/P15/P01.webp",
      gallery: [
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P15/P02.webp",
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P15/P03.webp",
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P15/P04.webp"
      ]
    },
    variables: [
      {   
        id: 1,
        attributes: [
          { attributeId: 1, valueId: 2 }, // رنگ آبی
          { attributeId: 2, valueId: 7 }  // سایز XL
        ],
        price: 200000,
        stock: 15
      },
      {   
        id: 2,
        attributes: [
          { attributeId: 1, valueId: 2 }, // رنگ آبی
          { attributeId: 2, valueId: 7 }  // سایز XL
        ],
        price: 200000,
        stock: 15
      },
    ],
    description: "این یک متن تستی برای توضیحات محصول ۲ است.",
    categories: [
      { mainCategoryId: 3, subCategoryId: 10 }
    ]
  },
  { 
    id: 16, 
    title: "محصول 16", 
    price: 450000, 
    stock: 18, 
    image: {
      main: "https://s33.uupload.ir/files/mafarinesh/Welfare/P16/P01.webp",
      gallery: [
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P16/P02.webp",
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P16/P03.webp",
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P16/P04.webp"
      ]
    },
    variables: [
      { attributeId: 3, valueId: 9, price: 150000, stock: 10 },
      { attributeId: 3, valueId: 10, price: 155000, stock: 20 },
    ],
    description: "این یک متن تستی برای توضیحات محصول ۲ است.",
    categories: [
      { mainCategoryId: 2, subCategoryId: 5 }
    ]
  },
  { 
    id: 17, 
    title: "محصول 17", 
    price: 750000, 
    stock: 65, 
    image: {
      main: "https://s33.uupload.ir/files/mafarinesh/Welfare/P17/P01.webp",
      gallery: [
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P17/P02.webp",
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P17/P03.webp",
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P17/P04.webp"
      ]
    },
    variables: [],
    description: "این یک متن تستی برای توضیحات محصول ۲ است.",
    categories: [
      { mainCategoryId: 2, subCategoryId: 5 }
    ]
  },
  { 
    id: 18, 
    title: "محصول 18", 
    price: 700000, 
    stock: 8, 
    image: {
      main: "https://s33.uupload.ir/files/mafarinesh/Welfare/P18/P01.webp",
      gallery: [
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P18/P02.webp",
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P18/P03.webp",
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P18/P04.webp"
      ]
    },
    variables: [
      {   
        id: 1,
        attributes: [
          { attributeId: 1, valueId: 2 }, // رنگ آبی
          { attributeId: 2, valueId: 7 }  // سایز XL
        ],
        price: 200000,
        stock: 15
      },
      {   
        id: 2,
        attributes: [
          { attributeId: 1, valueId: 2 }, // رنگ آبی
          { attributeId: 2, valueId: 7 }  // سایز XL
        ],
        price: 200000,
        stock: 15
      },
    ],
    description: "این یک متن تستی برای توضیحات محصول ۲ است.",
    categories: [
      { mainCategoryId: 2, subCategoryId: 5 }
    ]
  },
  { 
    id: 19, 
    title: "محصول 19", 
    price: 900000, 
    stock: 32, 
    image: {
      main: "https://s33.uupload.ir/files/mafarinesh/Welfare/P19/P01.webp",
      gallery: [
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P19/P02.webp",
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P19/P03.webp",
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P19/P04.webp"
      ]
    },
    variables: [
      {   
        id: 1,
        attributes: [
          { attributeId: 1, valueId: 2 }, // رنگ آبی
          { attributeId: 2, valueId: 7 }  // سایز XL
        ],
        price: 200000,
        stock: 15
      },
      {   
        id: 2,
        attributes: [
          { attributeId: 1, valueId: 2 }, // رنگ آبی
          { attributeId: 2, valueId: 7 }  // سایز XL
        ],
        price: 200000,
        stock: 15
      },
    ],
    description: "این متن تستی برای نمایش چگونگی قرارگیری توضیحات محصول در طراحی است. طولانی بودن یا نبودن این متن صرفا بخاطر شبیه سازی متن واقعی ست.",
    categories: [
      {mainCategoryId:5, subCategoryId:14},
      {mainCategoryId:1, subCategoryId:3}
    ]
  },
  { 
    id: 20, 
    title: "محصول 20", 
    price: 450000, 
    stock: 27, 
    image: {
      main: "https://s33.uupload.ir/files/mafarinesh/Welfare/P20/P01.webp",
      gallery: [
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P20/P02.webp",
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P20/P03.webp",
        "https://s33.uupload.ir/files/mafarinesh/Welfare/P20/P04.webp"
      ]
    },
    variables: [
      {   
        id: 1,
        attributes: [
          { attributeId: 1, valueId: 2 }, // رنگ آبی
          { attributeId: 2, valueId: 7 }  // سایز XL
        ],
        price: 200000,
        stock: 15
      },
      {   
        id: 2,
        attributes: [
          { attributeId: 1, valueId: 2 }, // رنگ آبی
          { attributeId: 2, valueId: 7 }  // سایز XL
        ],
        price: 200000,
        stock: 15
      },
    ],
    description: "این یک متن تستی برای توضیحات محصول ۲ است.",
    categories: [
      { mainCategoryId: 5, subCategoryId: 15 }
    ]
  }
];

// داده‌های تستی نوتیفیکیشن‌ها
export const MOCK_NOTIFICATIONS = [
  { 
    id: 1, 
    text: 'سفارش جدید به ارزش ۲۵۰,۰۰۰ تومان ثبت شد',
    time: '۲ دقیقه پیش', 
    read: false
  },
  { 
    id: 2, 
    text: 'پرداخت سفارش ۱۲۳۴# با موفقیت انجام شد',
    time: '۱ ساعت پیش', 
    read: false
  },
  { 
    id: 3, 
    text: 'محصول "گل رز" به فروشگاه اضافه شد',
    time: '۳ ساعت پیش', 
    read: true
  },
  { 
    id: 4, 
    text: 'محصول "گلدان سفید" رو به اتمام است',
    time: 'روز پیش', 
    read: false
  },
  {
    id: 5,
    text: 'تیکت شماره ۱۲۳۴# پاسخ داده شد',
    time: 'روز پیش',
    read: true
  }
];

export const MOCK_DISCOUNTS =[
   {
    id: 1,
    type: "category",          // "category" | "subCategory" | "product"
    categoryId: 1,
    categoryName: "خوراکی",
    startDate: "1404/01/01",
    endDate: "1404/03/01",
    minPrice: 50000,
    maxPrice: 500000,
    maxDiscount: 100000,
    subCategories: [
      {
        id: 1,
        name: "ارگانیک",
        included: true,
        startDate: "1404/01/01",
        endDate: "1404/03/01",
        minPrice: 50000,
        maxPrice: 500000,
        maxDiscount: 100000,
        products: [
          {
            id: 3,
            title: "چای ارگانیک",
            included: true,
            startDate: "1404/01/01",
            endDate: "1404/03/01",
            minPrice: 50000,
            maxPrice: 500000,
            maxDiscount: 100000,
            variables: []
          }
        ]
      },
      {
        id: 2,
        name: "میوه خشک",
        included: false,
        startDate: "1404/01/01",
        endDate: "1404/03/01",
        minPrice: 50000,
        maxPrice: 500000,
        maxDiscount: 100000,
        products: []
      }
    ]
  },
  {
    id: 2,
    type: "product",
    productId: 2,
    productTitle: "محصول 2",
    included: true,
    startDate: "1404/02/01",
    endDate: "1404/04/01",
    minPrice: 100000,
    maxPrice: 300000,
    maxDiscount: 50000,
    variables: [
      {
        id: 1,
        label: "رنگ آبی / سایز XL",
        included: true,
        startDate: "1404/02/01",
        endDate: "1404/04/01",
        minPrice: 100000,
        maxPrice: 300000,
        maxDiscount: 50000
      }
    ]
  }
]

export const MOCK_SHOP=
{
    id : 1,
    name :  'فروشگاه سحر',
    description: 'این توضیح پیش فرص برای فروشگاه سحر',
    image: 'https://my.uupload.ir/dl/n2VyZn6M',
    rate: 4.5,
    saleCount: 125,
    productCount:20,
    activeTime: 243,
}

