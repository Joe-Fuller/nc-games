import { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";

const CategoryPage = ({ sorting }) => {
  const { category } = useParams();
  // const { description } = useLocation().state

  console.log(useLocation());

  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [, setSearchParams] = useSearchParams();
  const [fetchUrl, setFetchUrl] = useState(
    `https://ncgamesapp.herokuapp.com/api/reviews/?category=${category}`
  );

  useEffect(() => {
    if (sorting) {
      const orderBy = sorting[1] ? "desc" : "asc";
      setSearchParams({ sort_by: sorting[0], order: orderBy });
      setFetchUrl(
        `https://ncgamesapp.herokuapp.com/api/reviews/?category=${category}&sort_by=${sorting[0]}&order=${orderBy}`
      );
    }
  }, [sorting, setSearchParams, category]);

  useEffect(() => {
    setIsLoading(true);
    fetch(fetchUrl)
      .then((res) => {
        return res.json();
      })
      .then(({ reviews }) => {
        setReviews(reviews);
        setIsLoading(false);
      });
  }, [fetchUrl]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="frontpage">
      <h2>{category.split("-").join(" ")}</h2>
      <p>description</p>
      {reviews.map((review) => {
        return <ReviewCard review={review} key={review.review_id} />;
      })}
    </div>
  );
};

export default CategoryPage;
