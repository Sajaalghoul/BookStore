import React, { useContext,createContext, useEffect, useState } from 'react';
import UseFetch from '../CustomeHooks/UseFetch';
import { AccessTokenContext } from './AccessTokenProvider';

//export bookshelvs context 
export const BookShelvesContext = createContext();

const BookShelvesProvider = ({ children }) => {
    const { accessToken } = useContext(AccessTokenContext);
    const [BookShelves,setBookShelves]=useState([]);
    const { data, isLoading, error } = UseFetch(
      "https://www.googleapis.com/books/v1/mylibrary/bookshelves?key=AIzaSyDVJoJ9emOGe6Qsi2cf63H717RFn5P3Zb4",
      [],
      "GET",
      { Authorization: `Bearer ${accessToken}` }
    );
    useEffect(()=>{
      if(data){
          setBookShelves(data.items.filter((shelf) => shelf.access === 'PUBLIC'));
          console.log("hey",data.items);
        }
    },[data]);
  return (
    <BookShelvesContext.Provider value={{ BookShelves ,data, isLoading, error }}>
         {children}
    </BookShelvesContext.Provider>
  )
}

export default BookShelvesProvider
