import React, { useContext, createContext, useId } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../Contexts/ThemeProvider";
import { AccessTokenContext } from "../../Contexts/AccessTokenProvider";
import { useBooks } from "../../Contexts/BooksProvider";
import UseFetch from "../../CustomeHooks/UseFetch";

const BookCardContext = createContext();

export default function BookCard({ book, BookShelfId, children }) {
  const cardId=useId();
  const { theme } = useContext(ThemeContext);
  const { accessToken } = useContext(AccessTokenContext);
  const { handleBooks } = useBooks();
  const { callApi } = UseFetch();

  const handleDelete = async (BookShelfId, BookId) => {
    const url = `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${BookShelfId}/removeVolume?volumeId=${BookId}&key=AIzaSyDVJoJ9emOGe6Qsi2cf63H717RFn5P3Zb4`;
    const success = await callApi(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (success) {
      handleBooks((prevData) => prevData.filter((book) => book.id !== BookId));
      console.log("deleted");
    }
  };

  return (
    <BookCardContext.Provider
      value={{
        book,
        theme,
        handleDelete,
        BookShelfId,
        cardId
      }}
    >
      <div
        className={`relative flex flex-col my-6 shadow-sm border rounded-lg w-80 ${
          theme === "light"
            ? "bg-white text-black border-slate-200"
            : "bg-[rgb(17,24,39)] text-white border-slate-700"
        }`}
      >
        {children}
      </div>
    </BookCardContext.Provider>
  );
}

BookCard.Image = function Image() {
  const { book,cardId } = useContext(BookCardContext);
  const thumbnail =
    book.volumeInfo.imageLinks?.thumbnail ||
    book.volumeInfo.imageLinks?.smallThumbnail;

  return (
    <div className="relative h-40 mx-4 mt-4 overflow-hidden text-white rounded-md flex items-center justify-center">
      <img
        src={thumbnail}
        alt={`${cardId}image`}
        className="object-contain max-w-full max-h-full"
      />
    </div>
  );
};

BookCard.Title = function Title() {
  const { book, theme } = useContext(BookCardContext);
  return (
    <h6
      className={`mb-2 ${
        theme === "light" ? "text-slate-800" : "text-white"
      } text-lg font-semibold`}
    >
      {book.volumeInfo.title}
    </h6>
  );
};

BookCard.Categories = function Categories() {
  const { book, theme } = useContext(BookCardContext);
  return (
    <p
      className={`leading-normal font-light text-sm ${
        theme === "light" ? "text-slate-600" : "text-slate-300"
      }`}
    >
      Categories: {book.volumeInfo?.categories || "N/A"}
    </p>
  );
};

BookCard.ActionsContainer = function ActionsContainer({ children }) {
  return <div className="px-4 pb-4 pt-0 mt-auto">{children}</div>;
};

BookCard.DetailsButton = function DetailsButton() {
  const { book, theme,cardId } = useContext(BookCardContext);
  return (
    <button
      className={`rounded-md py-2 px-8 border text-center text-sm transition-all shadow-md ${
        theme === "light"
          ? "bg-slate-800 text-white hover:bg-slate-700 hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700"
          : "bg-white text-black hover:bg-slate-500 hover:shadow-lg focus:bg-slate-500 focus:shadow-none active:bg-slate-500"
      }`}
      id={`${cardId}DetailsButton`}
    >
      <Link to={`/main/Book/${book.id}`}>Details</Link>
    </button>
  );
};

BookCard.DeleteButton = function DeleteButton() {
  const { BookShelfId,book, handleDelete, theme,cardId } = useContext(BookCardContext);

  return (
    <button
      onClick={() => handleDelete(BookShelfId, book.id)}
      className={`rounded-md py-2 px-8 mt-2 border text-center text-sm transition-all shadow-md ${
        theme === "light"
          ? "bg-red-600 text-white hover:bg-red-500 hover:shadow-lg focus:bg-red-500 focus:shadow-none active:bg-red-500"
          : "bg-red-400 text-black hover:bg-red-300 hover:shadow-lg focus:bg-red-300 focus:shadow-none active:bg-red-300"
      }`}
      id={`${cardId}DeleteButton`}
    >
      Delete Book
    </button>
  );
};
