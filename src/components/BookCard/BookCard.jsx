import React from 'react'
import './BookCard.css'
import { Link } from 'react-router-dom';

const BookCard = (props) => {
  return (
    <div className="BookCard">
      <div className="imageContainer">
        <img  className="BookImage" src={props.image} alt="Book"/>
      </div>
      <Link className="title" to={`/Book/${props.id}`}>{props.title}</Link>
      <p><span className="authors">Authors: </span>{props.authors}</p>
    </div>
  )
}

export default BookCard;
