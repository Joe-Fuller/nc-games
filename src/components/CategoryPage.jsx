import { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";

const CategoryPage = (props) => {
  const { category } = useParams();
  const [description, setDescription] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [, setSearchParams] = useSearchParams();
  const [fetchUrl, setFetchUrl] = useState(
    `https://ncgamesapp.herokuapp.com/api/reviews/?category=${category}`
  );
  const { sorting, setNeedsSortDropdown } = props;
  const [thisSorting, setThisSorting] = useState(["title", true]);

  setNeedsSortDropdown(true);

  const potentialDescription = useLocation().state;

  if (
    !description ||
    (potentialDescription && description !== potentialDescription)
  ) {
    setDescription(potentialDescription);
  }

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
      <p>{description.description}</p>
      {reviews.map((review) => {
        return <ReviewCard review={review} key={review.review_id} />;
      })}
    </div>
  );
};

export default CategoryPage;
