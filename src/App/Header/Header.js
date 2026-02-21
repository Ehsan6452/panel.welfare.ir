// Header.js
import React, { useState, useEffect } from "react";
import { 
  IoMenu, 
  IoSearch, 
  IoExpandOutline, 
  IoContractOutline, 
  IoNotificationsOutline,
  IoClose,
  IoLogOutOutline,
  IoChevronDown
} from "react-icons/io5";
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5';
import { useTheme } from '../../Context/ThemeContext';

function Header({ onMenuClick, isSidebarCollapsed, isMobile, isMobileSidebarOpen }) {
    const { theme, toggleTheme } = useTheme();
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const isFullscreenEnabled = () => {
        return document.fullscreenEnabled || 
               document.webkitFullscreenEnabled || 
               document.mozFullScreenEnabled || 
               document.msFullscreenEnabled;
    };

    const getFullscreenElement = () => {
        return document.fullscreenElement ||
               document.webkitFullscreenElement ||
               document.mozFullScreenElement ||
               document.msFullscreenElement;
    };

    const requestFullscreen = (element) => {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    };

    const exitFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    };

    const toggleFullscreen = () => {
        if (!isFullscreenEnabled()) {
            alert("مرورگر شما از حالت تمام صفحه پشتیبانی نمی‌کند");
            return;
        }

        if (getFullscreenElement()) {
            exitFullscreen();
        } else {
            requestFullscreen(document.documentElement);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.profile-menu-container')) {
                setIsProfileMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!getFullscreenElement());
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
        document.addEventListener("mozfullscreenchange", handleFullscreenChange);
        document.addEventListener("MSFullscreenChange", handleFullscreenChange);

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
            document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
            document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
            document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
        };
    }, []);

    const iconSize = isMobile ? "text-3xl" : "text-4xl";

    return (
        <div className="px-3 md:px-4 lg:px-5 py-2 md:py-3 flex items-center justify-between bg-background-primary border-b border-default">
            <div className="flex items-center gap-2 md:gap-4 flex-1">
                <button 
                    onClick={onMenuClick}
                    className="p-1.5 md:p-2 rounded-lg hover:bg-background-hover transition-colors relative group"
                    title={isMobile ? "منو" : (isSidebarCollapsed ? "باز کردن سایدبار" : "بستن سایدبار")}
                >
                    {isMobile && isMobileSidebarOpen ? (
                        <IoClose className={`${iconSize} text-primary`} />
                    ) : (
                        <IoMenu className={`${iconSize} text-primary`} />
                    )}
                    
                    {!isMobile && (
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {isSidebarCollapsed ? "باز کردن سایدبار" : "بستن سایدبار"}
                        </span>
                    )}
                </button>

                <div className="relative max-w-xs md:max-w-md w-full">
                    <IoSearch className={`absolute left-2 md:left-3 top-1/2 -translate-y-1/2 text-muted ${isMobile ? 'text-xl' : 'text-2xl md:text-3xl'}`} />
                    <input
                        type="text"
                        placeholder={isMobile ? "جستجو..." : "جستجو..."}
                        className="w-full pl-8 md:pl-10 pr-2 md:pr-4 py-1.5 md:py-2 text-sm md:text-base bg-background-primary border border-default rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-primary placeholder-muted"
                    />
                </div>
            </div>

            <div className="flex items-center gap-1 md:gap-2">
                {!isMobile && (
                    <button 
                        onClick={toggleFullscreen}
                        className="p-1.5 md:p-2 hover:bg-background-hover rounded-lg transition-colors relative group"
                        title={isFullscreen ? "خروج از تمام صفحه" : "تمام صفحه"}
                    >
                        {isFullscreen ? (
                            <IoContractOutline className={`${iconSize} text-primary`} />
                        ) : (
                            <IoExpandOutline className={`${iconSize} text-primary`} />
                        )}
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {isFullscreen ? "خروج از تمام صفحه" : "تمام صفحه"}
                        </span>
                    </button>
                )}

                <button className="p-1.5 md:p-2 hover:bg-background-hover rounded-lg transition-colors relative group">
                    <IoNotificationsOutline className={`${iconSize} text-primary`} />
                    <span className="absolute top-1 right-1 w-1.5 md:w-2 h-1.5 md:h-2 bg-danger rounded-full"></span>
                    
                    {!isMobile && (
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            نوتیفیکیشن‌ها
                        </span>
                    )}
                </button>

                <button 
                    onClick={toggleTheme}
                    className="p-1.5 md:p-2 hover:bg-background-hover rounded-lg transition-colors relative group"
                    title={theme === 'light' ? 'تم تاریک' : 'تم روشن'}
                >
                    {theme === 'light' ? (
                        <IoMoonOutline className={`${iconSize} text-primary`} />
                    ) : (
                        <IoSunnyOutline className={`${iconSize} text-primary`} />
                    )}
                    {!isMobile && (
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {theme === 'light' ? 'تم تاریک' : 'تم روشن'}
                        </span>
                    )}
                </button>

                <div className="relative profile-menu-container">
                    <button 
                        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                        className="flex items-center gap-1 md:gap-2 p-1 hover:bg-background-hover rounded-lg transition-colors group"
                    >
                        <img
                            src={`https://i.pravatar.cc/50?u=${user?.id || 1}`}
                            alt={user?.name || 'user profile'}
                            className={`
                                rounded-full border-2 border-default group-hover:border-primary transition-colors
                                ${isMobile ? 'w-7 h-7' : 'w-8 h-8 md:w-9 md:h-9'}
                            `}
                        />
                        {!isMobile && (
                            <IoChevronDown className={`text-secondary transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
                        )}
                    </button>

                    {isProfileMenuOpen && (
                        <div className="absolute left-0 mt-2 w-48 bg-background-secondary rounded-lg shadow-lg py-1 z-50 border border-default">
                            <div className="px-4 py-2 border-b border-default">
                                <p className="text-sm font-semibold text-primary">{user?.name}</p>
                                <p className="text-xs text-muted">{user?.badge}</p>
                            </div>
                            
                            <button
                                onClick={handleLogout}
                                className="w-full text-right px-4 py-2 text-sm text-danger hover:bg-background-hover flex items-center gap-2 transition-colors"
                            >
                                <IoLogOutOutline className="text-xl" />
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