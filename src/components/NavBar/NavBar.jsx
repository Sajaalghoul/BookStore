import React from "react";
import "./NavBar.css";
import SearchBox from "../SearchBox/SearchBox";
import { Link } from "react-router-dom";
const NavBar = (props) => {
  return (
    <nav className="header__nav">
      <span className="nav__logo">BooksLibrary</span>
      <ul className="nav__links">
        <Link className="links__item" to="/">Home</Link>
        <Link className="links__item" to="favourites">favourites</Link>
      </ul>
      <SearchBox handleSearch={props.handleSearch} SearchField={props.SearchField}></SearchBox>
    </nav>
  );
};

export default NavBar;
