// TopUsers.jsx
import { useEffect, useState } from 'react';
import { useFetchUsers } from '../hooks/useFetchUsers';
import { useFetchPosts } from '../hooks/useFetchPosts';
import { useFetchComments } from '../hooks/useFetchComments';
import { UserCard } from '../components/UserCard';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const TopUsers = () => {
  const { users, loading: usersLoading, error: usersError } = useFetchUsers();
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!users || Object.keys(users).length === 0) return;

    const calculateTopUsers = async () => {
      setLoading(true);
      try {
        // Fetch posts and comments for all users
        const usersWithStats = await Promise.all(
          Object.entries(users).map(async ([userId, userName]) => {
            const { posts } = await fetchUserPosts(userId);
            
            // Fetch comments for each post
            const postsWithComments = await Promise.all(
              posts.map(async post => {
                const { comments } = await fetchPostComments(post.id);
                return { ...post, comments };
              })
            );
            
            // Calculate total comments for this user
            const totalComments = postsWithComments.reduce(
              (sum, post) => sum + (post.comments?.length || 0), 0
            );
            
            return {
              id: userId,
              name: userName,
              postCount: posts.length,
              commentCount: totalComments
            };
          })
        );
        
        // Sort by comment count and take top 5
        const sorted = [...usersWithStats].sort((a, b) => b.commentCount - a.commentCount).slice(0, 5);
        setTopUsers(sorted);
      } catch (error) {
        console.error('Error calculating top users:', error);
      } finally {
        setLoading(false);
      }
    };

    calculateTopUsers();
  }, [users]);

  if (usersLoading || loading) return <LoadingSpinner />;
  if (usersError) return <div className="text-red-500 text-center py-10">{usersError}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Top 5 Users by Engagement</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topUsers.map((user, index) => (
          <UserCard 
            key={user.id} 
            user={user} 
            commentCount={user.commentCount} 
            rank={index + 1} 
          />
        ))}
      </div>
    </div>
  );
};
