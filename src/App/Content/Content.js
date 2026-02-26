import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { ROLES } from '../../Utilities/Roles';
import SuperAdminRoutes from '../../Routes/SuperAdmin/SuperAdminRoutes';
import StateAdminRoutes from '../../Routes/StateAdmin/StateAdminRoutes';
import SellerRoutes from '../../Routes/Seller/SellerRoutes';

function Content() {
    const { user } = useAuth();

    if (!user) return null;

    // مسیر پایه بر اساس نقش
    const getBasePath = () => {
        switch(user.role) {
            case ROLES.SUPERADMIN.name:
                return '/super-admin';
            case ROLES.STATEADMIN.name:
                return '/state-admin';
            case ROLES.SELLER.name:
                return '/seller';
            default:
                return '/';
        }
    };

    const basePath = getBasePath();

    return (
        <Routes>
            {/* مسیر اصلی - ریدایرکت به داشبورد */}
            <Route path="/" element={<Navigate to={`${basePath}/dashboard`} replace />} />
            
            {/* مسیرهای هر نقش */}
            <Route path="/super-admin/*" element={
                user.role === ROLES.SUPERADMIN.name ? 
                <SuperAdminRoutes /> : 
                <Navigate to={basePath + '/dashboard'} replace />
            } />
            
            <Route path="/state-admin/*" element={
                user.role === ROLES.STATEADMIN.name ? 
                <StateAdminRoutes /> : 
                <Navigate to={basePath + '/dashboard'} replace />
            } />
            
            <Route path="/seller/*" element={
                user.role === ROLES.SELLER.name ? 
                <SellerRoutes /> : 
                <Navigate to={basePath + '/dashboard'} replace />
            } />

            {/* هر مسیر دیگری - ریدایرکت به داشبورد */}
            <Route path="*" element={<Navigate to={basePath + '/dashboard'} replace />} />
        </Routes>
    );
}

export default Content;