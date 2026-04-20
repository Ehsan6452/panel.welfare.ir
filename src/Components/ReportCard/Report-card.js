import { useEffect, useState } from "react";
import Tabs from "../../Elements/Tab/Tab";
import './style.css'

function ReportCard({ tabs = [], values = [] , info = ''}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (values.length > 0) {
      setValue(values[activeIndex]);
    }
  }, [values]);

  const handleTabChange = (index) => {
    setActiveIndex(index);
    setValue(values[index]);
  };

  return (
    <section
      className="report-card
        flex flex-col justify-between items-center
        min-w-full h-full
         rounded-xl
        p-4
      "
    >
      {info && (
        <div className="info-hint-wrapper">
          <div className="info-hint-icon">!</div>
          <div className="info-hint-tooltip">{info}</div>
        </div>
      )}

      <Tabs tabs={tabs} onTabChange={handleTabChange} />

      <div className="flex-1 w-full flex justify-center items-center">
        <span className="value-display efont-bold transition-all duration-300">
          {value}
        </span>
      </div>
    </section>
  );
}

export default ReportCard;
