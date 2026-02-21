// Routes/Seller/SellerRoutes.js
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from '../../Components/ProtectedRoute/ProtectedRoute';
import { ROLES } from "../../Utilities/Roles";
import { sellerRoutesConfig, getAllRoutes } from './SellerRoutesConfig';

function SellerRoutes() {
    // دریافت همه مسیرها از کانفیگ
    const allRoutes = getAllRoutes();

    return (
        <Routes>

            <Route index element={
                <ProtectedRoute allowedRoles={[ROLES.SELLER]}>
                    <Navigate to='seller/dashboard' replace />
                </ProtectedRoute>
            }/>

            {allRoutes.map(route => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={
                        <ProtectedRoute allowedRoles={[ROLES.SELLER]}>
                            {route.element}
                        </ProtectedRoute>
                    }
                />
            ))}

            <Route path="*" element={
                <ProtectedRoute allowedRoles={[ROLES.SELLER]}>
                    <Navigate to='dashboard' replace />
                </ProtectedRoute>
            }/>
        </Routes>
    );
}

export default SellerRoutes;