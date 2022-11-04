import { useState } from "react";
import ErrorComponent from "./ErrorComponent";
import "../styles/votes.css";

const Votes = (props) => {
  const review_id = props.review_id;
  const comment_id = props.comment_id;
  const [votes, setVotes] = useState(props.votes);
  const [votesGiven, setVotesGiven] = useState(0);
  const [error, setError] = useState(null);

  const handleClick = (incVote) => {
    if (votesGiven === 0) {
      setVotesGiven(incVote);
      setVotes(votes + incVote);
      updateVotes(incVote);
    } else if (votesGiven === 1) {
      if (incVote === 1) {
        setVotesGiven(0);
        setVotes(votes - 1);
        updateVotes(-1);
      } else if (incVote === -1) {
        setVotesGiven(-1);
        setVotes(votes - 2);
        updateVotes(-2);
      }
    } else if (votesGiven === -1) {
      if (incVote === 1) {
        setVotesGiven(1);
        setVotes(votes + 2);
        updateVotes(2);
      } else if (incVote === -1) {
        setVotesGiven(0);
        setVotes(votes + 1);
        updateVotes(1);
      }
    }
  };

  const updateVotes = (votesToAdd) => {
    if (review_id) {
      fetch(`https://ncgamesapp.herokuapp.com/api/reviews/${review_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inc_votes: votesToAdd }),
      })
        .then((res) => {
          if (!res.ok) {
            // throw Error(`${res.status}: ${res.statusText}`);
            throw Error("Error Voting");
          } else {
            setError(null);
          }
        })
        .catch((err) => {
          setError(err);
          setVotesGiven(0);
          setVotes(props.votes);
        });
    } else if (comment_id) {
      fetch(`https://ncgamesapp.herokuapp.com/api/comments/${comment_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inc_votes: votesToAdd }),
      })
        .then((res) => {
          if (!res.ok) {
            // throw Error(`${res.status}: ${res.statusText}`);
            throw Error("Error Voting");
          } else {
            setError(null);
          }
        })
        .catch((err) => {
          setError(err);
          setVotesGiven(0);
          setVotes(props.votes);
        });
    }
  };

  return (
    <div className="vote-widget">
      <button
        className="arrow up votebutton"
        style={votesGiven === 1 ? { color: "red" } : {}}
        onClick={() => handleClick(1)}
      >
        &uarr;
      </button>
      <p className="vote-count">{votes}</p>
      <button
        className="arrow down votebutton"
        style={votesGiven === -1 ? { color: "blue" } : {}}
        onClick={() => handleClick(-1)}
      >
        &darr;
      </button>
      <>{error ? <ErrorComponent error={error} className="error" /> : <></>}</>
    </div>
  );
};

export default Votes;
