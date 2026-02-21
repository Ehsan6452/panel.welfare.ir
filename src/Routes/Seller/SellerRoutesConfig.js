// Routes/Seller/sellerRoutesConfig.js
import React from "react";
import { 
  RxDashboard,
  RxBarChart,
  RxQuestionMarkCircled,
  RxGear,
  RxStack 
} from "react-icons/rx";
import { MdOutlinePayment } from "react-icons/md";
import { AiOutlineShop } from "react-icons/ai";

// import main pages
import Dashboard from '../../Pages/Seller/Dashboard/Dashboard';
import Products from '../../Pages/Seller/Products/Products';
import Orders from '../../Pages/Seller/Orders/Orders';
import Payments from '../../Pages/Seller/Payments/Payments';
import Reports from '../../Pages/Seller/Reports/Reports';
import Support from '../../Pages/Seller/Support/Support';
import Setting from '../../Pages/Seller/Setting/Setting';


export const sellerRoutesConfig = [
    {
        path: 'dashboard',
        label: 'داشبورد',
        icon: <RxDashboard />,
        element: <Dashboard />,
        subRoutes: []
    },
    {
        path: 'products',
        label: 'محصولات',
        icon: <AiOutlineShop />,
        element: <Products />,
        subRoutes: []
    },
    {
        path: 'orders',
        label: 'سفارشات',
        icon: <RxStack />,
        element: <Orders />,
        subRoutes: []
    },
    {
        path: 'payments',
        label: 'پرداخت‌ها',
        icon: <MdOutlinePayment />,
        element: <Payments />,
        subRoutes: []
    },
    {
        path: 'reports',
        label: 'گزارشات',
        icon: <RxBarChart />,
        element: <Reports />,
        subRoutes: []
    },
    {
        path: 'support',
        label: 'پشتیبانی',
        icon: <RxQuestionMarkCircled />,
        element: <Support />,
        subRoutes: []
    },
    {
        path: 'setting',
        label: 'تنظیمات',
        icon: <RxGear />,
        element: <Setting />,
        subRoutes: []
    }
];


export const getFullPath = (basePath, subPath) => {
    return `/seller/${basePath}${subPath ? `/${subPath}` : ''}`;
};


export const getSidebarMenuItems = () => {
    return sellerRoutesConfig.map(route => ({
        path: `/seller/${route.path}`,
        label: route.label,
        icon: route.icon,
        submenu: route.subRoutes.map(sub => ({
            path: `/seller/${route.path}/${sub.path}`,
            label: sub.label
        }))
    }));
};


export const getAllRoutes = () => {
    const routes = [];
    
    sellerRoutesConfig.forEach(route => {

        routes.push({
            path: route.path,
            element: route.element
        });
        

        route.subRoutes.forEach(sub => {
            routes.push({
                path: `${route.path}/${sub.path}`,
                element: sub.element
            });
        });
    });
    
    return routes;
};