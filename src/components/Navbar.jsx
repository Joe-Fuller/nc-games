import { Link } from "react-router-dom";
import CategoryDropdown from "./CategoryDropdown";
import SortDropdown from "./SortDropdown";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <ul>
        <li></li>
        <Link to="/">
          <li className="navbar-button">Home</li>
        </Link>
        <li>
          <CategoryDropdown />
        </li>
        <li>
          <SortDropdown />
        </li>
        <li> </li>
      </ul>
    </div>
  );
};

export default Navbar;
