import { useContext, useState } from "react";
import ActiveUserContext from "../contexts/ActiveUser";
import "../styles/comment-card.css";
import ErrorComponent from "./ErrorComponent";

const PostComment = (props) => {
  const review_id = props.review_id;
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);
  const { activeUser } = useContext(ActiveUserContext);

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const currDate = yyyy + "-" + mm + "-" + dd;

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handlePost = () => {
    fetch(
      `https://ncgamesapp.herokuapp.com/api/reviews/${review_id}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: activeUser.username, body: comment }),
      }
    )
      .then((res) => {
        if (res.ok) {
          setError(null);
        } else {
          throw Error(`${res.status}: ${res.statusText}`);
        }
      })
      .catch((err) => {
        setError(err);
        return <ErrorComponent error={err} />;
      });
  };

  return (
    <div className="comment-body">
      <div className="comment-title">
        <h2 className="comment-author">Post a Comment:</h2>
      </div>
      <div className="comment-title">
        <h3 className="comment-author">{activeUser.username}</h3>
      </div>
      <form>
        <label htmlFor="comment"></label>
        <input
          htmlFor="comment"
          id="comment"
          placeholder="review this review"
          onChange={handleChange}
          className="comment-content"
        ></input>
      </form>
      <div className="comment-footer">
        <ul>
          <li className="comment-published-date">{currDate}</li>
          <li className="comments">
            <button onClick={handlePost}>{error ? "Try Again" : "Post"}</button>
            <>
              {error ? (
                <ErrorComponent error={error} className="error" />
              ) : (
                <></>
              )}
            </>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PostComment;
