import { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import SortingContext from "../contexts/Sorting";
import "../styles/category-dropdown.css";

const SortDropdown = () => {
  // a value of true means order=desc
  const { setSorting } = useContext(SortingContext);
  const [sortOptions, setSortOptions] = useState({});

  const path = useLocation().pathname;
  if (path.includes("reviews")) {
    if (sortOptions.hasOwnProperty("Title")) {
      setSortOptions({ Votes: true, Date: true, User: true });
    }
  } else {
    if (!sortOptions.hasOwnProperty("Title")) {
      setSortOptions({ Title: true, Votes: true, Date: true, User: true });
    }
  }

  const handleClick = (option) => {
    const orderValue = sortOptions[option];

    const newSortOptions = { ...sortOptions };
    newSortOptions[option] = !sortOptions[option];
    let sortOption = option.toLowerCase();

    if (sortOption === "date") {
      sortOption = "created_at";
    }

    setSorting([sortOption, orderValue]);
    setSortOptions(newSortOptions);
  };

  return (
    <div className="dropdown">
      <button className="dropbtn">Sort</button>
      <div className="dropdown-content">
        <div className="dropdown-content">
          {Object.keys(sortOptions).map((option) => {
            return (
              <div key={option}>
                <p
                  onClick={() => {
                    handleClick(option);
                  }}
                >
                  {option}
                </p>
                <section className="sort-arrow">
                  {sortOptions[option] ? "▼" : "▲"}
                </section>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SortDropdown;
