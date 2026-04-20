import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../Context/AuthContext';
import { ThemeProvider } from '../Context/ThemeContext'; 
import { useDeviceType } from "../Hooks/useDeviceType";
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Content from './Content/Content';
import Login from '../Pages/Auth/Login';

function AppContent() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { isMobile, isTablet } = useDeviceType(); // ← اضافه شد: isTablet
  const isMobileOrTablet = isMobile || isTablet;  // ← جدید
  const { user } = useAuth();

  const toggleSidebar = () => {
    if (isMobileOrTablet) {                        // ← تغییر: isMobile → isMobileOrTablet
      setIsMobileSidebarOpen(!isMobileSidebarOpen);
    }
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  // بستن سایدبار هنگام رفتن به دسکتاپ
  useEffect(() => {
    if (!isMobileOrTablet && isMobileSidebarOpen) { // ← تغییر: !isMobile → !isMobileOrTablet
      setIsMobileSidebarOpen(false);
    }
  }, [isMobileOrTablet, isMobileSidebarOpen]);

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="flex min-h-screen bg-background-primary text-primary">

      {/* سایدبار برای موبایل و تبلت */}
      {isMobileOrTablet && (                        // ← تغییر: isMobile → isMobileOrTablet
        <>
          {isMobileSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
              onClick={closeMobileSidebar}
            />
          )}
          
          <aside 
            className={`
              fixed top-0 right-0 h-full w-64 bg-background-secondary z-50 transform transition-transform duration-300 ease-in-out
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

      {/* سایدبار برای دسکتاپ - همیشه باز */}
      {!isMobileOrTablet && (                       // ← تغییر: !isMobile → !isMobileOrTablet
        <aside className="sticky top-0 h-screen bg-background-secondary text-primary hidden md:block borde-l border-default">
          <Sidebar 
            isCollapsed={false}
            isMobile={false}
          />
        </aside>
      )}

      {/* محتوای اصلی */}
      <div className="flex-1 flex flex-col w-full">
        <header className="sticky top-0 z-30 shadow-md border-b border-default bg-background-primary">
          <Header 
            onMenuClick={toggleSidebar} 
            isSidebarCollapsed={false}
            isMobile={isMobileOrTablet}             // ← تغییر: isMobile → isMobileOrTablet
            isMobileSidebarOpen={isMobileSidebarOpen}
          />
        </header>

        <main className="flex flex-1 p-4 md:p-6 lg:p-8">
          <Content />
        </main>
      </div>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
