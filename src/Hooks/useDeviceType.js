import { useState, useEffect } from "react";

function getDeviceType(width) {
  if (width < 768) return "mobile";       // ← موبایل: کمتر از 768px
  if (width < 1024) return "tablet";      // ← تبلت: 768px تا 1023px
  return "desktop";                       // ← دسکتاپ: 1024px به بالا
}

export function useDeviceType() {
  const [deviceType, setDeviceType] = useState(
    () => getDeviceType(window.innerWidth)
  );

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(getDeviceType(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    deviceType,
    isMobile: deviceType === "mobile",          // < 768px
    isTablet: deviceType === "tablet",          // 768px – 1023px  ← جدید
    isDesktop: deviceType === "desktop",        // >= 1024px
    isMobileOrTablet: deviceType !== "desktop", // ← جدید (برای استفاده در App.js)
  };
}
