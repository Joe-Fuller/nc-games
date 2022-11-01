const SingleReviewCard = ({ review }) => {
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
            {/* add user image here */}
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
          </ul>
        </footer>
        <p>votes: {review.votes}</p>
      </section>
    </main>
  );
};

export default SingleReviewCard;
