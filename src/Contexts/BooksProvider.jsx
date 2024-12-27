import React, { createContext, useContext, useState } from "react";

const BooksContext = createContext();

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([]);
  const handleBooks=(booksData)=>{
    console.log("changed");
    setBooks(booksData);
   }
  return (
    <BooksContext.Provider value={{ books, handleBooks }}>
      {children}
    </BooksContext.Provider>
  );
}
export const useBooks = () => {
    return useContext(BooksContext)
};

export default BooksProvider;