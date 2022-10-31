import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";

const CategoryPage = () => {
  const { category } = useParams();
  const { description } = useLocation().state;

  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://ncgamesapp.herokuapp.com/api/reviews/?category=${category}`)
      .then((res) => {
        return res.json();
      })
      .then(({ reviews }) => {
        setReviews(reviews);
        setIsLoading(false);
      });
  }, [category]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="frontpage">
      <h2>{category.split("-").join(" ")}</h2>
      <p>{description}</p>
      {reviews.map((review) => {
        return <ReviewCard review={review} key={review.review_id} />;
      })}
    </div>
  );
};

export default CategoryPage;
