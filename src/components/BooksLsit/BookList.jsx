import React, { useState, useContext } from "react";
import BookCard from "../BookCard/BookCard";
import Pagination from "../Pagination/Pagination";
import UseFetch from "../../CustomeHooks/UseFetch";
import UseDebounce from "../../CustomeHooks/UseDebounce";
import { ThemeContext } from "../../Contexts/ThemeProvider";
import { SearchContext } from "../../Contexts/SearchProvider";
import "./BokList.css";

const BookList = () => {
  const { theme } = useContext(ThemeContext);
  const { searchField } = useContext(SearchContext);

  // Debounce for timing fetching data based on search changes
  const debounced = UseDebounce(searchField, 1000);

  // Custom fetch
  const { data, isLoading, error } = UseFetch(
    debounced
      ? `https://www.googleapis.com/books/v1/volumes?q=${debounced}&key=AIzaSyAckshg1Ja2fM2ov7x6Qmq8CqR5WS0d0Ec&maxResults=40`
      : null, // Prevent initial unnecessary fetch
    [debounced]
  );

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostsIndex = lastPostIndex - postsPerPage;
  const currentData =
    data?.items && data.items.length > 0
      ? data.items.slice(firstPostsIndex, lastPostIndex)
      : [];

  // Generate book cards
  const BooksList = currentData.map((book) => {
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
  });

  // Render with ternary conditions
  return (
    <div
      className={`${
        theme === "light" ? "bg-white text-black" : "bg-[rgb(17,24,39)] text-white"
      }`}
      style={{ paddingTop: "9rem" }}
    >
      {error ? (
        <div>Error: {error}</div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : currentData.length > 0 ? (
        <>
          <div
            className={`flex gap-10 m-8 justify-center flex-wrap ${
              theme === "light" ? "bg-white text-black" : "bg-[rgb(17,24,39)] text-white"
            }`}
          >
            {BooksList}
          </div>
          <Pagination
            className="m-10"
            totalPosts={data?.items?.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </>
      ) : (
        <div>No books found</div>
      )}
    </div>
  );
};

export default BookList;
