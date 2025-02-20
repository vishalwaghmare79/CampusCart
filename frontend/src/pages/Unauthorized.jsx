import React from "react";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
    <div className="text-6xl font-bold text-red-500 mb-4">🚫</div>
    <div className="text-2xl font-semibold text-gray-700 mb-2">
      Unauthorized Access
    </div>
    <p className="text-gray-500 text-center mb-8">
      You do not have permission to view this page.
    </p>
    </div>
  );
};

export default Unauthorized;