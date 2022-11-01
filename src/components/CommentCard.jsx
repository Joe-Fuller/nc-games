import Votes from "./Votes";
import "../styles/comment-card.css";

const CommentCard = (props) => {
  const comment = props.comment;
  return (
    <div className={props.new ? "comment-body new" : "comment-body"}>
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
          <li>
            <Votes votes={comment.votes} comment_id={comment.comment_id} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CommentCard;
