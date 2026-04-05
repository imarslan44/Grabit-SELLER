import React, { useState, useEffect } from 'react';

const Notification = ({ type, message, icon, duration = 2000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show immediately
    setVisible(true);

    // Hide after duration
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <div
      className={`
        p-3 bg-white text-gray-800 backdrop-blur-sm absolute 
        left-1/2 -translate-x-1/2 rounded-md shadow-md z-100 
        transition-all duration-500 ease-in-out w-full max-w-sm
        ${visible ? 'translate-y-5 opacity-100' : '-translate-y-10 opacity-0'}
      `}
    >
      <h1 className="font-bold text-lg flex items-center gap-2">
        {icon} {type}
      </h1>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
