import React, { useState } from "react";
// import "./style.css";

function Tabs({ tabs = [], onTabChange }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabClick = (index) => {
    setActiveIndex(index);
    // 🔄 به محض تغییر تب، اکشن مورد نظر در parent فعال می‌شود
    if (typeof onTabChange === "function") {
      onTabChange(index);
    }
  };

  return (
    <div className="w-full flex justify-center tabs">
      <ul className="w-full flex flex-row justify-evenly py-[7px]">
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex;

          return (
            <li
              key={index}
              onClick={() => handleTabClick(index)}
              className={`
                cursor-pointer min-w-[20%] text-center py-[6px]
                rounded-md transition-all duration-300
                ${
                  isActive
                    ? "bg-blue-500 text-white scale-105 shadow-md"
                    : "hover:bg-gray-700 hover:text-white"
                }
              `}
            >
              {tab}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Tabs;
