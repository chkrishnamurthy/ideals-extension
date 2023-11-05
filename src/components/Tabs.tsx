import React, { useState } from "react";
import Notes from "./Notes";
import Todo from "./Todo";
import DrawingApp from "./DrawingApp";

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0); // Initial active tab index

  const tabLabels = ["Notes", "Todos", "Drawing", "2048"];

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="w-full h-screen">
      <div className="relative right-0">
        <ul
          className="relative flex list-none flex-wrap rounded-lg bg-blue-gray-50 p-1"
          data-tabs="tabs"
          role="list"
        >
          {tabLabels.map((label, index) => (
            <li key={index} className="z-30 flex-auto text-center">
              <a
                className={`text-red-700 z-30 mb-0 flex w-full cursor-pointer items-center justify-center rounded-lg border-0 
                bg-inherit px-0 py-1 transition-all ease-in-out ${
                  activeTab === index
                    ? "text-blue-500 bg-white" // Apply active tab styles
                    : "bg-black"
                }`}
                data-tab-target=""
                role="tab"
                aria-selected={activeTab === index ? "true" : "false"}
                onClick={() => handleTabClick(index)}
              >
                <span className="ml-1">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        {/* Render content based on the active tab */}
        {activeTab === 0 && <Notes />}
        {activeTab === 1 && <Todo />}
        {/* {activeTab === 2 && <DrawingApp />} */}
        {activeTab === 3 && <div>2048 Game come here</div>}
        {activeTab === 4 && <div>Yet to decide</div>}
      </div>
    </div>
  );
};

export default Tabs;
