import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import RoleBasedElement from '../../Routes/RoleBasedElement';

function Content() {
    const { user } = useAuth();
    if (!user) return null;

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<RoleBasedElement path="dashboard" />} />
            <Route path="/shop" element={<RoleBasedElement path="shop" />}/>
                <Route path="/shop/products" element={<RoleBasedElement path="shop/products" />} />
                <Route path="/shop/new-product" element={<RoleBasedElement path="shop/new-product" key='new'/>} />
                <Route path="/shop/edit-product/:id" element={<RoleBasedElement path="shop/edit-product" key='edit'/>} />
                <Route path="/shop/discounts" element={<RoleBasedElement path="shop/discounts" />} />
            <Route path="/shops" element={<RoleBasedElement path="shops" />} />
            <Route path="/states" element={<RoleBasedElement path="states" />} />
            <Route path="/orders" element={<RoleBasedElement path="orders" />} />
            <Route path="/payments" element={<RoleBasedElement path="payments" />} />
            <Route path="/reports" element={<RoleBasedElement path="reports" />} />
            <Route path="/support" element={<RoleBasedElement path="support" />} />
            <Route path="/setting" element={<RoleBasedElement path="setting" />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
}

export default Content;
