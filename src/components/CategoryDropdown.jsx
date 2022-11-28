import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/category-dropdown.css";

const CategoryDropdown = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://boardgamereviews.cyclic.app/api/categories")
      .then((res) => {
        return res.json();
      })
      .then(({ categories }) => {
        setCategories(categories);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="dropdown">
      <button className="dropbtn">Categories</button>
      <div className="dropdown-content">
        <div className="dropdown-content">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            categories.map((category) => {
              return (
                <Link
                  to={`/categories/${category.slug}`}
                  key={category.slug}
                  state={{ description: category.description }}
                >
                  <>{category.slug}</>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryDropdown;
