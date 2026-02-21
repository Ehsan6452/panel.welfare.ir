import React from "react";
import { 
  RxDashboard,
  RxBarChart,
  RxQuestionMarkCircled,
  RxGear 
} from "react-icons/rx";
import { MdOutlineHub, MdOutlinePayment } from "react-icons/md";

// import pages
import Dashboard from '../../Pages/SuperAdmin/Dashboard/Dashboard';
import States from '../../Pages/SuperAdmin/States/States';
import Payments from '../../Pages/SuperAdmin/Payments/Payments';
import Reports from '../../Pages/SuperAdmin/Reports/Reports';
import Support from '../../Pages/SuperAdmin/Support/Support';
import Setting from '../../Pages/SuperAdmin/Setting/Setting';

// import submenu pages



export const superAdminRoutesConfig = [
    {
        path: 'dashboard',
        label: 'داشبورد',
        icon: <RxDashboard />,
        element: <Dashboard />,
        subRoutes: [] 
    },
    {
        path: 'states',
        label: 'استان‌ها',
        icon: <MdOutlineHub />,
        element: <States />, 
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
    return `/super-admin/${basePath}${subPath ? `/${subPath}` : ''}`;
};


export const getSidebarMenuItems = () => {
    return superAdminRoutesConfig.map(route => ({
        path: `/super-admin/${route.path}`,
        label: route.label,
        icon: route.icon,
        submenu: route.subRoutes.map(sub => ({
            path: `/super-admin/${route.path}/${sub.path}`,
            label: sub.label
        }))
    }));
};


export const getAllRoutes = () => {
    const routes = [];
    
    superAdminRoutesConfig.forEach(route => {

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