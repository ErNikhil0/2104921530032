import { useState } from 'react';
import { Comment } from './Comment';

export const PostCard = ({ post, showCommentsInitially = false }) => {
  const [showComments, setShowComments] = useState(showCommentsInitially);
  const randomImageId = Math.floor(Math.random() * 1000) + 1;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <img 
        src={`https://picsum.photos/id/${randomImageId}/600/300`} 
        alt="Post" 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center mb-3">
          <img 
            src={`https://randomuser.me/api/portraits/${post.userid % 2 === 0 ? 'women' : 'men'}/${post.userid}.jpg`} 
            alt="User" 
            className="w-10 h-10 rounded-full mr-3"
          />
          <span className="font-semibold text-gray-800">User {post.userid}</span>
        </div>
        <p className="text-gray-700 mb-4">{post.content}</p>
        
        <div className="flex justify-between items-center">
          <button 
            onClick={() => setShowComments(!showComments)}
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            {showComments ? 'Hide Comments' : `Show Comments (${post.comments?.length || 0})`}
          </button>
          <span className="text-sm text-gray-500">
            {new Date().toLocaleDateString()}
          </span>
        </div>
        
        {showComments && (
          <div className="mt-4 space-y-3">
            {post.comments?.length > 0 ? (
              post.comments.map(comment => (
                <Comment key={comment.id} comment={comment} />
              ))
            ) : (
              <p className="text-gray-500 italic">No comments yet</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};