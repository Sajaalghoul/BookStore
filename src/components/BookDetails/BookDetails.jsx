import React from 'react'
import { useParams } from 'react-router-dom'
import { useOutletContext } from "react-router-dom";

const BookDetails = () => {
  const {BookId}=useParams();
  const {data}=useOutletContext();
  // find book
  const book=data.items?.find((book)=>{
    return book.id==BookId
  })

  // const title=book.volumeInfo.title;
  // const image=book.volumeInfo.imageLinks?.thumbnail ||
  // book.volumeInfo.imageLinks?.smallThumbnail;
  // const description=book.description;
  return (
    <div className="BookDetails">
      <div className="BookImage">
        {/* <img src={w} alt="img"/> */}
      </div>
      <div className="details">
        <p>title: </p>
        <p>authors: </p>
        <p>description:</p>
      </div>

    </div>
  )
}

export default BookDetails
