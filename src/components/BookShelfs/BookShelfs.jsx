import React, { useContext, useState } from 'react';
import UseFetch from '../../CustomeHooks/UseFetch';
import { AccessTokenContext } from '../../Contexts/AccessTokenProvider';
import BookCard from '../BookCard/BookCard';
import { BookShelvesContext } from '../../Contexts/BookShelvesProvider';

const BookShelfs = () => {
  const { accessToken } = useContext(AccessTokenContext);
  const [shelf,setShelf]=useState([]);
  const { BookShelves ,data, isLoading, error }=useContext(BookShelvesContext);
    //get the fetch function to do it conditionally
  const {callApi}=UseFetch();

  const handleShelfDetails=async(shelfId)=>{
    const url=`https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelfId}/volumes?key=AIzaSyDVJoJ9emOGe6Qsi2cf63H717RFn5P3Zb4`;
    const shelfData = await callApi(url, { method: "GET", headers: { Authorization: `Bearer ${accessToken}` } });
    if(shelfData){
        setShelf(shelfData.items);
    }  
  }
  return (
    <div style={{ paddingTop: "9rem" }}>
      {error ? (
        <div>Error: {error}</div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : data?.items?.length > 0 ? ( // Check for items in data
        <ul>
          {BookShelves.map((shelf) => (
            <li key={shelf.id}><button onClick={() => handleShelfDetails(shelf.id)}>{shelf.title}</button></li>
          ))}
        </ul>
      ) : (
        <div>No bookshelves found</div>
      )}
       {shelf && shelf?.map((book) => {
        const thumbnail =
          book.volumeInfo.imageLinks?.thumbnail ||
          book.volumeInfo.imageLinks?.smallThumbnail;
        return (
          <BookCard
            key={book.id}
            title={book.volumeInfo.title}
            image={thumbnail}
            categories={book.volumeInfo.categories?.toString()}
            id={book.id}
          />
        );
      })}
       {/* <button onClick={AddShelf}>Add Shelf</button> */}
    </div>

  );
};

export default BookShelfs;
