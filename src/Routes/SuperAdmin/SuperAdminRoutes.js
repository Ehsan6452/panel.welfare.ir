import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { superAdminRoutesConfig } from './SuperAdminRoutesConfig';

function SuperAdminRoutes() {
    const validPaths = superAdminRoutesConfig.map(route => route.path);
    
    return (
        <Routes>
            {/* مسیر پیش‌فرض */}
            <Route index element={<Navigate to="dashboard" replace />} />
            
            {/* تعریف مسیرهای اصلی */}
            {superAdminRoutesConfig.map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                />
            ))}
            
            {/* برای مسیرهای نامعتبر - ریدایرکت به داشبورد */}
            <Route path="*" element={<Navigate to="/seller/dashboard" replace />} />
        </Routes>
    );
}

export default SuperAdminRoutes;