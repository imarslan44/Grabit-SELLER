import React from 'react';

const StatCard = ({ title, value, icon, styles }) => {
  return (
    <div className={` p-6 rounded-sm shadow-lg ${styles}`}>
      <div className="flex items-center">
        <div className="bg-opacity-25 w-10 h-10 rounded-sm">
          {icon}
        </div>
        <div className="max-sm:ml-2 sm:ml-4 ">
          <p className="text-lg max-sm:text-sm font-semibold text-white">{title}</p>
          <p className="text-xl font-bold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
