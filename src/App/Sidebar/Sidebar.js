// Sidebar.js
import React, { useState } from 'react';
import { 
  RxDashboard,
  RxBarChart,
  RxQuestionMarkCircled,
  RxGear,
  RxStack,
} from "react-icons/rx";
import { MdOutlineHub, MdOutlinePayment } from "react-icons/md";
import { GrGallery } from "react-icons/gr";
import { AiOutlineShop } from "react-icons/ai";
import { VscOrganization } from "react-icons/vsc";
import { IoClose} from "react-icons/io5";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { ROLES } from '../../Utilities/Roles';

// import configs
import { getSidebarMenuItems as getSuperAdminMenu } from '../../Routes/SuperAdmin/SuperAdminRoutesConfig';
import { getSidebarMenuItems as getStateAdminMenu } from '../../Routes/StateAdmin/StateAdminRoutesConfig';
import { getSidebarMenuItems as getSellerMenu } from '../../Routes/Seller/SellerRoutesConfig';

function Sidebar({ isCollapsed, isMobile, onClose }) {
    const [isHovered, setIsHovered] = useState(false);
    const [openSubmenus, setOpenSubmenus] = useState({});
    const role = useAuth();

    // ساختار منوها با استفاده از configها
    const menuItems = {
        [ROLES.SUPERADMIN.name]: getSuperAdminMenu(),
        [ROLES.STATEADMIN.name]: getStateAdminMenu(),
        [ROLES.SELLER.name]: getSellerMenu()
    };

    const currentMenu = menuItems[role.name] || [];
    
    // در موبایل همیشه expanded است
    const isExpanded = isMobile ? true : (!isCollapsed || isHovered);
    
    // تعیین عرض بر اساس وضعیت
    const sidebarWidth = isExpanded ? 'w-64' : 'w-20';

    // سایز فونت‌ها و آیکون‌ها بر اساس وضعیت
    const logoTextSize = isExpanded ? 'text-xl md:text-2xl' : 'text-2xl';
    const iconSize = isExpanded ? 'text-2xl md:text-3xl' : 'text-2xl md:text-3xl';
    const menuTextSize = isExpanded ? 'text-sm md:text-base' : 'text-base';
    const submenuTextSize = 'text-xs md:text-sm';
    const userNameSize = isExpanded ? 'text-base md:text-lg' : 'text-lg';
    const userBadgeSize = 'text-xs';

    // تابع toggle زیرمنو
    const toggleSubmenu = (e, menuLabel) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isExpanded) return; // اگر سایدبار بسته است، زیرمنو باز نشود
        
        setOpenSubmenus(prev => ({
            ...prev,
            [menuLabel]: !prev[menuLabel]
        }));
    };

    // بررسی باز بودن زیرمنو
    const isSubmenuOpen = (menuLabel) => {
        return openSubmenus[menuLabel] || false;
    };

    return (
        <div 
            className={`
                h-full flex flex-col transition-all duration-300 ease-in-out
                ${!isMobile && sidebarWidth}
                ${isMobile ? 'w-full' : ''}
                bg-white text-gray-800 relative
            `}
            onMouseEnter={() => !isMobile && setIsHovered(true)}
            onMouseLeave={() => !isMobile && setIsHovered(false)}
        >
            {/* دکمه بستن برای موبایل */}
            {isMobile && (
                <button 
                    onClick={onClose}
                    className="absolute left-2 top-2 p-2 hover:bg-gray-100 rounded-lg transition-colors z-10"
                >
                    <IoClose className="text-2xl text-gray-700" />
                </button>
            )}

            {/* لوگو و نام برند */}
            <div className={`
                p-3 md:p-4 mb-2 md:mb-4 flex items-center
                ${isExpanded ? 'justify-start gap-2 md:gap-3' : 'justify-center'}
            `}>
                <VscOrganization className={`${iconSize} text-gray-700 flex-shrink-0`} />
                {isExpanded && (
                    <span className={`${logoTextSize} font-bold whitespace-nowrap`}>
                        فروشگاه بهزیستی
                    </span>
                )}
            </div>

            {/* پروفایل کاربر */}
            <div className={`
                p-3 md:p-4 flex flex-col items-center
                ${isExpanded ? 'gap-1 md:gap-2' : 'gap-1'}
            `}>
                <img 
                    src="https://i.pravatar.cc/100" 
                    alt="user profile" 
                    className={`
                        border-2 border-gray-200 transition-all duration-300
                        ${isExpanded ? 'w-16 h-16 md:w-20 md:h-20 rounded-xl' : 'w-10 h-10 rounded-full'}
                        flex-shrink-0
                    `}
                />
                {isExpanded && (
                    <>
                        <span className={`${userNameSize} font-bold text-center`}>
                            نام کاربری
                        </span>
                        <span className={`${userBadgeSize} text-center text-gray-500`}>
                            {role.badge}
                        </span>
                    </>
                )}
            </div>

            {/* منوی ناوبری */}
            <nav className="flex-1 overflow-y-auto py-2 md:py-4">
                <ul className="flex flex-col gap-0.5 md:gap-1 px-2">
                    {currentMenu.map(item => (
                        <li key={item.path} className="relative">
                            {/* آیتم اصلی منو */}
                            <div className="relative">
                                <NavLink 
                                    to={item.path}
                                    onClick={isMobile ? onClose : undefined}
                                    className={({ isActive }) => 
                                        `flex items-center px-2 md:px-3 py-2 md:py-2.5 rounded-lg transition-all duration-200
                                        ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}
                                        ${!isExpanded ? 'justify-center' : 'justify-between'}`
                                    }
                                    title={!isExpanded ? item.label : ''}
                                >
                                    <div className={`flex items-center ${isExpanded ? 'gap-2 md:gap-3' : ''}`}>
                                        <span className={`${iconSize} flex-shrink-0`}>
                                            {item.icon}
                                        </span>
                                        {isExpanded && (
                                            <span className={`${menuTextSize} font-medium whitespace-nowrap`}>
                                                {item.label}
                                            </span>
                                        )}
                                    </div>
                                    
                                    {/* آیکون + و - برای زیرمنوها - فقط وقتی زیرمنو وجود داشته باشه */}
                                    {isExpanded && item.submenu && item.submenu.length > 0 && (
                                        <button
                                            onClick={(e) => toggleSubmenu(e, item.label)}
                                            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                                        >
                                            {isSubmenuOpen(item.label) ? (
                                                <IoIosArrowUp className="text-lg" />
                                            ) : (
                                                <IoIosArrowDown className="text-lg" />
                                            )}
                                        </button>
                                    )}
                                </NavLink>
                            </div>

                            {/* زیرمنوها - فقط وقتی زیرمنو وجود داشته باشه و باز باشه */}
                            {isExpanded && item.submenu && item.submenu.length > 0 && isSubmenuOpen(item.label) && (
                                <ul className="mr-6 md:mr-8 mt-1 space-y-0.5">
                                    {item.submenu.map(subItem => (
                                        <li key={subItem.path}>
                                            <NavLink
                                                to={subItem.path}
                                                onClick={isMobile ? onClose : undefined}
                                                className={({ isActive }) =>
                                                    `block px-3 md:px-4 py-1.5 md:py-2 rounded-lg transition-all duration-200 text-sm
                                                    ${isActive 
                                                        ? 'bg-blue-100 text-blue-700 font-medium' 
                                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                    }`
                                                }
                                            >
                                                <span className={`${submenuTextSize} whitespace-nowrap`}>
                                                    {subItem.label}
                                                </span>
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;