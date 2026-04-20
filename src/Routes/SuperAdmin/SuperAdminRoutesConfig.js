import React from "react";
import { 
  RxDashboard,
  RxBarChart,
  RxQuestionMarkCircled,
  RxGear
} from "react-icons/rx";
import { MdOutlineHub, MdOutlinePayment } from "react-icons/md";

import Dashboard from '../../Pages/SuperAdmin/Dashboard/Dashboard';
import States from '../../Pages/SuperAdmin/States/States';
import Payments from '../../Pages/SuperAdmin/Payments/Payments';
import Reports from '../../Pages/SuperAdmin/Reports/Reports';
import Support from '../../Pages/SuperAdmin/Support/Support';
import Setting from '../../Pages/SuperAdmin/Setting/Setting';

export const superAdminRoutesConfig = [
    { path: 'dashboard', label: 'داشبورد', icon: <RxDashboard />, element: <Dashboard />, subRoutes: [] },
    { path: 'states', label: 'استان‌ها', icon: <MdOutlineHub />, element: <States />, subRoutes: [] },
    { path: 'payments', label: 'پرداخت‌ها', icon: <MdOutlinePayment />, element: <Payments />, subRoutes: [] },
    { path: 'reports', label: 'گزارشات', icon: <RxBarChart />, element: <Reports />, subRoutes: [] },
    { path: 'support', label: 'پشتیبانی', icon: <RxQuestionMarkCircled />, element: <Support />, subRoutes: [] },
    { path: 'setting', label: 'تنظیمات', icon: <RxGear />, element: <Setting />, subRoutes: [] }
];

export const getSidebarMenuItems = () => {
    return superAdminRoutesConfig.map(route => ({
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
    return superAdminRoutesConfig.map(route => ({
        path: route.path,
        element: route.element
    }));
};
