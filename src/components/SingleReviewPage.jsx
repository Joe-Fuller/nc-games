import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleReviewCard from "./SingleReviewCard";
import ErrorComponent from "./ErrorComponent";
import CommentCard from "./CommentCard";
import PostComment from "./PostComment";

const SingleReviewPage = (props) => {
  const { review_id } = useParams();
  const [review, setReview] = useState(null);
  const [comments, setComments] = useState([]);
  const [reviewIsLoading, setReviewIsLoading] = useState(true);
  const [commentIsLoading, setCommentIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setNeedsSortDropdown } = props;

  setNeedsSortDropdown(false);

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
          setComments(comments);
        } else {
          setComments([]);
        }
        setCommentIsLoading(false);
      });
  }, [review_id]);

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
