import React, { memo } from "react";
import Pagination from "../Pagination/Pagination";
import BooksList from "../BooksLsit/BooksList";

// Container-Presentational design pattern
const SearchedBooksView = ({
  theme,
  error,
  isLoading,
  data,
  currentData,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  return (
    <div
      className={`min-h-screen ${
        theme === "light" ? "bg-white text-black" : "bg-[rgb(17,24,39)] text-white"
      } flex items-center justify-center`}
      style={{ paddingTop: "10rem" }}
    >
      {error ? (
        <div>Error: {error}</div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : data?.items && data.items.length > 0 ? (
        <div className="w-full">
          {/* Render books list */}
          <BooksList />
          {/* Pagination */}
          <Pagination
            className="m-10"
            totalPosts={data?.items?.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      ) : (
        <div className="w-full text-center text-lg font-medium">
          No books found
        </div>
      )}
    </div>
  );
};

export default memo(SearchedBooksView);
