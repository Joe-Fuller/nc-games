import "../styles/comment-card.css";

const PostComment = () => {
  return (
    <div className="comment-body">
      <div className="comment-title">
        <h3 className="comment-author">current user</h3>
      </div>
      <div>
        <p className="comment-content">input</p>
      </div>
      <div className="comment-footer">
        <ul>
          <li className="comment-published-date">current date</li>
        </ul>
      </div>
    </div>
  );
};

export default PostComment;
