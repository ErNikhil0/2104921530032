import React from 'react';
import PropTypes from 'prop-types';

export const Comment = ({ comment }) => {
    const randomImageId = Math.floor(Math.random() * 100) + 1;
    
    return (
      <div className="bg-gray-50 p-3 rounded-lg">
        <div className="flex items-center mb-2">
          <img 
            src={`https://randomuser.me/api/portraits/${comment.id % 2 === 0 ? 'women' : 'men'}/${randomImageId}.jpg`} 
            alt="Commenter" 
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className="text-sm font-medium text-gray-700">Anonymous User</span>
        </div>
        <p className="text-gray-600">{comment.content}</p>
      </div>
    );
  };