import React from "react";
import { useOutletContext } from "react-router-dom";
import BookCard from "../BookCard/BookCard.jsx";
const  Favourites= () => {
const {favourites} = useOutletContext();
  return (
    <div className="flex gap-10 m-8 justify-center flex-wrap">
      {favourites.map((book)=>{
      const thumbnail =
      book.volumeInfo.imageLinks?.thumbnail ||
      book.volumeInfo.imageLinks?.smallThumbnail;
        return( <BookCard
          key={book.id}
          title={book.volumeInfo.title}
          image={thumbnail}
          categories={book.volumeInfo.categories?.toString()}
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
