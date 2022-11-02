import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";

const Frontpage = ({ sorting }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [fetchUrl, setFetchUrl] = useState([
    "https://ncgamesapp.herokuapp.com/api/reviews",
  ]);

  useEffect(() => {
    if (sorting) {
      const orderBy = sorting[1] ? "desc" : "asc";
      setSearchParams({ sort_by: sorting[0], order: orderBy });
      setFetchUrl(
        `https://ncgamesapp.herokuapp.com/api/reviews/?sort_by=${sorting[0]}&order=${orderBy}`
      );
    }
  }, [sorting, setSearchParams]);

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
