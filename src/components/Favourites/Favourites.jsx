import React from "react";
import { useOutletContext } from "react-router-dom";
import BookCard from "../BookCard/BookCard.jsx";
const  Favourites= () => {
const {favourites} = useOutletContext();
  return (
    <div className="favouritesContainer">
      {favourites.map((book)=>{
      const thumbnail =
      book.volumeInfo.imageLinks?.thumbnail ||
      book.volumeInfo.imageLinks?.smallThumbnail;
        return( <BookCard
          key={book.id}
          title={book.volumeInfo.title}
          image={thumbnail}
          authors={book.volumeInfo.authors?.toString()}
          id={book.id}
          />
   )
   }
   )
   }
    </div>
    )
};

export default Favourites;
