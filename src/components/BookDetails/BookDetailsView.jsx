import React,{useContext} from 'react'
import DOMPurify from 'dompurify';
import { ThemeContext } from '../../Contexts/ThemeProvider';

const BookDetailsView = ({favourites, updateFavourites,BookShelf,error,isLoading, book,handleShelfAdd,BookShelves}) => {
    const { theme } = useContext(ThemeContext);
  return (
    <div className={`max-w-4xl mx-auto ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'} rounded-xl shadow-md overflow-hidden`} style={{ paddingTop: '9rem' }}>
    {error? (<div >Error: {error}</div>
    ):(isLoading?(
      <div>Loading...</div>
    ):(
      book?(
        <>
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
              <option value="default" >Choose Shelf To add</option>
              {BookShelves.map((shelf) => (
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
      </>
      ):(
        <p>No book details available</p>
      )
    )
     
     )}

  </div>
  )
}

export default BookDetailsView
