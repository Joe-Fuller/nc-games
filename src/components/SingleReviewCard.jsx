import { useState, useEffect } from "react";
import ErrorComponent from "./ErrorComponent";
import Votes from "./Votes";

const SingleReviewCard = (props) => {
  const review = props.review;
  const [reviewOwnerImg, setReviewOwnerImg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://ncgamesapp.herokuapp.com/api/users/${review.owner}`)
      .then((res) => {
        return res.json();
      })
      .then(({ user }) => {
        setReviewOwnerImg(user.avatar_url);
        setIsLoading(false);
      });
  }, [review.owner]);

  if (isLoading) return <div>Loading...</div>;

  if (!review) {
    return <ErrorComponent error={"error"} />;
  }

  return (
    <main className="blog-container">
      <section className="blog-header">
        <div
          style={{
            background: `url(${review.review_img_url}`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="blog-cover"
        >
          <div className="blog-author">
            <img
              src={reviewOwnerImg}
              alt="user avatar"
              className="userAvatar"
            ></img>
            <h3>{review.owner}</h3>
          </div>
        </div>
      </section>
      <section className="blog-body">
        <div className="blog-title">
          <h1>{review.title}</h1>
        </div>
        <article className="single-review-body">
          <p>{review.review_body}</p>
        </article>
        <footer className="blog-footer">
          <ul>
            <li className="published-date">{review.created_at.slice(0, 10)}</li>
            <li className="comments">
              <Votes votes={review.votes} review_id={review.review_id} />
            </li>
          </ul>
        </footer>
      </section>
    </main>
  );
};

export default SingleReviewCard;
