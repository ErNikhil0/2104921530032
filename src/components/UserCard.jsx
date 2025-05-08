import React from 'react';
import PropTypes from 'prop-types';
export const UserCard = ({ user, commentCount, rank }) => {
    const randomImageId = Math.floor(Math.random() * 100) + 1;
    
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
        <div className="p-4 flex items-center space-x-4">
          <div className="relative">
            <img 
              src={`https://randomuser.me/api/portraits/${user.id % 2 === 0 ? 'women' : 'men'}/${randomImageId}.jpg`} 
              alt={user.name} 
              className="w-16 h-16 rounded-full border-2 border-indigo-500"
            />
            {rank && (
              <div className="absolute -top-2 -left-2 bg-yellow-400 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">
                {rank}
              </div>
            )}
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800">{user.name}</h3>
            <p className="text-gray-600">Posts: {user.postCount || 'N/A'}</p>
            <p className="text-indigo-600 font-semibold">Total Comments: {commentCount}</p>
          </div>
        </div>
      </div>
    );
  };