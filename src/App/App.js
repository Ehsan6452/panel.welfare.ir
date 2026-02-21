import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../Context/AuthContext';
import { ThemeProvider } from '../Context/ThemeContext'; // اضافه کردن
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Content from './Content/Content';
import Login from '../Pages/Auth/Login';

function AppContent() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { user } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
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
      {/* سایدبار برای موبایل */}
      {isMobile && (
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

      {/* سایدبار برای دسکتاپ */}
      {!isMobile && (
        <aside className="sticky top-0 h-screen bg-background-secondary text-primary hidden md:block border-l border-default">
          <Sidebar 
            isCollapsed={isSidebarCollapsed}
            isMobile={false}
          />
        </aside>
      )}

      {/* محتوای اصلی */}
      <div className="flex-1 flex flex-col w-full">
        <header className="sticky top-0 z-30 shadow-md border-b border-default bg-background-primary">
          <Header 
            onMenuClick={toggleSidebar} 
            isSidebarCollapsed={isSidebarCollapsed}
            isMobile={isMobile}
            isMobileSidebarOpen={isMobileSidebarOpen}
          />
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8">
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