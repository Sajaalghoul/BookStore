import React ,{useState} from "react";
import BookCard from "../BookCard/BookCard";
import Pagination from "../Pagination/Pagination"
import { useOutletContext } from "react-router-dom";
import "./BokList.css";

const BookList = () => {
  const {data,isLoading, error} = useOutletContext();
  // custome Api

//pagenation
  const [currentPage,setCurrentPage]=useState(1);
  const postsPerPage=8;
  const lastPostIndex=currentPage*postsPerPage;
  const firstPostsIndex=lastPostIndex - postsPerPage;
  const currentData = data?.items && data.items.length > 0 
  ? data.items.slice(firstPostsIndex, lastPostIndex) 
  : [];
  // iterate and create books cards
  const BooksList = currentData?.map((book) => {
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
  // dispaly them
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }if (currentData.length > 0) {
  return (
    <>
      <div className="flex gap-10 m-8 justify-center flex-wrap">{BooksList}</div>
      <Pagination className="m-10"
        totalPosts={data?.items?.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
}


  if (currentData.length==0) {return <p>No books found</p>};
};

export default BookList;
