import React,{memo} from 'react'
import Pagination from "../Pagination/Pagination";
import BooksList from '../BooksLsit/BooksList';
//container presentaional dsign pattern

const SearchedBooksView =({theme,error,isLoading,data,currentData,postsPerPage,setCurrentPage,currentPage}) => {
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
    ) : data?.items && data.items.length > 0 ? ( // Check for items in data
      <>
        <BooksList booksData={currentData} />
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
  )
}

export default memo(SearchedBooksView)
