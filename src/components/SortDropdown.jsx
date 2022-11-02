import "../styles/category-dropdown.css";

const SortDropdown = ({ setSorting }) => {
  const sortOptions = ["Title", "Votes", "Date"];

  const handleClick = (option) => {
    let sortOption = option.toLowerCase();

    if (sortOption === "date") {
      sortOption = "created_at";
    }

    setSorting(sortOption);
  };

  return (
    <div className="dropdown">
      <button className="dropbtn">Sort</button>
      <div className="dropdown-content">
        <div className="dropdown-content">
          {sortOptions.map((option) => {
            return (
              <p
                key={option}
                onClick={() => {
                  handleClick(option);
                }}
              >
                {option}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SortDropdown;
