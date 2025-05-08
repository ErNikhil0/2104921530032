// Feed.jsx
import { useEffect, useState } from 'react';
import { useFetchUsers } from '../hooks/useFetchUsers';
import { useFetchPosts } from '../hooks/useFetchPosts';
import { PostCard } from '../components/PostCard';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const Feed = () => {
  const { users } = useFetchUsers();
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!users || Object.keys(users).length === 0) return;

    const fetchAllPosts = async () => {
      setLoading(true);
      try {
        let posts = [];
        
        // Fetch all posts from all users
        for (const userId of Object.keys(users)) {
          const { posts: userPosts } = await fetchUserPosts(userId);
          posts = [...posts, ...userPosts.map(post => ({ ...post, userName: users[userId] }))];
        }
        
        // Sort by ID (assuming higher IDs are newer)
        posts.sort((a, b) => b.id - a.id);
        setAllPosts(posts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPosts();

    // Set up polling for new posts every 30 seconds
    const intervalId = setInterval(fetchAllPosts, 30000);
    return () => clearInterval(intervalId);
  }, [users]);

  if (loading && allPosts.length === 0) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Latest Posts</h1>
      
      <div className="max-w-2xl mx-auto space-y-6">
        {allPosts.length > 0 ? (
          allPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <p className="text-gray-500 text-center py-10">No posts found</p>
        )}
      </div>
      
      {loading && allPosts.length > 0 && (
        <div className="flex justify-center my-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      )}
    </div>
  );
};