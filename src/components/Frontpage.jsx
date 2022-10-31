import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";

const Frontpage = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://ncgamesapp.herokuapp.com/api/reviews")
      .then((res) => {
        return res.json();
      })
      .then(({ reviews }) => {
        setReviews(reviews);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (reviews.length === 0) {
    return <div>No reviews found</div>;
  }

  return (
    <div className="frontpage">
      {reviews.map((review) => {
        return <ReviewCard review={review} key={review.review_id} />;
      })}
    </div>
  );
};

export default Frontpage;
