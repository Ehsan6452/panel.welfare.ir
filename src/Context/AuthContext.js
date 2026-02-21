import React, { createContext, useState, useContext, useEffect } from 'react';
import { ROLES } from '../Utilities/Roles';
import { mockLogin } from '../Utilities/MockUsers';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // بررسی وجود کاربر در localStorage هنگام بارگذاری اولیه
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []);

    // تابع لاگین
    const login = async (username, password) => {
        setLoading(true);
        setError(null);
        
        try {
            const userData = await mockLogin(username, password);
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return userData;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // تابع logout
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    // گرفتن نقش کاربر (برای سازگاری با کدهای قبلی)
    const role = user ? ROLES[user.role] : null;

    return (
        <AuthContext.Provider value={{
            user,
            role,
            loading,
            error,
            login,
            logout,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};