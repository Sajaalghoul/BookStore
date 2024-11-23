import React from "react";
import "./NavBar.css";
import SearchBox from "../SearchBox/SearchBox";
import { Link } from "react-router-dom";
const NavBar = (props) => {
  return (
    <nav className="header__nav">
      <span className="nav__logo">BookStore</span>
      <ul className="nav__links">
        <Link className="links__item" to="/">Home</Link>
        <li className="links__item">Cart</li>
        <li className="links__item">WishList</li>
      </ul>
      <SearchBox setSearchField={props.setSearchField}></SearchBox>
    </nav>
  );
};

export default NavBar;
