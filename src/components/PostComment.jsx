import { useContext, useState } from "react";
import ActiveUserContext from "../contexts/ActiveUser";
import "../styles/comment-card.css";

const PostComment = () => {
  const [comment, setComment] = useState("");
  const { activeUser } = useContext(ActiveUserContext);

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handlePost = () => {};

  return (
    <div className="comment-body">
      <div className="comment-title">
        <h2 className="comment-author">Post a Comment:</h2>
      </div>
      <div className="comment-title">
        <h3 className="comment-author">current user</h3>
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
          <li className="comment-published-date">current date</li>
          <li className="comments">
            <button onClick={handlePost}>Post</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PostComment;
