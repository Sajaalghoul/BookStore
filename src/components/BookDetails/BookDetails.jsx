import React from 'react'
import { useParams } from 'react-router-dom'
import UseFetch from '../../CustomeHooks/UseFetch'
import { useOutletContext } from "react-router-dom";

const BookDetails = () => {
  const {BookId}=useParams();
  const {setFavourites,favourites}=useOutletContext();
  const { data:book, isLoading, error } = UseFetch(
    `https://www.googleapis.com/books/v1/volumes/${BookId}`, 
    [BookId]
  );
  const handleFavourites = () => {
    setFavourites((prevFav) => {
      const isFavourite = prevFav.some((fav) => fav.id === book.id);
      if (isFavourite) {
        return prevFav.filter((fav) => fav.id !== book.id); 
      }
      return [...prevFav, book]; 
    });
  };

  
 if (error) {
    return <div>Error: {error}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
   if (!book) {
    return <p>No book details available</p>;
  }

  return (
    <div className="BookDetails">
      <div className="details">
        <p>title: {book.volumeInfo?.title || "No title available"}</p>
        <p>authors: {book.volumeInfo?.authors?.toString() || "Unknown authors"}</p>
        <p>description: {book.volumeInfo?.description || "No description available"}</p>
        <img
          className="BookImage"
          src={book.volumeInfo?.imageLinks?.smallThumbnail || "placeholder.jpg"}
          alt={book.volumeInfo?.title || "No image available"}
        />
        {favourites.find((favouritue) => favouritue.id === book.id) ? (
          <button onClick={handleFavourites}>Remove from favourites</button>
        ) : (
          <button onClick={handleFavourites}>Add to favourites</button>
        )}
      </div>
    </div>
  );

}
export default BookDetails