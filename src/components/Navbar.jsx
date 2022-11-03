import { Link } from "react-router-dom";
import CategoryDropdown from "./CategoryDropdown";
import SortDropdown from "./SortDropdown";
import "../styles/navbar.css";

const Navbar = ({ setSorting, needsSortDropdown }) => {
  return (
    <div className="navbar">
      <ul>
        <li></li>
        <Link to="/">
          <li className="navbar-button" onClick={setSorting(null)}>
            Home
          </li>
        </Link>
        <li>
          <CategoryDropdown />
        </li>
        {needsSortDropdown ? (
          <li>
            <SortDropdown setSorting={setSorting} />
          </li>
        ) : (
          <></>
        )}
        <li> </li>
      </ul>
    </div>
  );
};

export default Navbar;
