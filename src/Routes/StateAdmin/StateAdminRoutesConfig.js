// Routes/StateAdmin/stateAdminRoutesConfig.js
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
import Dashboard from '../../Pages/StateAdmin/Dashboard/Dashboard';
import Shops from '../../Pages/StateAdmin/Shops/Shop';
import Orders from '../../Pages/StateAdmin/Orders/Orders';
import Payments from '../../Pages/StateAdmin/Payments/Payments';
import Reports from '../../Pages/StateAdmin/Reports/Reports';
import Support from '../../Pages/StateAdmin/Support/Support';
import Setting from '../../Pages/StateAdmin/Setting/Setting';


// ساختار اصلی مسیرها
export const stateAdminRoutesConfig = [
    {
        path: 'dashboard',
        label: 'داشبورد',
        icon: <RxDashboard />,
        element: <Dashboard />,
        subRoutes: []
    },
    {
        path: 'shops',
        label: 'فروشگاه‌ها',
        icon: <AiOutlineShop />,
        element: <Shops />,
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
    return `/state-admin/${basePath}${subPath ? `/${subPath}` : ''}`;
};


export const getSidebarMenuItems = () => {
    return stateAdminRoutesConfig.map(route => ({
        path: `/state-admin/${route.path}`,
        label: route.label,
        icon: route.icon,
        submenu: route.subRoutes.map(sub => ({
            path: `/state-admin/${route.path}/${sub.path}`,
            label: sub.label
        }))
    }));
};

export const getAllRoutes = () => {
    const routes = [];
    
    stateAdminRoutesConfig.forEach(route => {

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