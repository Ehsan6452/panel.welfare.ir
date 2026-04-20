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

import Dashboard from '../../Pages/StateAdmin/Dashboard/Dashboard';
import Shops from '../../Pages/StateAdmin/Shops/Shops';
import Orders from '../../Pages/StateAdmin/Orders/Orders';
import Payments from '../../Pages/StateAdmin/Payments/Payments';
import Reports from '../../Pages/StateAdmin/Reports/Reports';
import Support from '../../Pages/StateAdmin/Support/Support';
import Setting from '../../Pages/StateAdmin/Setting/Setting';

export const stateAdminRoutesConfig = [
    { path: 'dashboard', label: 'داشبورد', icon: <RxDashboard />, element: <Dashboard />, subRoutes: [] },
    { path: 'shops', label: 'فروشگاه‌ها', icon: <AiOutlineShop />, element: <Shops />, subRoutes: [] },
    { path: 'orders', label: 'سفارشات', icon: <RxStack />, element: <Orders />, subRoutes: [] },
    { path: 'payments', label: 'پرداخت‌ها', icon: <MdOutlinePayment />, element: <Payments />, subRoutes: [] },
    { path: 'reports', label: 'گزارشات', icon: <RxBarChart />, element: <Reports />, subRoutes: [] },
    { path: 'support', label: 'پشتیبانی', icon: <RxQuestionMarkCircled />, element: <Support />, subRoutes: [] },
    { path: 'setting', label: 'تنظیمات', icon: <RxGear />, element: <Setting />, subRoutes: [] }
];

export const getSidebarMenuItems = () => {
    return stateAdminRoutesConfig.map(route => ({
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

export const getAllRoutes = () => {
    return stateAdminRoutesConfig.map(route => ({
        path: route.path,
        element: route.element
    }));
};
