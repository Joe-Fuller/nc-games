import { Link } from "react-router-dom";
import CategoryDropdown from "./CategoryDropdown";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <ul>
        <Link to="/">
          <li className="navbar-button">Home</li>
        </Link>
        <li>
          <CategoryDropdown />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
