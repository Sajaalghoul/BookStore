import React, {memo,useContext} from "react";
import BookCard from "../BookCard/BookCard";
import { ThemeContext } from "../../Contexts/ThemeProvider";
import { useParams } from "react-router-dom";
import { useBooks } from "../../Contexts/BooksProvider";
const BooksList = () => {
    const {books:data}=useBooks();
    const { theme } = useContext(ThemeContext);
    const {BookShelfId}=useParams();
    // const {shelf}=useContext(ShelfContext);
    // const data = booksData || shelf;
    // books
    const Books=data?.map((book) => {
        const thumbnail =
          book.volumeInfo.imageLinks?.thumbnail ||
          book.volumeInfo.imageLinks?.smallThumbnail;
        
        return (
          thumbnail && (
                 <BookCard book={book} BookShelfId={BookShelfId} key={book.id}>
                  <BookCard.Image />
                  <div className="px-4 py-2">
                    <BookCard.Title />
                    {!BookShelfId&&<BookCard.Categories />}
                  </div>
                   <BookCard.ActionsContainer>
                   <BookCard.DetailsButton />
                    {BookShelfId&&<BookCard.DeleteButton />}
                  </BookCard.ActionsContainer>
                </BookCard>
          )
        )});
        return (
          <div
              className={`flex gap-10 m-8 justify-center flex-wrap ${
                theme === "light" ? "bg-white text-black" : "bg-[rgb(17,24,39)] text-white"
              }`}
            >
              {Books}
            </div>
        )
      
}

export default memo(BooksList)
