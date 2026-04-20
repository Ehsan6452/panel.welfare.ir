import React, { useState } from "react"; 
import Tabs from "../../Elements/Tab/Tab";
import Table from "../../Elements/Table/Table";
import './style.css'

function QuickView({tabs=[], values, onRowClick}) {

  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabChange = (index) => {
    setActiveIndex(index);
  };
  const ActiveData = values[activeIndex];

  const handleClick = (index) =>{
    // console.log(`${tabs[activeIndex]},${index}`);
    onRowClick(index , tabs[activeIndex]);
  }


  return (
    <div className="quick-view rounded-xl p-4">
      <div className="quick-view-tabs w-full">
        <Tabs tabs={tabs} onTabChange={handleTabChange} />
      </div>

      <div className="flex-1 w-full flex flex-col">
        <Table titles={ActiveData.titles} data={ActiveData.data} onRowClick={handleClick}/>
      </div>
    </div>
  );
}

export default QuickView;
