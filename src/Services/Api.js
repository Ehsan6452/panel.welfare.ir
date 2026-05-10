// در ابتدای فایل Api.js، بعد از تعریف API_BASE_URL
import { 
  MOCK_PRODUCTS, 
  MOCK_NOTIFICATIONS, 
  MOCK_ATTRIBUTE_VALUES, 
  MOCK_ATTRIBUTES,
  MOCK_CATEGORIES,
  MOCK_DISCOUNTS,
  MOCK_SHOP,
  MOCK_COMMENTS,
  MOCK_ORDERS,
  MOCK_PAYMENTS,
  MOCK_SUPPORT,
} from './MockData';



const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.example.com';

// تابع کمکی برای مدیریت توکن
const getToken = () => {
    const user = localStorage.getItem('user');
    if (user) {
        try {
            return JSON.parse(user).token;
        } catch (e) {
            return null;
        }
    }
    return null;
};

// تابع پایه برای درخواست‌ها
const request = async (endpoint, options = {}) => {
    const token = getToken();
    
    const defaultHeaders = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };

    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers
        }
    };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        
        if (!response.ok) {
            if (response.status === 401) {
                // توکن منقضی شده - لاگ اوت
                localStorage.removeItem('user');
                window.location.href = '/login';
            }
            throw new Error(`API Error: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API Request failed:', error);
        throw error;
    }
};

// APIهای مربوط به نوتیفیکیشن
export const notificationAPI = {
    // دریافت لیست نوتیفیکیشن‌ها
    getNotifications: async () => {
        // اینجا بعداً با API واقعی جایگزین می‌شود
        // return await request('/notifications');
        
        // داده‌های تستی
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(MOCK_NOTIFICATIONS);
            }, 500); // شبیه‌سازی تاخیر شبکه
        });
    },

    // دریافت تعداد نوتیفیکیشن‌های خوانده نشده
    getUnreadCount: async () => {
        // اینجا بعداً با API واقعی جایگزین می‌شود
        // return await request('/notifications/unread/count');
        
        // داده‌های تستی
        return new Promise((resolve) => {
            setTimeout(() => {
                const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.read).length;
                resolve({ count: unreadCount });
            }, 300);
        });
    },

    // علامت زدن نوتیفیکیشن به عنوان خوانده شده
    markAsRead: async (notificationId) => {
        // اینجا بعداً با API واقعی جایگزین می‌شود
        // return await request(`/notifications/${notificationId}/read`, { 
        //     method: 'PUT' 
        // });
        
        // داده‌های تستی
        return new Promise((resolve) => {
            setTimeout(() => {
                const notification = MOCK_NOTIFICATIONS.find(n => n.id === notificationId);
                if (notification) {
                    notification.read = true;
                }
                resolve({ success: true, id: notificationId });
            }, 300);
        });
    },

    // علامت زدن همه نوتیفیکیشن‌ها به عنوان خوانده شده
    markAllAsRead: async () => {
        // اینجا بعداً با API واقعی جایگزین می‌شود
        // return await request('/notifications/read-all', { 
        //     method: 'PUT' 
        // });
        
        // داده‌های تستی
        return new Promise((resolve) => {
            setTimeout(() => {
                MOCK_NOTIFICATIONS.forEach(n => n.read = true);
                resolve({ success: true });
            }, 500);
        });
    },

    // دریافت یک نوتیفیکیشن خاص
    getNotification: async (notificationId) => {
        // اینجا بعداً با API واقعی جایگزین می‌شود
        // return await request(`/notifications/${notificationId}`);
        
        // داده‌های تستی
        return new Promise((resolve) => {
            setTimeout(() => {
                const notification = MOCK_NOTIFICATIONS.find(n => n.id === notificationId);
                resolve(notification);
            }, 300);
        });
    }
};

//Report API
export const reportApi ={
    //GET Report/Sale 
    getSaleReport:async () =>{
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(
                    {
                    'tabs':['روز','هفته','ماه','سال'],
                    'values':['20,000 تومان', '150,000 تومان', '2,350,000 تومان', '153,545,000 تومان'],
                    'info':'گزارش مربوط به حجم فروش در بازه زمانی های مختلف'
                    }
                );
            }, 500); // شبیه‌سازی تاخیر شبکه
        })
    },

    //GET Report/View
    getViewReport:async () =>{
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(
                    {
                        'tabs':['روز','هفته','ماه','سال'],
                        'values':['5 نفر','37 نفر','114 نفر', '975 نفر'],
                        'info':'گزارش مربوط به حجم بازدید کاربران از فروشگاه شما در بازه زمانی های مختلف'
                    }
                );
            }, 500); // شبیه‌سازی تاخیر شبکه
        })
    },

    //GET Report/Inventory
    getInventoryReport:async () =>{
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(
                    {
                        'tabs':['موجود','ناموجود'],
                        'values':['20 محصول','3 محصول'],
                        'info':'گزارش مربوط به موجودی یا ناموجودی کالاهای شما در فروشگاه'
                    }
                );
            }, 500); // شبیه‌سازی تاخیر شبکه
        })
    },

    //GET Report/Accountant
    getAccountReport:async () =>{
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(
                    {
                        'tabs':['موجودی حساب','برداشت شده'],
                        'values':['1,540,000 تومان','23,530,000 تومان'],
                        'info':'گزارش مربوط به موجودی فعلی حساب فروشگاه و مبلغی که تاکنون از حساب فروشگاه برداشت شده است'
                    }
                );
            }, 500); // شبیه‌سازی تاخیر شبکه
        })
    },

    getAccountBoxReport:async () =>{
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(
                {
                    'tabs':['صندوق'],
                    'values':['1,540,000 تومان']
                }
                );
            }, 500); // شبیه‌سازی تاخیر شبکه
        })
    },

    getAccountIncomeReport:async () =>{
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(
                    {
                        'tabs':['درآمد'],
                        'values':['23,530,000 تومان']
                    }
                );
            }, 500); // شبیه‌سازی تاخیر شبکه
        })
    },
};

export const orderApi = {
    getAll: async () => {
        return Promise.resolve(MOCK_ORDERS);
    },
    getByFilter: async (filter) => {

    },
    getById: async (id) => {
        const order = MOCK_ORDERS.find(o => o[0] === id);
        return Promise.resolve(order);
    }
}

export const commentApi = {
    getAll:async()=>{
        return Promise.resolve(MOCK_COMMENTS);
    },
    getByFilter: async (filter) => {

    },
    getById:async(id)=>{
        const res = MOCK_COMMENTS.find(c => c.id === id);
        return Promise.resolve(res);
    }
}

export const paymentApi = {
    getAll:async()=>{
        return Promise.resolve(MOCK_PAYMENTS);
    },
    getByFilter: async (filter) => {

    },
    getById: async (id) => {
        const order = MOCK_PAYMENTS.find(o => o[0] === id);
        return Promise.resolve(order);
    }
}

export const supportApi = {
    getAll:async()=>{
        return Promise.resolve(MOCK_SUPPORT);
    },
    getByFilter: async (filter) => {

    },
    getById: async (id) => {
        const order = MOCK_SUPPORT.find(o => o[0] === id);
        return Promise.resolve(order);
    }
}

export const shopAPi ={
    getShop:async()=>{
        return Promise.resolve(MOCK_SHOP);
    }

}

//Products API
// APIهای مربوط به محصولات
export const productAPI = {

    getAllProducts: async () => {
        return Promise.resolve(MOCK_PRODUCTS);
    },

    getProducts: async (
        page,
        pageSize,
        search,
        stockFilter,
        categoryFilter = []
        ) => {

        const allProducts = await productAPI.getAllProducts();

        let filtered = [...allProducts];

        // search
        if (search) {
            const q = search.toLowerCase();
            filtered = filtered.filter(p =>
            p.title.toLowerCase().includes(q)
            );
        }

        // stock filter
        if (stockFilter === "inStock") {
            filtered = filtered.filter(p => p.stock > 0);
        }

        if (stockFilter === "outOfStock") {
            filtered = filtered.filter(p => p.stock === 0);
        }

        // category filter
        if (categoryFilter.length > 0) {
            filtered = filtered.filter(product =>
            product.categories?.some(c =>
                categoryFilter.includes(c.subCategoryId)
            )
            );
        }

        // pagination بعد از همه فیلترها
        const totalPages = Math.ceil(filtered.length / pageSize);

        const start = (page - 1) * pageSize;
        const end = start + pageSize;

        const products = filtered.slice(start, end);

        return {
            products,
            totalPages
        };
    },

    // دریافت یک محصول
    getProduct: async (productId) => {
        return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(productId);
            const product = MOCK_PRODUCTS.find(p => p.id === productId);
            console.log(product)
            if (!product) {
            reject(new Error("محصول یافت نشد"));
            return;
            }

            resolve(product);

        }, 300);
        });
    },

    // آپلود تصویر
    uploadImage: async (file) => {
        return new Promise((resolve) => {
        setTimeout(() => {

            const fakeUrl = URL.createObjectURL(file);

            resolve({
            url: fakeUrl
            });

        }, 800);
        });
    },

    // ساخت محصول جدید
    createProduct: async (productData) => {

        await new Promise(resolve => setTimeout(resolve, 500));

        const newProduct = {
        id: Date.now(),

        title: productData.title || "",
        price: productData.price || 0,
        stock: productData.stock || 0,

        image: productData.image || {
            main: "",
            gallery: []
        },

        variables: productData.variables || [],

        description: productData.description || "",

        categories: productData.categories || []
        };

        MOCK_PRODUCTS.push(newProduct);

        return {
        success: true,
        product: newProduct
        };
    },

    // بروزرسانی محصول
    updateProduct: async (productId, productData) => {

        await new Promise(resolve => setTimeout(resolve, 500));

        const index = MOCK_PRODUCTS.findIndex(p => p.id === productId);

        if (index === -1) {
        throw new Error("محصول یافت نشد");
        }

        MOCK_PRODUCTS[index] = {
        ...MOCK_PRODUCTS[index],
        ...productData
        };

        return {
        success: true,
        product: MOCK_PRODUCTS[index]
        };
    }

};

//discount API
let nextId =3;
export const discountAPI = {

  /**
   * دریافت تمام تخفیف‌ها
   * @returns {Promise<Array>}
   */
  getAll: async () => {
    return Promise.resolve([...MOCK_DISCOUNTS]);
  },

  /**
   * دریافت تخفیف بر اساس نوع و ID
   * @param {"category"|"subCategory"|"product"} type
   * @param {number} id
   */
  getByTarget: async (type, id) => {
    const found = MOCK_DISCOUNTS.find(d => {
      if (type === "category")    return d.type === "category"    && d.categoryId   === id;
      if (type === "subCategory") return d.type === "subCategory" && d.subCategoryId === id;
      if (type === "product")     return d.type === "product"     && d.productId     === id;
      return false;
    });
    return Promise.resolve(found || null);
  },

  create: async (payload) => {
    const newDiscount = { ...payload, id: nextId++ };
    MOCK_DISCOUNTS.push(newDiscount);
    return Promise.resolve(newDiscount);
  },

  /**
   * ویرایش تخفیف موجود
   * @param {number} id  - شناسه تخفیف
   * @param {object} payload - فیلدهای جدید
   */
  update: async (id, payload) => {
    MOCK_DISCOUNTS = MOCK_DISCOUNTS.map(d =>
      d.id === id ? { ...d, ...payload } : d
    );
    const updated = MOCK_DISCOUNTS.find(d => d.id === id);
    return Promise.resolve(updated);
  },

  /**
   * حذف تخفیف
   * @param {number} id
   */
  delete: async (id) => {
    MOCK_DISCOUNTS = MOCK_DISCOUNTS.filter(d => d.id !== id);
    return Promise.resolve({ success: true });
  }
}

// categories api
export const categoryAPI = {

    getCategories: async () => {
        return Promise.resolve(MOCK_CATEGORIES);
    },

    searchCategories: async (searchTerm) => {

        const term = (searchTerm || "").trim();
        if (!term) return Promise.resolve(MOCK_CATEGORIES);

        const lower = term.toLowerCase();

        const result = MOCK_CATEGORIES
            .map(cat => ({
                ...cat,
                subCategories: cat.subCategories.filter(sub =>
                    cat.name.toLowerCase().includes(lower) ||
                    sub.name.toLowerCase().includes(lower)
                )
            }))
            .filter(cat =>
                cat.name.toLowerCase().includes(lower) ||
                cat.subCategories.length > 0
            );

        return Promise.resolve(result);
    },

    getCategoriesInUse: async () => {

        const categories = await categoryAPI.getCategories();
        const products = await productAPI.getAllProducts();

        // شمارش subCategory
        const subCounts = new Map();

        // برای جلوگیری از دوبار شمردن محصول در mainCategory
        const mainProductSets = new Map();

        for (const product of products) {

            const mainSet = new Set();

            for (const cat of product.categories) {

                const subKey = `${cat.mainCategoryId}-${cat.subCategoryId}`;

                // count subCategory
                subCounts.set(subKey, (subCounts.get(subKey) || 0) + 1);

                // جمع آوری mainCategory های یکتا برای این محصول
                mainSet.add(cat.mainCategoryId);
            }

            // ثبت محصول برای هر mainCategory فقط یکبار
            for (const mainId of mainSet) {

                if (!mainProductSets.has(mainId)) {
                    mainProductSets.set(mainId, new Set());
                }

                mainProductSets.get(mainId).add(product.id);
            }
        }

        return categories.map(category => {

            const subCategories = category.subCategories.map(sub => {

                const key = `${category.id}-${sub.id}`;

                return {
                    ...sub,
                    count: subCounts.get(key) || 0
                };

            }).filter(sub => sub.count > 0); // حذف زیر دسته بدون محصول

            return {
                id: category.id,
                name: category.name,
                subCategories,
                count: mainProductSets.get(category.id)?.size || 0
            };

        }).filter(cat => cat.count > 0); // حذف دسته بدون محصول
    }
};

// API برای مدیریت متغیرها
export const variableAPI = {
  // دریافت لیست ویژگی‌ها
  getAttributes: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_ATTRIBUTES;
  },

  // دریافت مقادیر یک ویژگی
  getAttributeValues: async (attributeId) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return MOCK_ATTRIBUTE_VALUES.filter(v => v.attributeId === attributeId);
  },

  // دریافت تمام مقادیر
  getAllAttributeValues: async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return MOCK_ATTRIBUTE_VALUES;
  }
};

// APIهای مربوط به احراز هویت
export const authAPI = {
    login: (username, password) => 
        request('/auth/login', { 
            method: 'POST', 
            body: JSON.stringify({ username, password }) 
        }),
    logout: () => 
        request('/auth/logout', { method: 'POST' }),
    getProfile: () => 
        request('/auth/profile')
};

// APIهای مربوط به سوپرادمین
export const superAdminAPI = {
    getStates: () => request('/admin/states'),
    getPayments: () => request('/admin/payments'),
    getReports: () => request('/admin/reports'),
    // ... سایر متدها
};

// APIهای مربوط به مدیر مرکز
export const stateAdminAPI = {
    getSellers: (stateId) => request(`/states/${stateId}/sellers`),
    getProducts: (stateId) => request(`/states/${stateId}/products`),
    // ... سایر متدها
};

// APIهای مربوط به فروشنده
export const sellerAPI = {
    getOrders: (shopId) => request(`/shops/${shopId}/orders`),
    getProducts: (shopId) => request(`/shops/${shopId}/products`),
    // ... سایر متدها
};

export default {
    auth: authAPI,
    superAdmin: superAdminAPI,
    stateAdmin: stateAdminAPI,
    seller: sellerAPI,
    notification: notificationAPI
};