import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleReviewCard from "./SingleReviewCard";
import ErrorComponent from "./ErrorComponent";
// import CommentCard from "./CommentCard";

const SingleReviewPage = () => {
  const { review_id } = useParams();
  const [review, setReview] = useState(null);
  // const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://ncgamesapp.herokuapp.com/api/reviews/${review_id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw Error(`${res.status}: ${res.statusText}`);
      })
      .then(({ review }) => {
        setReview(review);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
    // .then(
    //   fetch(
    //     `https://ncgamesapp.herokuapp.com/api/reviews/${review_id}/comments`
    //   )
    //     .then((res) => {
    //       return res.json();
    //     })
    //     .then(({ comments }) => {
    //       if (comments) {
    //         setComments(comments);
    //       } else {
    //         setComments([]);
    //       }
    //       setIsLoading(false);
    //     })
    // );
  }, [review_id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <ErrorComponent error={error} />;
  }

  return (
    <div className="frontpage">
      <SingleReviewCard review={review} />
      {/* {comments.map((comment) => {
        return <CommentCard comment={comment} key={comment.comment_id} />;
      })} */}
    </div>
  );
};

export default SingleReviewPage;
