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
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const { sorting } = useContext(SortingContext);

  useEffect(() => {
    if (sorting) {
      const orderBy = sorting[1] ? "desc" : "asc";
      if (sorting[0] === "user") {
        setSearchParams({ sort_by: "username", order: orderBy, page: page });
        setFetchUrl(
          `https://ncgamesapp.herokuapp.com/api/reviews/?sort_by=owner&order=${orderBy}&p=${page}`
        );
      } else {
        setSearchParams({ sort_by: sorting[0], order: orderBy, page: page });
        setFetchUrl(
          `https://ncgamesapp.herokuapp.com/api/reviews/?sort_by=${sorting[0]}&order=${orderBy}&p=${page}`
        );
      }
    }
  }, [sorting, setSearchParams, page]);

  useEffect(() => {
    let newUrl = "https://ncgamesapp.herokuapp.com/api/reviews/?";
    for (const searchParam of searchParams) {
      newUrl += searchParam[0];
      newUrl += "=";
      newUrl += searchParam[1];
      newUrl += "&";
    }
    newUrl += `p=${page}`;
    setFetchUrl(newUrl);
  }, [searchParams, page]);

  useEffect(() => {
    setIsLoading(true);
    fetch(fetchUrl)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        setReviews(response.reviews);
        setTotalCount(response.total_count);
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
      <button
        className="button back"
        onClick={() => {
          setPage((page) => page - 1);
        }}
        disabled={page === 1}
      >
        Back
      </button>
      <button
        className="button next"
        onClick={() => {
          setPage((page) => page + 1);
        }}
        disabled={10 * page >= totalCount}
      >
        Next
      </button>
    </div>
  );
};

export default Frontpage;
