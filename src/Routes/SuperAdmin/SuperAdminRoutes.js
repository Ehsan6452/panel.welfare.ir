// Routes/SuperAdmin/SuperAdminRoutes.js
// import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from '../../Components/ProtectedRoute/ProtectedRoute';
import { ROLES } from "../../Utilities/Roles";
import { getAllRoutes } from './SuperAdminRoutesConfig';

function SuperAdminRoutes() {
    // دریافت همه مسیرها از کانفیگ
    const allRoutes = getAllRoutes();

    return (
        <Routes>

            <Route index element={
                <ProtectedRoute allowedRoles={[ROLES.SUPERADMIN]}>
                    <Navigate to='super-admin/dashboard' replace />
                </ProtectedRoute>
            }/>


            {allRoutes.map(route => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={
                        <ProtectedRoute allowedRoles={[ROLES.SUPERADMIN]}>
                            {route.element}
                        </ProtectedRoute>
                    }
                />
            ))}


            <Route path="*" element={
                <ProtectedRoute allowedRoles={[ROLES.SUPERADMIN]}>
                    <Navigate to='dashboard' replace />
                </ProtectedRoute>
            }/>
        </Routes>
    );
}

export default SuperAdminRoutes;