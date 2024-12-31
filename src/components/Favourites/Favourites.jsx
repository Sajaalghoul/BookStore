import React, { useContext, useEffect } from "react";
import { FavouritesContext } from "../../Contexts/FavouriteReducerProvider.jsx";
import { useBooks } from "../../Contexts/BooksProvider";
import BooksList from "../BooksLsit/BooksList.jsx";
import { ThemeContext } from "../../Contexts/ThemeProvider.jsx";

const Favourites = () => {
  const { favourites } = useContext(FavouritesContext);
  const { handleBooks } = useBooks();
  const { theme } = useContext(ThemeContext);

  // Update books data when favourites change
  useEffect(() => {
    handleBooks(favourites);
  }, [favourites, handleBooks]);

  return (
    <div
      className={`w-full min-h-screen ${
        theme === "light" ? "bg-white text-black" : "bg-[rgb(17,24,39)] text-white"
      } flex items-center justify-center`}
      style={{ paddingTop: "9rem" }}
    >
      <div className="max-w-screen-xl w-full mx-auto">
        {favourites && favourites.length > 0 ? (
          <BooksList />
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-center text-lg font-medium">
              No favorite books found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;
