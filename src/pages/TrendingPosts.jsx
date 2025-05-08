// TrendingPosts.jsx
import { useEffect, useState } from 'react';
import { useFetchUsers } from '../hooks/useFetchUsers';
import { useFetchPosts } from '../hooks/useFetchPosts';
import { useFetchComments } from '../hooks/useFetchComments';
import { PostCard } from '../components/PostCard';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const TrendingPosts = () => {
  const { users } = useFetchUsers();
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!users || Object.keys(users).length === 0) return;

    const findTrendingPosts = async () => {
      setLoading(true);
      try {
        let allPosts = [];
        
        // Fetch all posts from all users with their comments
        for (const [userId, userName] of Object.entries(users)) {
          const { posts } = await fetchUserPosts(userId);
          
          const postsWithComments = await Promise.all(
            posts.map(async post => {
              const { comments } = await fetchPostComments(post.id);
              return { ...post, userName, comments };
            })
          );
          
          allPosts = [...allPosts, ...postsWithComments];
        }
        
        // Find the maximum comment count
        const maxComments = Math.max(...allPosts.map(post => post.comments?.length || 0));
        
        // Filter posts with max comments
        const trending = allPosts.filter(post => (post.comments?.length || 0) === maxComments);
        setTrendingPosts(trending);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    findTrendingPosts();
  }, [users]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Trending Posts {trendingPosts.length > 1 && `(${trendingPosts.length} posts with most comments)`}
      </h1>
      
      <div className="max-w-2xl mx-auto space-y-6">
        {trendingPosts.length > 0 ? (
          trendingPosts.map(post => (
            <PostCard key={post.id} post={post} showCommentsInitially={true} />
          ))
        ) : (
          <p className="text-gray-500 text-center py-10">No trending posts found</p>
        )}
      </div>
    </div>
  );
};