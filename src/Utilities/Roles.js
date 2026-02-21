export const ROLES = {
    SUPERADMIN: {
        badge:'مدیر کل فروشگاه',
        name:'SuperAdmin',
    },
    STATEADMIN:{
        badge:'مدیر استان',
        name:'StateAdmin',
    },
    SELLER:{
        badge:'مدیر فروشگاه',
        name:'Seller',
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