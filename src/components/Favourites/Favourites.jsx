import React from "react";
import { useOutletContext } from "react-router-dom";
import BookCard from "../BookCard/BookCard.jsx";
import { useContext} from "react";
import { ThemeContext } from "../../Contexts/ThemeProvider";
  
const  Favourites= () => {
const { theme } = useContext(ThemeContext);
const {favourites} = useOutletContext();
  return (
    <div className={`w-full h-full flex gap-10  justify-center flex-wrap ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}`} style={{ paddingTop: '9rem' }}>
      {favourites.map((book)=>{
      const thumbnail =
      book.volumeInfo.imageLinks?.thumbnail ||
      book.volumeInfo.imageLinks?.smallThumbnail;
        return( <BookCard
          key={book.id}
          title={book.volumeInfo.title}
          image={thumbnail}
          categories={book.volumeInfo.categories?.toString()}
          id={book.id}
          />
   )
   }
   )
   }
    </div>
    )
};

export default Favourites;
