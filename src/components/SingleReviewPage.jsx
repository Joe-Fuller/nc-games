import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleReviewCard from "./SingleReviewCard";
import CommentCard from "./CommentCard";

const SingleReviewPage = () => {
  const { review_id } = useParams();
  const [review, setReview] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://ncgamesapp.herokuapp.com/api/reviews/${review_id}`)
      .then((res) => {
        return res.json();
      })
      .then(({ review }) => {
        setReview(review);
      })
      .then(
        fetch(
          `https://ncgamesapp.herokuapp.com/api/reviews/${review_id}/comments`
        )
          .then((res) => {
            return res.json();
          })
          .then(({ comments }) => {
            setComments(comments);
            setIsLoading(false);
          })
      );
  }, [review_id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="frontpage">
      <SingleReviewCard review={review} />
      {comments.map((comment) => {
        return <CommentCard comment={comment} key={comment.comment_id} />;
      })}
    </div>
  );
};

export default SingleReviewPage;
