import { Link } from "react-router-dom";
import CategoryDropdown from "./CategoryDropdown";
import SortDropwdown from "./SortDropdown";
import "../styles/navbar.css";

const Navbar = ({ setSorting }) => {
  return (
    <div className="navbar">
      <ul>
        <Link to="/">
          <li className="navbar-button">Home</li>
        </Link>
        <li>
          <CategoryDropdown />
        </li>
        <li>
          <SortDropwdown setSorting={setSorting} />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
