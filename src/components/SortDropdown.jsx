import { useState } from "react";
import "../styles/category-dropdown.css";

const SortDropdown = ({ setSorting }) => {
  // a value of true means order=desc
  const [sortOptions, setSortOptions] = useState({
    Title: true,
    Votes: true,
    Date: true,
  });

  const handleClick = (option) => {
    const orderValue = sortOptions[option];

    const newSortOptions = { ...sortOptions };
    newSortOptions[option] = !sortOptions[option];
    setSortOptions(newSortOptions);

    let sortOption = option.toLowerCase();

    if (sortOption === "date") {
      sortOption = "created_at";
    }

    setSorting([sortOption, orderValue]);
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
