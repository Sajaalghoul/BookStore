import React,{useState,useContext} from 'react'
import { useParams } from 'react-router-dom'
import UseFetch from '../../CustomeHooks/UseFetch'
import { FavouritesContext } from "../../Contexts/FavouriteReducerProvider.jsx";
import { AccessTokenContext } from '../../Contexts/AccessTokenProvider';
import { BookShelvesContext } from '../../Contexts/BookShelvesProvider.jsx';
import BookDetailsView from './BookDetailsView.jsx';

const BookDetails = () => {
  const { accessToken } = useContext(AccessTokenContext);
  const {BookId}=useParams();
  const { favourites, updateFavourites } = useContext(FavouritesContext);
  const [BookShelf, setBookShelf] = useState("default");
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
  return (
    <BookDetailsView favourites={favourites} 
    updateFavourites={updateFavourites} 
    BookShelf={BookShelf} 
    book={book}
    isLoading={isLoading}
    error={error}
    BookShelves={BookShelves}
    handleShelfAdd={handleShelfAdd}
    />
  );
};

export default BookDetails;



