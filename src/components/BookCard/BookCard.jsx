import React from 'react'
import './BookCard.css'
import { Link } from 'react-router-dom';

const BookCard = (props) => {
  return (
<div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-80">
  <div className="relative h-40 mx-4 mt-4 overflow-hidden text-white rounded-md flex items-center justify-center">
    <img
      src={props.image}
      alt="Book"
      className="object-contain max-w-full max-h-full"
    />
  </div>
  <div className="flex flex-col flex-1 px-4 py-2">
    <h6 className="mb-2 text-slate-800 text-lg font-semibold">
      {props.title}
    </h6>
    <p className="text-slate-600 leading-normal font-light text-sm">
      Categories: {props.categories}
    </p>
  </div>
  <div className="px-4 pb-4 pt-0 mt-auto">
    <button className="rounded-md bg-slate-800 py-2 px-8 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type="button"
    >
      <Link to={`/Book/${props.id}`}>Details</Link>
    </button>
  </div>
</div>

    )
}

export default BookCard;
