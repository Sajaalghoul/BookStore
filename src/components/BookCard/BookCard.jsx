import React from 'react'
import { Link } from 'react-router-dom';
import { useContext} from "react";
import { ThemeContext } from "../../Contexts/ThemeProvider";
const BookCard = (props) => {
const { theme } = useContext(ThemeContext);
  return (
  <div className={`relative flex flex-col my-6 shadow-sm border rounded-lg w-80 ${theme === "light" ? 'bg-white text-black border-slate-200' : 'bg-[rgb(17,24,39)] text-white border-slate-700'}`}>
  <div className="relative h-40 mx-4 mt-4 overflow-hidden text-white rounded-md flex items-center justify-center">
    <img
      src={props.image}
      alt="Book"
      className="object-contain max-w-full max-h-full"
    />
  </div>
  <div className="flex flex-col flex-1 px-4 py-2">
    <h6 className={`mb-2 ${theme === "light" ? 'text-slate-800' : 'text-white'} text-lg font-semibold`}>
      {props.title}
    </h6>
    <p className={`leading-normal font-light text-sm ${theme === "light" ? 'text-slate-600' : 'text-slate-300'}`}>
      Categories: {props.categories}
    </p>
  </div>
  <div className="px-4 pb-4 pt-0 mt-auto">
    <button className={`rounded-md py-2 px-8 border text-center text-sm transition-all shadow-md 
      ${theme === "light" ? 'bg-slate-800 text-white hover:bg-slate-700 hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700' 
      : 'bg-white text-black hover:bg-slate-500 hover:shadow-lg focus:bg-slate-500 focus:shadow-none active:bg-slate-500'}`}
      type="button"
    >
      <Link to={`/main/Book/${props.id}`}>Details</Link>
    </button>
  </div>
</div>


    )
}

export default BookCard;
