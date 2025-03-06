import React from 'react';
import './CommentVoteButtons.css';

const CommentVoteButtons = ({ 
  comment, 
  user, 
  onVote 
}) => {
  const handleVote = (voteType) => {
    if (user) {
      onVote(comment.id, voteType);
    }
  };

  return (
    <div className="vote-section">
      <button 
        onClick={() => handleVote('up')}
        className={`vote-button ${comment.votedUsers?.[user?.uid] === 'up' ? 'voted-up' : ''}`}
        aria-label="Upvote"
      >
        <span className="vote-icon">▲</span>
        <span className="vote-count">{comment.upvotes || 0}</span>
      </button>
      <button 
        onClick={() => handleVote('down')}
        className={`vote-button ${comment.votedUsers?.[user?.uid] === 'down' ? 'voted-down' : ''}`}
        aria-label="Downvote"
      >
        <span className="vote-icon">▼</span>
        <span className="vote-count">{comment.downvotes || 0}</span>
      </button>
    </div>
  );
};

export default CommentVoteButtons;
