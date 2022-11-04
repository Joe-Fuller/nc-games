import { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import SingleReviewCard from "./SingleReviewCard";
import ErrorComponent from "./ErrorComponent";
import CommentCard from "./CommentCard";
import PostComment from "./PostComment";
import SortingContext from "../contexts/Sorting";

const SingleReviewPage = () => {
  const { review_id } = useParams();
  const [review, setReview] = useState(null);
  const [comments, setComments] = useState([]);
  const [reviewIsLoading, setReviewIsLoading] = useState(true);
  const [commentIsLoading, setCommentIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [thisSorting, setThisSorting] = useState(["date", true]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { sorting } = useContext(SortingContext);

  const SortComments = (comments, sort_by, order) => {
    if (sort_by === "date") {
      sort_by = "created_at";
    }
    if (sort_by === "user") {
      sort_by = "author";
    }

    setSearchParams({ sort_by: sort_by, order: order ? "desc" : "asc" });

    comments.sort((c1, c2) => {
      if (sort_by === "created_at") {
        return (
          (Date.parse(c1[sort_by]) - Date.parse(c2[sort_by])) * (order ? -1 : 1)
        );
      }
      return (c1[sort_by] - c2[sort_by]) * (order ? -1 : 1);
    });
    return comments;
  };

  useEffect(() => {
    if (sorting) {
      setThisSorting(sorting);
    }
  }, [thisSorting, sorting]);

  // useEffect(() => {
  //   for (const searchParam of searchParams) {
  //     console.log([searchParam[0], searchParam[0] === "desc"]);
  //     setThisSorting([searchParam[0], searchParam[0] === "desc"]);
  //   }
  // }, [searchParams]);

  useEffect(() => {
    setReviewIsLoading(true);
    fetch(`https://ncgamesapp.herokuapp.com/api/reviews/${review_id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw Error(`${res.status}: ${res.statusText}`);
      })
      .then(({ review }) => {
        setReview(review);
        setError(null);
        setReviewIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setReviewIsLoading(false);
      });
  }, [review_id]);

  useEffect(() => {
    setCommentIsLoading(true);
    fetch(`https://ncgamesapp.herokuapp.com/api/reviews/${review_id}/comments`)
      .then((res) => {
        return res.json();
      })
      .then(({ comments }) => {
        if (comments) {
          if (thisSorting) {
            comments = SortComments(comments, thisSorting[0], thisSorting[1]);
            setComments(comments);
          } else {
            setComments(comments);
          }
        } else {
          setComments([]);
        }
        setCommentIsLoading(false);
      });
  }, [review_id, thisSorting]);

  if (reviewIsLoading || commentIsLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <ErrorComponent error={error} />;
  }

  return (
    <div className="frontpage">
      <SingleReviewCard review={review} />
      <PostComment review_id={review.review_id} />
      {comments.map((comment) => {
        return <CommentCard comment={comment} key={comment.comment_id} />;
      })}
    </div>
  );
};

export default SingleReviewPage;
