import React, { useState, useContext, useMemo,useEffect } from "react";
import BookCard from "../BookCard/BookCard";
import UseFetch from "../../CustomeHooks/UseFetch";
import UseDebounce from "../../CustomeHooks/UseDebounce";
import { ThemeContext } from "../../Contexts/ThemeProvider";
import { SearchContext } from "../../Contexts/SearchProvider";
import BookListView from "./BookListView";
import { GOOGLE_BOOKS_API_KEY } from "../../config";

const BookList = () => {
  const { theme } = useContext(ThemeContext);
  const { searchField } = useContext(SearchContext);
  // Debounce for timing fetching data based on search changes
  const debounced = UseDebounce(searchField, 1000);
  console.log("heyy",searchField,debounced);
  
  // Custom fetch
  const url = debounced?.trim()
  ? `https://www.googleapis.com/books/v1/volumes?q=${debounced}&key=${GOOGLE_BOOKS_API_KEY}&maxResults=40`
  : null;

const { data, isLoading, error } = UseFetch(url, [debounced]);
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostsIndex = lastPostIndex - postsPerPage;
  useEffect(() => {
    setCurrentPage(1);
  }, [debounced]);
  
  const currentData = useMemo(() => {//if data is changed recompute currentdata
      if (!data?.items || data.items.length === 0) return [];
      return data.items.slice(firstPostsIndex, lastPostIndex);
    }, [data, firstPostsIndex, lastPostIndex]);

  // Generate book cards
  const BooksList = useMemo(() => 
    currentData.map((book) => {
      const thumbnail =
        book.volumeInfo.imageLinks?.thumbnail ||
        book.volumeInfo.imageLinks?.smallThumbnail;
      return (
        thumbnail && (
          <BookCard
            key={book.id}
            title={book.volumeInfo.title}
            image={thumbnail}
            categories={book.volumeInfo.categories?.toString()}
            id={book.id}
          />
        )
      );
    }), [currentData]);

  // Render with ternary conditions
  return (
    <BookListView
    theme={theme}
    error={error}
    isLoading={isLoading}
    data={data}
    BooksList={BooksList}
    postsPerPage={postsPerPage}
    setCurrentPage={setCurrentPage}
    currentPage={currentPage}
  />
  );
};

export default BookList;
