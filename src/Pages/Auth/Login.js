import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { VscOrganization } from "react-icons/vsc";
// import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login, error } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            await login(username, password);
            navigate('/'); // بعد از لاگین موفق به صفحه اصلی می‌رود
        } catch (err) {
            // خطا توسط Context مدیریت می‌شود
            console.error('Login failed:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                <div>
                    <div className="flex justify-center">
                        <VscOrganization className="text-6xl text-blue-600" />
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        فروشگاه بهزیستی
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        برای ورود نام کاربری و رمز عبور خود را وارد کنید
                    </p>
                </div>
                
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                نام کاربری
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="superadmin / stateadmin / seller"
                                dir="ltr"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                رمز عبور
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="••••••"
                                dir="ltr"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded-lg">
                            {error}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${
                                isLoading 
                                    ? 'bg-blue-400 cursor-not-allowed' 
                                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                            }`}
                        >
                            {isLoading ? 'در حال ورود...' : 'ورود'}
                        </button>
                    </div>

                    {/* راهنمای موقت - در نسخه نهایی حذف شود */}
                    <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <p className="text-xs text-yellow-800">
                            <span className="font-bold">راهنمای موقت:</span><br />
                            superadmin / 123456<br />
                            stateadmin / 123456<br />
                            seller / 123456
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;