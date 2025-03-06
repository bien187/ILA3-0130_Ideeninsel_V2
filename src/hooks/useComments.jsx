import { useState, useEffect } from 'react';
import { loadComments } from '../services/commentService';

const useComments = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    loadComments().then(setComments);
  }, []);

  return comments;
};

export default useComments;
