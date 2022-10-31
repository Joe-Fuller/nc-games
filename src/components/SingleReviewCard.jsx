const SingleReviewCard = ({ review }) => {
  return (
    <div className="blog-container">
      <div className="blog-header">
        <div
          style={{
            background: `url(${review.review_img_url}`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="blog-cover"
        >
          <div className="blog-author">
            {/* add user image here */}
            <h3>{review.owner}</h3>
          </div>
        </div>
      </div>
      <div className="blog-body">
        <div className="blog-title">
          <h1>{review.title}</h1>
        </div>
        <div className="single-review-body">
          <p>{review.review_body}</p>
        </div>
        <div className="blog-footer">
          <ul>
            <li className="published-date">{review.created_at.slice(0, 10)}</li>
          </ul>
        </div>
        <p>votes: {review.votes}</p>
      </div>
    </div>
  );
};

export default SingleReviewCard;
