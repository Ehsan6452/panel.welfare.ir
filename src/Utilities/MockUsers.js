// موقت - برای شبیه‌سازی کاربران تا زمان اتصال به بک‌اند
export const MOCK_USERS = [
    {
        id: 1,
        username: 'superadmin',
        password: '123456',
        role: 'SUPERADMIN',
        name: 'مدیر کل',
        badge: 'مدیر سیستم'
    },
    {
        id: 2,
        username: 'stateadmin',
        password: '123456',
        role: 'STATEADMIN',
        name: 'مدیر استان تهران',
        badge: 'مدیر مرکز',
        state: 'تهران'
    },
    {
        id: 3,
        username: 'seller',
        password: '123456',
        role: 'SELLER',
        name: 'فروشگاه سحر',
        badge: 'فروشنده',
        shopId: 101
    }
];

export const mockLogin = (username, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = MOCK_USERS.find(
                u => u.username === username && u.password === password
            );
            
            if (user) {
                const { password, ...userWithoutPassword } = user;
                resolve(userWithoutPassword);
            } else {
                reject(new Error('نام کاربری یا رمز عبور اشتباه است'));
            }
        }, 500);
    });
};