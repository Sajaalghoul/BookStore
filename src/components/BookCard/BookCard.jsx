import React from 'react'
import './BookCard.css'
import { Link } from 'react-router-dom';

const BookCard = (props) => {
  return (
    <div className="BookCard">
      <div className="imageContainer">
        <img  className="BookImage" src={props.image} alt="Book"/>
      </div>
      <p className="title" >{props.title}</p>
      <p><span className="authors">Authors: </span>{props.authors}</p>
      <button><Link to={`/Book/${props.id}`}  >Details</Link></button>
    </div>
  )
}

export default BookCard;
