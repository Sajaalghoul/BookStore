import React,{useState} from 'react'
import { useParams } from 'react-router-dom'
import UseFetch from '../../CustomeHooks/UseFetch'
import DOMPurify from 'dompurify';
import { useContext} from "react";
import { ThemeContext } from "../../Contexts/ThemeProvider";
import { FavouritesContext } from "../../Contexts/FavouriteReducerProvider.jsx";
import { AccessTokenContext } from '../../Contexts/AccessTokenProvider';
import { BookShelvesContext } from '../../Contexts/BookShelvesProvider.jsx';

const BookDetails = () => {
  const { accessToken } = useContext(AccessTokenContext);
  const {BookId}=useParams();
  const { favourites, updateFavourites } = useContext(FavouritesContext);
  const [BookShelf, setBookShelf] = useState(null);
  const { theme } = useContext(ThemeContext);
  const { data:book, isLoading, error } = UseFetch(
    `https://www.googleapis.com/books/v1/volumes/${BookId}`, 
    [BookId]
  );
  const {BookShelves}=useContext(BookShelvesContext);
  
  const {callApi}=UseFetch();

  const handleShelfAdd=async(value,book)=>{
    setBookShelf(value);
    const url = `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${value}/addVolume?volumeId=${book.id}&key=AIzaSyDVJoJ9emOGe6Qsi2cf63H717RFn5P3Zb4`;
    const success = await callApi(url, { method: "POST", headers: { Authorization: `Bearer ${accessToken}` } });
    if (success) {
      console.log("Added");
    }
  }

 if (error) {
    return <div >Error: {error}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
   if (!book) {
    return <p>No book details available</p>;
  }

  return (
    <div className={`max-w-4xl mx-auto ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'} rounded-xl shadow-md overflow-hidden`} style={{ paddingTop: '9rem' }}>
      <div className="md:flex">
        <div className="md:w-1/3">
          <img
            className="h-64 w-full object-contain"
            src={book.volumeInfo?.imageLinks?.smallThumbnail || "placeholder.jpg"}
            alt={book.volumeInfo?.title || "No image available"}
          />
        </div>

        <div className="p-8 md:w-2/3">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {book.volumeInfo?.title || "No title available"}
          </div>
          <p className="block mt-1 text-lg leading-tight font-medium">
            {book.volumeInfo?.pageCount || "Unknown"} Pages
          </p>
          <p className="mt-2 text-slate-500">
            {book.volumeInfo?.publisher || "Unknown"}
          </p>
            {favourites.find((favouritue) => favouritue.id === book.id) ? (
              <button className={`mt-4 rounded-md py-2 px-8 border text-center
               text-sm transition-all shadow-md ${theme === 'light' ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-gray-700 text-white hover:bg-gray-600'}`} 
               onClick={() => { updateFavourites("REMOVE_FAVOURITE", book)}}>
                Remove from favourites
              </button>
            ) : (
              <button  className={`mt-4 rounded-md py-2 px-8 border text-center
               text-sm transition-all shadow-md ${theme === 'light' ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
                onClick={() => { updateFavourites("ADD_FAVOURITE", book); }}>
                Add to favourites
              </button>
            )}
            
            <select
              value={BookShelf} 
              onChange={(e)=>{handleShelfAdd(e.target.value,book)}}
            >
              {BookShelves.filter((shelf) => shelf.access === 'PUBLIC').map((shelf) => (
                <option key={shelf.id} value={shelf.id}>{shelf.title}</option>
                ))}
            </select>

        </div>
      </div>

      <div
        className="p-4 mt-4"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(book.volumeInfo?.description) || "No description available",
        }}
      />
    </div>
  );
};

export default BookDetails;



