import { useContext, useState } from "react";
import ActiveUserContext from "../contexts/ActiveUser";
import "../styles/comment-card.css";
import CommentCard from "./CommentCard";
import ErrorComponent from "./ErrorComponent";

const PostComment = (props) => {
  const review_id = props.review_id;
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);
  const [commentPosted, setCommentPosted] = useState(false);
  const [commentsPosted, setCommentsPosted] = useState([]);
  const [posting, setPosting] = useState(false);
  const { activeUser } = useContext(ActiveUserContext);

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const currDate = yyyy + "-" + mm + "-" + dd;

  const handleChange = (event) => {
    setComment(event.target.value);
    setPosting(false);
    setError(null);
  };

  const handlePost = (event) => {
    event.preventDefault();
    setPosting(true);
    setError(null);

    fetch(
      `https://ncgamesapp.herokuapp.com/api/reviews/${review_id}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: activeUser.username,
          body: comment,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          // throws a useful error message for the user rather than the dev
          throw Error(`Error Posting`);
        }
      })
      .then(({ comment }) => {
        setError(null);
        setCommentPosted(true);
        setCommentsPosted([comment, ...commentsPosted]);
        setComment("");
        setPosting(false);
      })
      .catch((err) => {
        setError(err);
        setPosting(false);
        return <ErrorComponent error={err} />;
      });
  };

  return (
    <div>
      <div className="comment-body">
        <div className="comment-title">
          <h2 className="comment-author">Post a Comment:</h2>
        </div>
        <div className="comment-title">
          <h3 className="comment-author">
            <img
              src={activeUser.avatar_url}
              alt="user avatar"
              className="userAvatar"
            />
            {activeUser.username}
          </h3>
        </div>
        <form onSubmit={handlePost}>
          <label htmlFor="comment"></label>
          <textarea
            htmlFor="comment"
            id="comment"
            rows={3}
            disabled={posting}
            placeholder="review this review"
            onChange={handleChange}
            value={comment}
            className="comment-content"
          ></textarea>
        </form>
        <div className="comment-footer">
          <ul>
            <li className="comment-published-date">{currDate}</li>
            <li className="comments">
              {error ? (
                <ErrorComponent error={error} className="posting-error" />
              ) : (
                <></>
              )}
              <button
                className="comment-button"
                onClick={handlePost}
                disabled={posting}
              >
                {error ? "Try Again" : posting ? "Posting" : "Post"}
              </button>
            </li>
          </ul>
        </div>
      </div>
      {commentPosted ? (
        commentsPosted.map((comment) => {
          return (
            <CommentCard
              comment={comment}
              key={comment.comment_id}
              new={true}
            />
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default PostComment;
