// Routes/StateAdmin/StateAdminRoutes.js
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from '../../Components/ProtectedRoute/ProtectedRoute';
import { ROLES } from "../../Utilities/Roles";
import { getAllRoutes } from './StateAdminRoutesConfig';

function StateAdminRoutes() {
    // دریافت همه مسیرها از کانفیگ
    const allRoutes = getAllRoutes();

    return (
        <Routes>

            <Route index element={
                <ProtectedRoute allowedRoles={[ROLES.STATEADMIN]}>
                    <Navigate to='state-admin/dashboard' replace />
                </ProtectedRoute>
            }/>


            {allRoutes.map(route => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={
                        <ProtectedRoute allowedRoles={[ROLES.STATEADMIN]}>
                            {route.element}
                        </ProtectedRoute>
                    }
                />
            ))}

            <Route path="*" element={
                <ProtectedRoute allowedRoles={[ROLES.STATEADMIN]}>
                    <Navigate to='dashboard' replace />
                </ProtectedRoute>
            }/>
        </Routes>
    );
}

export default StateAdminRoutes;