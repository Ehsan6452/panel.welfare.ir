// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // اگر نقش کاربر مجاز نبود، به داشبورد خودش هدایت شود
        const dashboardPath = `/${user.role.toLowerCase().replace('_', '-')}/dashboard`;
        return <Navigate to={dashboardPath} replace />;
    }

    return children;
};

export default ProtectedRoute;