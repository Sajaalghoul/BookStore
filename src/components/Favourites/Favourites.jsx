import React from "react";
import { useContext } from "react";
import { FavouritesContext } from "../../Contexts/FavouriteReducerProvider.jsx";
import BooksList from "../BooksLsit/BooksList.jsx";
const Favourites = () => {
  const { favourites } = useContext(FavouritesContext);
  return (
    <div
      style={{ paddingTop: "9rem" }}
    >
      {<BooksList booksData={favourites}/>}
    </div>
  );
};

export default Favourites;
