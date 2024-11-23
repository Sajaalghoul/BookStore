import React from "react";
import BookCard from "../BookCard/BookCard";
import { useOutletContext } from "react-router-dom";
import "./BokList.css";

const BookList = () => {
  const { data,isLoading, error} = useOutletContext();
  // custome Api

  // iterate and create books cards
  const BooksList = data?.items?.map((book) => {
    const thumbnail =
      book.volumeInfo.imageLinks?.thumbnail ||
      book.volumeInfo.imageLinks?.smallThumbnail;
    return (
      thumbnail && (
        <BookCard
          key={book.id}
          title={book.volumeInfo.title}
          image={thumbnail}
          authors={book.volumeInfo.authors?.toString()}
          id={book.id}
        />
      )
    );
  });
  // dispaly them
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data) {
    return <div className="BooksList">{BooksList}</div>;
  }
};

export default BookList;
