import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="text-9xl font-bold text-gray-800 mb-4">404</div>
      <div className="text-2xl font-semibold text-gray-700 mb-2">
        Oops! Page Not Found
      </div>
      <p className="text-gray-500 text-center mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;