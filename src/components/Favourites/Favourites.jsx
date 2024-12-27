import React from "react";
import { useContext } from "react";
import { FavouritesContext } from "../../Contexts/FavouriteReducerProvider.jsx";
import { useBooks } from "../../Contexts/BooksProvider";
import BooksList from "../BooksLsit/BooksList.jsx";
const Favourites = () => {
  const { favourites } = useContext(FavouritesContext);
  const {handleBooks}=useBooks();
  handleBooks(favourites);
  return (
    <div
      style={{ paddingTop: "9rem" }}
    >
      {<BooksList />}
    </div>
  );
};

export default Favourites;
