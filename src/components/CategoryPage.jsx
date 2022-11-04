import { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import ErrorComponent from "./ErrorComponent";

const CategoryPage = (props) => {
  const { category } = useParams();
  const [description, setDescription] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [, setSearchParams] = useSearchParams();
  const [fetchUrl, setFetchUrl] = useState(
    `https://ncgamesapp.herokuapp.com/api/reviews/?category=${category}`
  );
  const { sorting } = props;
  const [thisSorting, setThisSorting] = useState(["title", true]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (sorting) {
      setThisSorting(sorting);
    }
    setFetchUrl(
      `https://ncgamesapp.herokuapp.com/api/reviews/?category=${category}&sort_by=${
        thisSorting[0]
      }&order=${thisSorting[1] ? "desc" : "asc"}`
    );
  }, [thisSorting, sorting, setSearchParams, category]);

  useEffect(() => {
    setIsLoading(true);
    fetch(fetchUrl)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw Error(`${res.status}: ${res.statusText}`);
      })
      .then(({ reviews }) => {
        setReviews(reviews);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [fetchUrl, category]);

  const potentialDescription = useLocation().state;
  if (potentialDescription !== null) {
    if (
      !description ||
      (potentialDescription && description !== potentialDescription)
    ) {
      setDescription(potentialDescription);
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <ErrorComponent error={error} />;
  }

  return (
    <div className="frontpage">
      <h2>{category.split("-").join(" ")}</h2>
      <p>{description ? description.description : "description not found"}</p>
      {reviews.map((review) => {
        return <ReviewCard review={review} key={review.review_id} />;
      })}
    </div>
  );
};

export default CategoryPage;
