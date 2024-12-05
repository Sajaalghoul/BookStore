import React from "react";
import "./NavBar.css";
import SearchBox from "../SearchBox/SearchBox";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../Contexts/ThemeProvider";
const NavBar = (props) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  console.log("theme", theme);

  return (
    <nav className={`header__nav ${theme === "dark" ? "dark" : "light"}`}>
      <span className="nav__logo">BooksLibrary</span>
      <ul className="nav__links">
        <Link className="links__item" to="/">
          Home
        </Link>
        <Link className="links__item" to="favourites">
          favourites
        </Link>
      </ul>
      <SearchBox
        handleSearch={props.handleSearch}
        SearchField={props.SearchField}
      ></SearchBox>
      <button onClick={toggleTheme}>theme change</button>
    </nav>
  );
};

export default NavBar;
