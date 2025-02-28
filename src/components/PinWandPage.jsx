import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { db } from '../firebase';
import { 
  collection, 
  query, 
  orderBy, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  getDoc, 
  addDoc, 
  serverTimestamp, 
  updateDoc, 
  increment, 
  deleteField
} from 'firebase/firestore';
import CommentVoteButtons from './CommentVoteButtons';
import './Background.css';
import './PinWandPage.css';
import jsPDF from 'jspdf';

const PinwandPage = () => {
  const user = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const commentsRef = collection(db, 'comments');
    const q = query(commentsRef, orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const loadedComments = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setComments(loadedComments);
      setLoading(false);
    }, (error) => {
      console.error('Realtime Comments Error:', error);
      setError(`Failed to load comments: ${error.message}`);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    try {
      const commentsRef = collection(db, 'comments');
      await addDoc(commentsRef, {
        text: newComment.trim(),
        timestamp: serverTimestamp(),
        userId: user.uid,
        username: user.displayName || 'Anonymous',
        upvotes: 0,
        downvotes: 0,
        votedUsers: {}
      });
      
      setNewComment('');
      setError('');
    } catch (err) {
      console.error('Comment Add Error:', err);
      setError(`Failed to add comment: ${err.message}`);
    }
  };

  const handleDelete = async (commentId, commentUserId) => {


    try {
      const commentRef = doc(db, 'comments', commentId);
      await deleteDoc(commentRef);
    } catch (err) {
      console.error('Comment Delete Error:', err);
      setError(`Failed to delete comment: ${err.message}`);
    }
  };

  const handleVote = async (commentId, voteType) => {


    try {
      const commentRef = doc(db, 'comments', commentId);
      const commentDoc = await getDoc(commentRef);
      const commentData = commentDoc.data();
      
      const votedUsers = commentData.votedUsers || {};
      
      let updateData;
      if (votedUsers[user.uid]) {
        if (votedUsers[user.uid] === voteType) {
          updateData = {
            [`${voteType}votes`]: increment(-1),
            [`votedUsers.${user.uid}`]: deleteField()
          };
        } else {
          const previousVote = votedUsers[user.uid];
          updateData = {
            [`${previousVote}votes`]: increment(-1),
            [`${voteType}votes`]: increment(1),
            [`votedUsers.${user.uid}`]: voteType
          };
        }
      } else {
        updateData = {
          [`${voteType}votes`]: increment(1),
          [`votedUsers.${user.uid}`]: voteType
        };
      }

      await updateDoc(commentRef, updateData);
      setError(null);
    } catch (err) {
      console.error('Vote Error:', err);
      setError(`Failed to vote: ${err.message}`);
    }
  };


  const formatCommentText = (text) => {
    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#%=~_|])/ig;
    return text.split(urlRegex).map((part, index) => {
      if (urlRegex.test(part)) {
        const urlWithoutProtocol = part.replace(/^(https?|ftp|file):\/\//i, '');
        return <a key={index} href={part} target="_blank" rel="noopener noreferrer">{urlWithoutProtocol}</a>;
      }
      return part;
    });
  };

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <>
      <div className="background-image"></div>
      <div className="pinwand-container">
        <h1 className="app-title">Ideeninsel V2</h1>
        {!user && <p className="login-prompt">Please log in to post ideas and to vote on posted ones</p>}
        {error && <div className="error-message">{error}</div>}
        {user && (
          <form onSubmit={handleSubmit} className="comment-form">
            <textarea
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="comment-input"
            />
            <button type="submit" className="comment-submit-btn">Post Comment</button>
          </form>
        )}

        <div className="comments-list">
          {comments.length === 0 ? (
            <p>No comments yet</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="comment-card">
                <div className="comment-content">
                  <p>{formatCommentText(comment.text)}</p>
                  <div className="comment-footer">
                    <span className="comment-metadata">
                      Posted by {comment.username} on{' '}
                      {comment.timestamp?.toDate ? comment.timestamp.toDate().toLocaleString() : 'Unknown date'}
                    </span>
                    
                    <div className="comment-actions">
                      {user && user.uid === comment.userId && (
                        <button 
                          onClick={() => handleDelete(comment.id, comment.userId)}
                          className="comment-delete-btn"
                        >
                          Delete
                        </button>
                      )}
                      
                      <CommentVoteButtons 
                        comment={comment} 
                        user={user} 
                        onVote={handleVote} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default PinwandPage;
