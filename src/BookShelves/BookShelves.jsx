import React, { useContext, useState } from 'react';
import UseFetch from '../CustomeHooks/UseFetch';
import { AccessTokenContext } from '../Contexts/AccessTokenProvider';
import BooksList from '../components/BooksLsit/BooksList';
import { BookShelvesContext } from '../Contexts/BookShelvesProvider';
import { Link } from 'react-router-dom';


const BookShelves = () => {
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
        <>

        <ul>
          {BookShelves.map((shelf) => (
            <li key={shelf.id}><Link to={`/main/BookShelves/${shelf.id}`} onClick={() => handleShelfDetails(shelf.id)}>{shelf.title}</Link></li>
          ))} 
        </ul>
        {shelf && <BooksList booksData={shelf}/> }
        </>
      ) : (
        <div>No bookshelves found</div>
      )}
    
     
       {/* <button onClick={AddShelf}>Add Shelf</button> */}
    </div>

  );
};

export default BookShelves;
