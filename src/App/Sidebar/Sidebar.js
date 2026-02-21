// Sidebar.js
import React, { useState, useEffect } from 'react';
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
    const { user } = useAuth();

    useEffect(() => {
        console.log('Sidebar - User:', user);
    }, [user]);

    const menuItems = {
        [ROLES.SUPERADMIN.name]: getSuperAdminMenu(),
        [ROLES.STATEADMIN.name]: getStateAdminMenu(),
        [ROLES.SELLER.name]: getSellerMenu()
    };

    useEffect(() => {
        console.log('Sidebar - SuperAdmin Menu:', getSuperAdminMenu());
        console.log('Sidebar - StateAdmin Menu:', getStateAdminMenu());
        console.log('Sidebar - Seller Menu:', getSellerMenu());
        console.log('Sidebar - All Menu Items:', menuItems);
    }, []);

    const currentMenu = user && menuItems[user.role] ? menuItems[user.role] : [];
    
    useEffect(() => {
        console.log('Sidebar - Current User Role:', user?.role);
        console.log('Sidebar - Current Menu:', currentMenu);
    }, [user, currentMenu]);

    const isExpanded = isMobile ? true : (!isCollapsed || isHovered);
    const sidebarWidth = isExpanded ? 'w-64' : 'w-20';

    const logoTextSize = isExpanded ? 'text-xl md:text-2xl' : 'text-2xl';
    const iconSize = isExpanded ? 'text-2xl md:text-3xl' : 'text-2xl md:text-3xl';
    const menuTextSize = isExpanded ? 'text-sm md:text-base' : 'text-base';
    const submenuTextSize = 'text-xs md:text-sm';
    const userNameSize = isExpanded ? 'text-base md:text-lg' : 'text-lg';
    const userBadgeSize = 'text-xs';

    const toggleSubmenu = (e, menuLabel) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isExpanded) return;
        
        setOpenSubmenus(prev => ({
            ...prev,
            [menuLabel]: !prev[menuLabel]
        }));
    };

    const isSubmenuOpen = (menuLabel) => {
        return openSubmenus[menuLabel] || false;
    };

    if (!user) {
        return null;
    }

    return (
        <div 
            className={`
                h-full flex flex-col transition-all duration-300 ease-in-out
                ${!isMobile && sidebarWidth}
                ${isMobile ? 'w-full' : ''}
                bg-background-secondary text-primary relative border-l border-default
            `}
            onMouseEnter={() => !isMobile && setIsHovered(true)}
            onMouseLeave={() => !isMobile && setIsHovered(false)}
        >
            {/* دکمه بستن برای موبایل */}
            {isMobile && (
                <button 
                    onClick={onClose}
                    className="absolute left-2 top-2 p-2 hover:bg-background-hover rounded-lg transition-colors z-10"
                >
                    <IoClose className="text-2xl text-primary" />
                </button>
            )}

            {/* لوگو و نام برند */}
            <div className={`
                p-3 md:p-4 mb-2 md:mb-4 flex items-center
                ${isExpanded ? 'justify-start gap-2 md:gap-3' : 'justify-center'}
            `}>
                <VscOrganization className={`${iconSize} text-primary flex-shrink-0`} />
                {isExpanded && (
                    <span className={`${logoTextSize} font-bold text-primary whitespace-nowrap`}>
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
                    src={`https://i.pravatar.cc/100?u=${user.id}`} 
                    alt={user.name} 
                    className={`
                        border-2 border-default transition-all duration-300
                        ${isExpanded ? 'w-16 h-16 md:w-20 md:h-20 rounded-xl' : 'w-10 h-10 rounded-full'}
                        flex-shrink-0
                    `}
                />
                {isExpanded && (
                    <>
                        <span className={`${userNameSize} font-bold text-primary text-center`}>
                            {user.name}
                        </span>
                        <span className={`${userBadgeSize} text-muted text-center`}>
                            {user.badge}
                        </span>
                    </>
                )}
            </div>

            {/* منوی ناوبری */}
            <nav className="flex-1 overflow-y-auto py-2 md:py-4">
                {currentMenu.length === 0 ? (
                    <div className="text-center text-muted py-4 px-2">
                        <p className="text-sm">منویی وجود ندارد</p>
                        <p className="text-xs mt-2 text-muted">نقش: {user?.role}</p>
                    </div>
                ) : (
                    <ul className="flex flex-col gap-0.5 md:gap-1 px-2">
                        {currentMenu.map((item, index) => (
                            <li key={item.path || index} className="relative group">
                                <div className="relative">
                                    <NavLink 
                                        to={item.path}
                                        onClick={isMobile ? onClose : undefined}
                                        className={({ isActive }) => 
                                            `flex items-center px-2 md:px-3 py-2 md:py-2.5 rounded-lg transition-all duration-200
                                            ${isActive 
                                                ? 'bg-primary-lighter text-active icon-active' 
                                                : 'text-primary icon-primary hover:bg-background-hover hover:text-active hover:icon-active'
                                            }
                                            ${!isExpanded ? 'justify-center' : 'justify-between'}`
                                        }
                                        title={!isExpanded ? item.label : ''}
                                    >
                                        <div className={`flex items-center ${isExpanded ? 'gap-2 md:gap-3' : ''}`}>
                                            <span className={`${iconSize} flex-shrink-0 transition-colors ${
                                                item.submenu && item.submenu.length > 0 ? 'icon-secondary' : ''
                                            }`}>
                                                {item.icon}
                                            </span>
                                            {isExpanded && (
                                                <span className={`${menuTextSize} font-medium whitespace-nowrap transition-colors`}>
                                                    {item.label}
                                                </span>
                                            )}
                                        </div>
                                        
                                        {isExpanded && item.submenu && item.submenu.length > 0 && (
                                            <button
                                                onClick={(e) => toggleSubmenu(e, item.label)}
                                                className="p-1 rounded-full transition-colors hover:bg-background-hover"
                                            >
                                                {isSubmenuOpen(item.label) ? (
                                                    <IoIosArrowUp className="text-lg text-secondary" />
                                                ) : (
                                                    <IoIosArrowDown className="text-lg text-secondary" />
                                                )}
                                            </button>
                                        )}
                                    </NavLink>
                                </div>

                                {isExpanded && item.submenu && item.submenu.length > 0 && isSubmenuOpen(item.label) && (
                                    <ul className="mr-6 md:mr-8 mt-1 space-y-0.5">
                                        {item.submenu.map((subItem, subIndex) => (
                                            <li key={subItem.path || subIndex}>
                                                <NavLink
                                                    to={subItem.path}
                                                    onClick={isMobile ? onClose : undefined}
                                                    className={({ isActive }) =>
                                                        `block px-3 md:px-4 py-1.5 md:py-2 rounded-lg transition-all duration-200 text-sm
                                                        ${isActive 
                                                            ? 'bg-primary-lighter text-active font-medium' 
                                                            : 'text-secondary hover:bg-background-hover hover:text-active'
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
                )}
            </nav>
        </div>
    );
}

export default Sidebar;