// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Content from './Content/Content';

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // تشخیص سایز صفحه
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // اگر از موبایل به دسکتاپ می‌آییم، سایدبار موبایل را ببندیم
      if (!mobile && isMobileSidebarOpen) {
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileSidebarOpen]);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileSidebarOpen(!isMobileSidebarOpen);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <BrowserRouter> 
      <div className="flex min-h-screen bg-gray-50 relative">
        {/* سایدبار برای موبایل - به صورت اوورلی */}
        {isMobile && (
          <>
            {/* اوورلی تیره */}
            {isMobileSidebarOpen && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
                onClick={closeMobileSidebar}
              />
            )}
            
            {/* سایدبار موبایل */}
            <aside 
              className={`
                fixed top-0 right-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out
                ${isMobileSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
              `}
            >
              <Sidebar 
                isCollapsed={false}
                isMobile={true}
                onClose={closeMobileSidebar}
              />
            </aside>
          </>
        )}

        {/* سایدبار برای دسکتاپ و تبلت */}
        {!isMobile && (
          <aside className="sticky top-0 h-screen bg-white text-gray-800 hidden md:block">
            <Sidebar 
              isCollapsed={isSidebarCollapsed}
              isMobile={false}
            />
          </aside>
        )}

        {/* محتوای اصلی */}
        <div className="flex-1 flex flex-col w-full">
          {/* هدر */}
          <header className="sticky top-0 z-30 shadow-md border-b border-gray-200">
            <Header 
              onMenuClick={toggleSidebar} 
              isSidebarCollapsed={isSidebarCollapsed}
              isMobile={isMobile}
              isMobileSidebarOpen={isMobileSidebarOpen}
            />
          </header>

          {/* محتوای صفحه */}
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            <Content />
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;