import { useContext, useState } from "react";
import ActiveUserContext from "../contexts/ActiveUser";
import Votes from "./Votes";
import ErrorComponent from "./ErrorComponent";
import "../styles/comment-card.css";

const CommentCard = (props) => {
  const comment = props.comment;
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [user, setUser] = useState(null);
  const { activeUser } = useContext(ActiveUserContext);

  const handleDelete = () => {
    setDeleting(true);
    setError(null);
    fetch(
      `https://ncgamesapp.herokuapp.com/api/comments/${comment.comment_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          setDeleting(false);
          setDeleted(true);
          setError(null);
        } else {
          throw Error("Error Deleting");
        }
      })
      .catch((err) => {
        setError(err);
        setDeleting(false);
      });
  };

  fetch(`https://ncgamesapp.herokuapp.com/api/user/${comment.author}`).then(
    (res) => {
      return re;
    }
  );

  if (deleted) {
    return;
  }

  return (
    <div className={props.new ? "comment-body new" : "comment-body"}>
      <div className="comment-title">
        <h3 className="comment-author">{comment.author}</h3>
      </div>
      <div>
        <img src={""} alt="user avatar" />
        <p className="comment-content">{comment.body}</p>
      </div>
      <div className="comment-footer">
        <ul>
          <li className="comment-published-date">
            {comment.created_at.slice(0, 10)}
          </li>
          <li className="comments">
            <>
              {error ? (
                <ErrorComponent error={error} className="delete-error" />
              ) : (
                <></>
              )}
            </>
          </li>
          {activeUser.username === comment.author ? (
            <li className="comments">
              <button onClick={handleDelete} disabled={deleting}>
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </li>
          ) : (
            <></>
          )}
          <li>
            <Votes votes={comment.votes} comment_id={comment.comment_id} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CommentCard;
