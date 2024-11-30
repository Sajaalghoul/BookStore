import React from "react";
import './SearchBox.css'

const SearchBox = (props) => {
  return (

        <input className="Search" id="search" placeholder="Get your Books.." value={props.searchField} onChange={props.handleSearch} />
    
  );
};

export default SearchBox;
