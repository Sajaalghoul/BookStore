import React, {memo,useContext} from "react";
import BookCard from "../BookCard/BookCard";
import { ThemeContext } from "../../Contexts/ThemeProvider";
import { ShelfContext } from "../../Contexts/ShelfProvider";
import { useParams } from "react-router-dom";

const BooksList = ({booksData}) => {
    const { theme } = useContext(ThemeContext);
    const {BookShelfId}=useParams();
    const {shelf}=useContext(ShelfContext);
    const data = booksData || shelf;
    const Books=data?.map((book) => {
        const thumbnail =
          book.volumeInfo.imageLinks?.thumbnail ||
          book.volumeInfo.imageLinks?.smallThumbnail;
        
        return (
          thumbnail && (
            <BookCard
              key={book.id}
              title={book.volumeInfo.title}
              image={thumbnail}
              categories={book.volumeInfo.categories?.toString()}
              id={book.id}
              BookShelfId={BookShelfId}
            />
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
