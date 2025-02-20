import React from 'react';
import useAuth from '../hooks/useAuth';

const Profile = () => {
  const { auth } = useAuth();
  const user = auth.user;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Profile</h1>
        </div>

        <div className="p-6">
          <div className="flex flex-col items-center md:flex-row md:items-start space-y-6 md:space-y-0 md:space-x-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src="https://via.placeholder.com/150" 
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                {user.name}
              </h2>
              <p className="text-gray-600 mt-2">{user.email}</p>
              <p className="text-gray-600 mt-2">{user.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;