import React from 'react';

const Header = ({ tabs = ['For you', 'Following'], selectedTab, onTabClick }) => {
  return (
    <header className="bg-base-800 text-white p-4 flex items-center justify-between border-b sm:border-x border-gray-600">
      {tabs.map((tab) => (
        <div
          key={tab}
          className={`w-[50%] text-center cursor-pointer border-gray-600 ${selectedTab === tab ? 'font-bold' : ''}`}
          onClick={() => onTabClick(tab)}
        >
          <p>{tab}</p>
        </div>
      ))}
    </header>
  );
};

export default Header;
