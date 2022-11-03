import { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";

const CategoryPage = (props) => {
  const { category } = useParams();
  const [description, setDescription] = useState(null);
  const { sorting, setNeedsSortDropdown } = props;

  setNeedsSortDropdown(true);

  const potentialDescription = useLocation().state;

  if (
    !description ||
    (potentialDescription && description !== potentialDescription)
  ) {
    setDescription(potentialDescription);
  }

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
  }, [fetchUrl, category]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="frontpage">
      <h2>{category.split("-").join(" ")}</h2>
      <p>{description.description}</p>
      {reviews.map((review) => {
        return <ReviewCard review={review} key={review.review_id} />;
      })}
    </div>
  );
};

export default CategoryPage;
