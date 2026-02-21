export const ROLES = {
    SUPERADMIN: {
        name: 'SUPERADMIN',
        label: 'مدیر کل',
        badge: 'مدیر سیستم',
        dashboard: '/super-admin/dashboard'
    },
    STATEADMIN: {
        name: 'STATEADMIN',
        label: 'مدیر مرکز',
        badge: 'مدیر مرکز',
        dashboard: '/state-admin/dashboard'
    },
    SELLER: {
        name: 'SELLER',
        label: 'فروشنده',
        badge: 'فروشنده',
        dashboard: '/seller/dashboard'
    }
};


export const PERMISSIONS = {

    [ROLES.SUPERADMIN]: {
        // canViewAllPages: true,
    },

    [ROLES.STATEADMIN]: {
        // canViewAllPages: false,
    },

    [ROLES.SELLER]: {
        // canViewAllPages: false,
    }
};


export const ROUTES_BY_ROLE = {
    [ROLES.SUPERADMIN]: [
        // { path: '/dashboard', component: 'AdminDashboard' }
    ],
    [ROLES.STATEADMIN]: [
        // { path: '/dashboard', component: 'SellerDashboard' },
    ],
    [ROLES.SELLER]: [
        // { path: '/dashboard', component: 'CustomerDashboard' },
    ]
};