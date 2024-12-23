import React, { useContext, useEffect, useState } from 'react';
import UseFetch from '../../CustomeHooks/UseFetch';
import { AccessTokenContext } from '../../Contexts/AccessTokenProvider';
import { BookShelvesContext } from '../../Contexts/BookShelvesProvider';
import { Link,Outlet,useParams  } from 'react-router-dom';
import { ShelfContext } from '../../Contexts/ShelfProvider';

const BookShelves = () => {
  const { accessToken } = useContext(AccessTokenContext);
  const { BookShelves ,data, isLoading, error }=useContext(BookShelvesContext);
  const {handleShelf}=useContext(ShelfContext);
  const {BookShelfId}=useParams();
  const [shelfId , setSheldId]=useState(BookShelfId?parseInt(BookShelfId,10):-1);
    //get the fetch function to do it conditionally
    console.log(shelfId,BookShelfId);
     const url = shelfId !== -1 
      ? `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelfId}/volumes?key=AIzaSyDVJoJ9emOGe6Qsi2cf63H717RFn5P3Zb4`
      : null;
    const { data:shelfData } =   
    UseFetch(
      url,
      [shelfId],
      "GET",
      { Authorization: `Bearer ${accessToken}` }
    );
    useEffect(()=>{
      if (shelfData) {
        handleShelf(shelfData.items);
      }
    },[shelfData])
   
  return (
    <div style={{ paddingTop: "9rem" }}>
      {error ? (
        <div>Error: {error}</div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : data?.items?.length > 0 ? ( // Check for items in data
        <>
        <ul>
          {BookShelves.map((shelf) => (
            <li key={shelf.id}><Link to={`/main/BookShelves/${shelf.id}`} onClick={()=>{setSheldId(shelf.id)}}>{shelf.title}</Link></li>
          ))} 
        </ul>
        <Outlet/>
        </>
      ) : (
        <div>No bookshelves found</div>
      )}
       {/* <button onClick={AddShelf}>Add Shelf</button> */}
    </div>

  );
};

export default BookShelves;
