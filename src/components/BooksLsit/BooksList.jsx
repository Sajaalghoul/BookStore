import React, {memo,useContext} from "react";
import BookCard from "../BookCard/BookCard";
import { ThemeContext } from "../../Contexts/ThemeProvider";
import { useParams } from "react-router-dom";
const BooksList = ({booksData}) => {
    const {BookShelfId}=useParams();
    const { theme } = useContext(ThemeContext);
    console.log(BookShelfId);
    const Books=booksData?.map((book) => {
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
