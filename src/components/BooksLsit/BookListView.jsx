import React,{memo} from 'react'
import Pagination from "../Pagination/Pagination";
//container presentaional dsign pattern

const BookListView =({theme,error,isLoading,data,BooksList,postsPerPage,setCurrentPage,currentPage}) => {
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
  )
}

export default memo(BookListView)
