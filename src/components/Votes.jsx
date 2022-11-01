import { useState } from "react";
import "../styles/votes.css";

const Votes = (props) => {
  const [votes, setVotes] = useState(props.votes);
  const [votesGiven, setVotesGiven] = useState(0);

  const handleClick = (incVote) => {
    if (votesGiven === 0) {
      setVotesGiven(incVote);
      setVotes(votes + incVote);
    } else if (votesGiven === 1) {
      if (incVote === 1) {
        setVotesGiven(0);
        setVotes(votes - 1);
      } else if (incVote === -1) {
        setVotesGiven(-1);
        setVotes(votes - 2);
      }
    } else if (votesGiven === -1) {
      if (incVote === 1) {
        setVotesGiven(1);
        setVotes(votes + 2);
      } else if (incVote === -1) {
        setVotesGiven(0);
        setVotes(votes + 1);
      }
    }
  };

  return (
    <div className="vote-widget">
      <p
        className="arrow up"
        style={votesGiven === 1 ? { color: "red" } : {}}
        onClick={() => handleClick(1)}
      >
        &uarr;
      </p>
      <p className="vote-count">{votes}</p>
      <p
        className="arrow down"
        style={votesGiven === -1 ? { color: "blue" } : {}}
        onClick={() => handleClick(-1)}
      >
        &darr;
      </p>
    </div>
  );
};

export default Votes;
