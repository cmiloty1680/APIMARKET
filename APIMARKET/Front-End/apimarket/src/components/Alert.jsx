import React, { useState, useEffect } from 'react';

export function Alert({ message, type = 'info' }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const baseClasses =
    "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg shadow-lg max-w-full sm:max-w-md z-50 transition-all duration-500 ease-in-out overflow-auto break-words";
  const typeClasses = {
    success: "bg-orange-100 border-l-4 border-orange-500 text-black-700",
    error: "bg-red-100 border-l-4 border-red-500 text-red-700",
    warning: "bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700",
    info: "bg-blue-100 border-l-4 border-blue-500 text-blue-700",
  };

  const alertType = Object.keys(typeClasses).includes(type) ? type : 'info';

  return (
    <div className={`${baseClasses} ${typeClasses[alertType]}`}>
      <p className="font-bold">
        {alertType.charAt(0).toUpperCase() + alertType.slice(1)}
      </p>
      <p>{message}</p>
    </div>
  );
}
