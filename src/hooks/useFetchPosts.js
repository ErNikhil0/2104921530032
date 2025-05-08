// useFetchPosts.js
import { useEffect, useState } from 'react';
import { fetchUserPosts } from '../api/socialMediaApi';

export const useFetchPosts = (userId) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const getPosts = async () => {
      try {
        const data = await fetchUserPosts(userId);
        setPosts(data.posts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, [userId]);

  return { posts, loading, error };
};