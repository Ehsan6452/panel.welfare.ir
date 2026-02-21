import React from "react";
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { ROLES } from '../../Utilities/Roles';
// imports routs
import SuperAdminRoutes from '../../Routes/SuperAdmin/SuperAdminRoutes';
import StateAdminRoutes from '../../Routes/StateAdmin/StateAdminRoutes';
import SellerRoutes from '../../Routes/Seller/SellerRoutes'

function Content() {
    const role = useAuth();
    return (
        <Routes>
            <Route path="/super-admin/*" element={
                role.name === ROLES.SUPERADMIN.name ? <SuperAdminRoutes /> : null
            } />

            <Route path="/state-admin/*" element={
                role.name === ROLES.STATEADMIN.name ? <StateAdminRoutes /> : null
            } />

            <Route path="/seller/*" element={
                role.name === ROLES.SELLER.name ? <SellerRoutes /> : null
            } />

            <Route path="/" element={
                role.name === ROLES.SUPERADMIN.name ? <SuperAdminRoutes /> :
                role.name === ROLES.STATEADMIN.name ? <StateAdminRoutes /> :
                role.name === ROLES.SELLER.name ? <SellerRoutes /> : null
            } />
        </Routes>
    );
}

export default Content;