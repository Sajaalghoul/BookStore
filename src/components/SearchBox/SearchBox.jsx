import React from "react";
import './SearchBox.css'

const SearchBox = (props) => {
  return (
    <div className="searchContainer">
      <form onSubmit={props.setSearchField}>
        <input className="Search" id="search" placeholder="Get your Books.." />
        <button className="searchButton" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
