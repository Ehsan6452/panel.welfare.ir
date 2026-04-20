import { RxDashboard, RxStack, RxBarChart, RxQuestionMarkCircled, RxGear } from "react-icons/rx";
import { AiOutlineShop } from "react-icons/ai";
import { MdOutlinePayment } from "react-icons/md";

import Dashboard from '../../Pages/Seller/Dashboard/Dashboard';
import Shop from "../../Pages/Seller/Shops/shop";
import Products from '../../Pages/Seller/Shops/Products/Products';
import SingleProduct from "../../Pages/Seller/Shops/SingleProduct/SingleProduct";
import Discount from "../../Pages/Seller/Shops/Discounts/Discount";
import Orders from '../../Pages/Seller/Orders/Orders';
import Payments from '../../Pages/Seller/Payments/Payments';
import Reports from '../../Pages/Seller/Reports/Reports';
import Support from '../../Pages/Seller/Support/Support';
import Setting from '../../Pages/Seller/Setting/Setting';

export const sellerRoutesConfig = [
    { path: 'dashboard', label: 'داشبورد', icon: <RxDashboard />, element: <Dashboard />, subRoutes: [] },
    { path: 'shop', label: 'فروشگاه', icon: <AiOutlineShop />, element: <Shop />, subRoutes: [
        {path:'products',label:'محصولات', element: <Products />, subRoutes:[] },
        {path:'new-product',label:'افزودن محصول', element: <SingleProduct />, subRoutes:[] },
        {path:'edit-product', element: <SingleProduct />, subRoutes:[] },
        {path:'discounts', label:'تخفیف ها', element: <Discount />, subRoutes:[] }
    ] },
    { path: 'orders', label: 'سفارشات', icon: <RxStack />, element: <Orders />, subRoutes: [] },
    { path: 'payments', label: 'پرداخت‌ها', icon: <MdOutlinePayment />, element: <Payments />, subRoutes: [] },
    { path: 'reports', label: 'گزارشات', icon: <RxBarChart />, element: <Reports />, subRoutes: [] },
    { path: 'support', label: 'پشتیبانی', icon: <RxQuestionMarkCircled />, element: <Support />, subRoutes: [] },
    { path: 'setting', label: 'تنظیمات', icon: <RxGear />, element: <Setting />, subRoutes: [] }
];

export const getSidebarMenuItems = () => {
    return sellerRoutesConfig.map(route => ({
        path: `/${route.path}`,
        label: route.label,
        icon: route.icon,
        submenu: route.subRoutes
            .filter(sub => sub.label) // فقط آیتم‌هایی که label دارند
            .map(sub => ({
                path: `/${route.path}/${sub.path}`,
                label: sub.label
            }))
    }));
};
