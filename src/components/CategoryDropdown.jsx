import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/category-dropdown.css";

const CategoryDropdown = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://ncgamesapp.herokuapp.com/api/categories")
      .then((res) => {
        return res.json();
      })
      .then(({ categories }) => {
        setCategories(categories);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dropdown">
      <button className="dropbtn">Categories</button>
      <div className="dropdown-content">
        <ul className="dropdown-content">
          {categories.map((category) => {
            return (
              <Link
                to={`/categories/${category.slug}`}
                key={category.slug}
                state={{ description: category.description }}
              >
                <li>{category.slug}</li>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CategoryDropdown;
