import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { ROLES } from '../../Utilities/Roles';
import ProtectedRoute from '../../Components/ProtectedRoute/ProtectedRoute';
import SuperAdminRoutes from '../../Routes/SuperAdmin/SuperAdminRoutes';
import StateAdminRoutes from '../../Routes/StateAdmin/StateAdminRoutes';
import SellerRoutes from '../../Routes/Seller/SellerRoutes';

function Content() {
    const { user } = useAuth();

    // تابع کمکی برای تبدیل نقش به مسیر
    const getDefaultRoute = () => {
        switch(user?.role) {
            case ROLES.SUPERADMIN.name:
                return '/super-admin/dashboard';
            case ROLES.STATEADMIN.name:
                return '/state-admin/dashboard';
            case ROLES.SELLER.name:
                return '/seller/dashboard';
            default:
                return '/';
        }
    };

    return (
        <Routes>
            <Route path="/super-admin/*" element={
                <ProtectedRoute allowedRoles={[ROLES.SUPERADMIN]}>
                    <SuperAdminRoutes />
                </ProtectedRoute>
            } />

            <Route path="/state-admin/*" element={
                <ProtectedRoute allowedRoles={[ROLES.STATEADMIN]}>
                    <StateAdminRoutes />
                </ProtectedRoute>
            } />

            <Route path="/seller/*" element={
                <ProtectedRoute allowedRoles={[ROLES.SELLER]}>
                    <SellerRoutes />
                </ProtectedRoute>
            } />

            <Route path="/" element={
                <Navigate to={getDefaultRoute()} replace />
            } />
        </Routes>
    );
}

export default Content;