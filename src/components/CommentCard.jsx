import "../styles/comment-card.css";

const CommentCard = ({ comment }) => {
  return (
    <div className="comment-body">
      <div className="comment-title">
        <h3 className="comment-author">{comment.author}</h3>
      </div>
      <div>
        <p className="comment-content">{comment.body}</p>
      </div>
      <div className="comment-footer">
        <ul>
          <li className="comment-published-date">
            {comment.created_at.slice(0, 10)}
          </li>
        </ul>
      </div>
      <p>votes: {comment.votes}</p>
    </div>
  );
};

export default CommentCard;
