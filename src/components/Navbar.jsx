import CategoryDropdown from "./CategoryDropdown";

const Navbar = () => {
  return (
    <div className="navbar">
      <ul>
        <li>Home</li>
        <li>
          <CategoryDropdown />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
