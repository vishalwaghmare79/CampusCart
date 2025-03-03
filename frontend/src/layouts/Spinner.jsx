import React, { useState, useEffect } from "react";

const Spinner = () => {
  const [showNote, setShowNote] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNote(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-semibold text-gray-700">Loading, please wait...</p>
      {showNote && (
        <p className="mt-2 text-sm text-gray-500 text-center px-4">
          This project is hosted on a free service, which may cause occasional delays.  
          If loading takes longer than usual, try refreshing the page.
        </p>
      )}
    </div>
  );
};

export default Spinner;