import React from "react";

const Spinner = ({ size = "md", text = "" }) => {
  const sizeClasses = {
    sm: "h-6 w-6 border-2",
    md: "h-10 w-10 border-3",
    lg: "h-14 w-14 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] bg-transparent">
      <div
        className={`animate-spin rounded-full border-t-transparent border-blue-500 ${sizeClasses[size]} border-solid`}
      ></div>
      {text && <p className="mt-3 text-sm text-gray-400 font-medium">{text}</p>}
    </div>
  );
};

export const OverlaySpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
    <div className="h-12 w-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
  </div>
);

export default Spinner;
