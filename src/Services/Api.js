// این فایل بعداً با API واقعی جایگزین می‌شود
// تمام درخواست‌های API در اینجا متمرکز می‌شوند

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
    seller: sellerAPI
};