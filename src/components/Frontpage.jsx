import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import "../styles/frontpage.css";
import SortingContext from "../contexts/Sorting";

const Frontpage = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [fetchUrl, setFetchUrl] = useState(
    "https://ncgamesapp.herokuapp.com/api/reviews"
  );
  const { sorting } = useContext(SortingContext);

  useEffect(() => {
    if (sorting) {
      const orderBy = sorting[1] ? "desc" : "asc";
      if (sorting[0] === "user") {
        setSearchParams({ sort_by: "username", order: orderBy });
        setFetchUrl(
          `https://ncgamesapp.herokuapp.com/api/reviews/?sort_by=owner&order=${orderBy}&limit=100`
        );
      } else {
        setSearchParams({ sort_by: sorting[0], order: orderBy });
        setFetchUrl(
          `https://ncgamesapp.herokuapp.com/api/reviews/?sort_by=${sorting[0]}&order=${orderBy}&limit=100`
        );
      }
    }
  }, [sorting, setSearchParams]);

  useEffect(() => {
    let newUrl = "https://ncgamesapp.herokuapp.com/api/reviews/?limit=100&";
    for (const searchParam of searchParams) {
      newUrl += searchParam[0];
      newUrl += "=";
      newUrl += searchParam[1];
      newUrl += "&";
    }
    newUrl = newUrl.slice(0, -1);
    setFetchUrl(newUrl);
  }, [searchParams]);

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
