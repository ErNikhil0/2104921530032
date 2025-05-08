// useFetchComments.js
import { useEffect, useState } from 'react';
import { fetchPostComments } from '../api/socialMediaApi';

export const useFetchComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!postId) return;

    const getComments = async () => {
      try {
        const data = await fetchPostComments(postId);
        setComments(data.comments);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getComments();
  }, [postId]);

  return { comments, loading, error };
};