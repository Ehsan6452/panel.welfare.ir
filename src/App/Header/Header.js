// Header.js
import React, { useState, useEffect } from "react";
import { 
  IoMenu, 
  IoSearch, 
  IoExpandOutline, 
  IoContractOutline, 
  IoNotificationsOutline,
  IoClose
} from "react-icons/io5";

function Header({ onMenuClick, isSidebarCollapsed, isMobile, isMobileSidebarOpen }) {
    const [isFullscreen, setIsFullscreen] = useState(false);

    // تابع بررسی پشتیبانی مرورگر از Fullscreen API
    const isFullscreenEnabled = () => {
        return document.fullscreenEnabled || 
               document.webkitFullscreenEnabled || 
               document.mozFullScreenEnabled || 
               document.msFullscreenEnabled;
    };

    // تابع دریافت المان در حالت تمام صفحه
    const getFullscreenElement = () => {
        return document.fullscreenElement ||
               document.webkitFullscreenElement ||
               document.mozFullScreenElement ||
               document.msFullscreenElement;
    };

    // تابع درخواست تمام صفحه
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

    // تابع خروج از تمام صفحه
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

    // تابع toggle تمام صفحه
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

    // گوش دادن به تغییرات وضعیت تمام صفحه
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

    // سایز آیکون‌ها بر اساس دستگاه
    const iconSize = isMobile ? "text-3xl" : "text-4xl";

    return (
        <div className="px-3 md:px-4 lg:px-5 py-2 md:py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-4 flex-1">
                <button 
                    onClick={onMenuClick}
                    className="p-1.5 md:p-2 rounded-lg hover:bg-gray-100 transition-colors relative group"
                    title={isMobile ? "منو" : (isSidebarCollapsed ? "باز کردن سایدبار" : "بستن سایدبار")}
                >
                    {isMobile && isMobileSidebarOpen ? (
                        <IoClose className={`${iconSize} text-gray-700`} />
                    ) : (
                        <IoMenu className={`${iconSize} text-gray-700`} />
                    )}
                    
                    {/* Tooltip فقط برای دسکتاپ */}
                    {!isMobile && (
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {isSidebarCollapsed ? "باز کردن سایدبار" : "بستن سایدبار"}
                        </span>
                    )}
                </button>

                {/* سرچ باکس - در موبایل کوچک‌تر می‌شود */}
                <div className="relative max-w-xs md:max-w-md w-full">
                    <IoSearch className={`absolute left-2 md:left-3 top-1/2 -translate-y-1/2 text-gray-400 ${isMobile ? 'text-xl' : 'text-2xl md:text-3xl'}`} />
                    <input
                        type="text"
                        placeholder={isMobile ? "جستجو..." : "جستجو..."}
                        className="w-full pl-8 md:pl-10 pr-2 md:pr-4 py-1.5 md:py-2 text-sm md:text-base border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                </div>
            </div>

            <div className="flex items-center gap-1 md:gap-2">
                {/* دکمه فول اسکرین - مخفی در موبایل */}
                {!isMobile && (
                    <button 
                        onClick={toggleFullscreen}
                        className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg transition-colors relative group"
                        title={isFullscreen ? "خروج از تمام صفحه" : "تمام صفحه"}
                    >
                        {isFullscreen ? (
                            <IoContractOutline className={iconSize} />
                        ) : (
                            <IoExpandOutline className={iconSize} />
                        )}
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {isFullscreen ? "خروج از تمام صفحه" : "تمام صفحه"}
                        </span>
                    </button>
                )}

                {/* دکمه نوتیفیکیشن */}
                <button className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg transition-colors relative group">
                    <IoNotificationsOutline className={iconSize} />
                    <span className="absolute top-1 right-1 w-1.5 md:w-2 h-1.5 md:h-2 bg-red-500 rounded-full"></span>
                    
                    {/* Tooltip فقط برای دسکتاپ */}
                    {!isMobile && (
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            نوتیفیکیشن‌ها
                        </span>
                    )}
                </button>

                {/* پروفایل کاربر */}
                <button className="flex items-center gap-1 md:gap-2 p-1 hover:bg-gray-100 rounded-lg transition-colors group relative">
                    <img
                        src="https://i.pravatar.cc/50"
                        alt="user profile"
                        className={`
                            rounded-full border-2 border-gray-200 group-hover:border-blue-500 transition-colors
                            ${isMobile ? 'w-7 h-7' : 'w-8 h-8 md:w-9 md:h-9'}
                        `}
                    />
                    
                    {/* Tooltip فقط برای دسکتاپ */}
                    {!isMobile && (
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            پروفایل
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
}

export default Header;