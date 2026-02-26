// Header.js
import React, { useState, useEffect, useRef } from "react";
import { 
  IoMenu, 
  IoSearch, 
  IoExpandOutline, 
  IoContractOutline, 
  IoNotificationsOutline,
  IoClose,
  IoLogOutOutline,
  IoChevronDown,
  IoSunnyOutline,
  IoMoonOutline
} from "react-icons/io5";
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext';

function Header({ onMenuClick, isMobile, isMobileSidebarOpen }) {
    const { theme, toggleTheme } = useTheme();
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const notificationRef = useRef(null);
    const profileRef = useRef(null);

    // نمونه اعلان‌ها
    const notifications = [
        { 
            id: 1, 
            text: 'سفارش جدید به ارزش ۲۵۰,۰۰۰ تومان ثبت شد',
            time: '۲ دقیقه پیش', 
            read: false
        },
        { 
            id: 2, 
            text: 'پرداخت سفارش #۱۲۳۴ با موفقیت انجام شد',
            time: '۱ ساعت پیش', 
            read: false
        },
        { 
            id: 3, 
            text: 'محصول "گل رز" به فروشگاه اضافه شد',
            time: '۳ ساعت پیش', 
            read: true
        },
        { 
            id: 4, 
            text: 'محصول "گلدان سفید" رو به اتمام است',
            time: 'روز پیش', 
            read: false
        },
    ];

    const unreadCount = notifications.filter(n => !n.read).length;

    // بستن منوها با کلیک خارج
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setIsNotificationsOpen(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // مدیریت تمام صفحه
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
    }, []);

    const toggleFullscreen = () => {
        if (!document.fullscreenEnabled) {
            alert("مرورگر شما از حالت تمام صفحه پشتیبانی نمی‌کند");
            return;
        }
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const iconSize = isMobile ? "text-2xl" : "text-2xl md:text-3xl";

    return (
        <div className="px-3 md:px-4 lg:px-5 py-2 md:py-3 flex items-center justify-between bg-background-primary border-b border-default">
            {/* بخش راست - منو و جستجو */}
            <div className="flex items-center gap-2 md:gap-4 flex-1">
                {/* دکمه منو فقط برای موبایل */}
                {isMobile && (
                    <button 
                        onClick={onMenuClick}
                        className="p-2 rounded-lg hover:bg-background-hover transition-colors"
                    >
                        {isMobileSidebarOpen ? (
                            <IoClose className="text-2xl text-primary" />
                        ) : (
                            <IoMenu className="text-2xl text-primary" />
                        )}
                    </button>
                )}

                {/* باکس جستجو */}
                <div className="relative max-w-xs md:max-w-md w-full">
                    <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-xl" />
                    <input
                        type="text"
                        placeholder="جستجو..."
                        className="w-full pl-10 pr-4 py-2 text-sm bg-background-primary border border-default rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-primary placeholder-muted"
                    />
                </div>
            </div>

            {/* بخش چپ - آیکون‌ها */}
            <div className="flex items-center gap-1 md:gap-2">
                {/* دکمه تمام صفحه (فقط دسکتاپ) */}
                {!isMobile && (
                    <button 
                        onClick={toggleFullscreen}
                        className="p-2 hover:bg-background-hover rounded-lg transition-colors"
                        title={isFullscreen ? "خروج از تمام صفحه" : "تمام صفحه"}
                    >
                        {isFullscreen ? (
                            <IoContractOutline className="text-2xl text-primary" />
                        ) : (
                            <IoExpandOutline className="text-2xl text-primary" />
                        )}
                    </button>
                )}

                {/* دکمه اعلان‌ها */}
                <div className="relative" ref={notificationRef}>
                    <button 
                        onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                        className="p-2 hover:bg-background-hover rounded-lg transition-colors relative"
                    >
                        <IoNotificationsOutline className="text-2xl text-primary" />
                        {unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 bg-danger text-white text-xs rounded-full flex items-center justify-center px-1 border-2 border-background-primary">
                                {unreadCount > 9 ? '9+' : unreadCount}
                            </span>
                        )}
                    </button>

                    {/* dropdown اعلان‌ها */}
                    {isNotificationsOpen && (
                        <div className={`
                            absolute mt-2 bg-background-secondary rounded-lg shadow-xl border border-default overflow-hidden z-50
                            ${isMobile 
                                ? 'left-1/2 -translate-x-1/2 w-[calc(100vw-2rem)]' 
                                : 'left-0 w-80'
                            }
                        `}>
                            {/* هدر */}
                            <div className="px-4 py-3 border-b border-default bg-background-primary">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-medium text-primary">اعلان‌ها</h3>
                                    <span className="text-xs text-muted">{unreadCount} عدد خوانده نشده</span>
                                </div>
                            </div>

                            {/* لیست اعلان‌ها */}
                            <div className="max-h-96 overflow-y-auto">
                                {notifications.length > 0 ? (
                                    notifications.map(notification => (
                                        <div 
                                            key={notification.id}
                                            className={`
                                                px-4 py-3 border-b border-default hover:bg-background-hover transition-colors cursor-pointer
                                                ${!notification.read ? 'bg-background-primary bg-opacity-30' : ''}
                                            `}
                                        >
                                            <div className="flex gap-3">
                                                {/* نقطه وضعیت خوانده شده */}
                                                <div className="flex-shrink-0 pt-1">
                                                    <div className={`
                                                        w-2 h-2 rounded-full mt-1
                                                        ${!notification.read ? 'bg-primary' : 'bg-transparent'}
                                                    `} />
                                                </div>
                                                
                                                {/* محتوای اعلان */}
                                                <div className="flex-1">
                                                    <p className="text-sm text-primary">{notification.text}</p>
                                                    <p className="text-xs text-muted mt-1">{notification.time}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-4 py-8 text-center">
                                        <p className="text-sm text-muted">هیچ اعلانی وجود ندارد</p>
                                    </div>
                                )}
                            </div>

                            {/* فوتر */}
                            <div className="px-4 py-2 border-t border-default bg-background-primary">
                                <button className="w-full py-1 text-sm text-primary hover:text-active text-center transition-colors">
                                    مشاهده همه اعلان‌ها
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* دکمه تغییر تم */}
                <button 
                    onClick={toggleTheme}
                    className="p-2 hover:bg-background-hover rounded-lg transition-colors"
                    title={theme === 'light' ? 'تم تاریک' : 'تم روشن'}
                >
                    {theme === 'light' ? (
                        <IoMoonOutline className="text-2xl text-primary" />
                    ) : (
                        <IoSunnyOutline className="text-2xl text-primary" />
                    )}
                </button>

                {/* منوی پروفایل */}
                <div className="relative" ref={profileRef}>
                    <button 
                        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                        className="flex items-center gap-2 p-1 hover:bg-background-hover rounded-lg transition-colors"
                    >
                        <img
                            src={`https://i.pravatar.cc/32?u=${user?.id || 1}`}
                            alt={user?.name}
                            className="w-8 h-8 rounded-full border-2 border-default"
                        />
                        {!isMobile && (
                            <IoChevronDown className={`text-muted transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
                        )}
                    </button>

                    {/* dropdown پروفایل */}
                    {isProfileMenuOpen && (
                        <div className="absolute left-0 mt-2 w-48 bg-background-secondary rounded-lg shadow-lg py-1 border border-default z-50">
                            <div className="px-4 py-2 border-b border-default">
                                <p className="text-sm font-medium text-primary">{user?.name}</p>
                                <p className="text-xs text-muted mt-0.5">{user?.badge}</p>
                            </div>
                            
                            <button
                                onClick={handleLogout}
                                className="w-full text-right px-4 py-2 text-sm text-danger hover:bg-background-hover flex items-center gap-2 transition-colors"
                            >
                                <IoLogOutOutline className="text-lg" />
                                <span>خروج از حساب</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;