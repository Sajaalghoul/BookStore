import React, { useContext, useEffect, useState } from "react";
import UseFetch from "../../CustomeHooks/UseFetch";
import { AccessTokenContext } from "../../Contexts/AccessTokenProvider";
import { BookShelvesContext } from "../../Contexts/BookShelvesProvider";
import { ThemeContext } from "../../Contexts/ThemeProvider";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { useBooks } from "../../Contexts/BooksProvider";

const BookShelves = () => {
  const { accessToken } = useContext(AccessTokenContext);
  const { theme } = useContext(ThemeContext); 
  const { BookShelves, data, isLoading, error } = useContext(BookShelvesContext);
  const { handleBooks } = useBooks();
  const { BookShelfId } = useParams();
  const [shelfId, setShelfId] = useState(BookShelfId ? parseInt(BookShelfId, 10) : -1);

  const url =
    shelfId !== -1
      ? `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelfId}/volumes?key=AIzaSyDVJoJ9emOGe6Qsi2cf63H717RFn5P3Zb4`
      : null;

  const { data: shelfData } = UseFetch(
    url,
    [shelfId],
    "GET",
    { Authorization: `Bearer ${accessToken}` }
  );

  useEffect(() => {
    if (shelfData) {
      handleBooks(shelfData.items);
    }
  }, [shelfData]);

  return (
    <div style={{ paddingTop: "5rem" }}>
      {error ? (
        <div>Error: {error}</div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : data?.items?.length > 0 ? (
        <div className={`flex ${theme === "light" ? "bg-gray-50 text-black" : "bg-gray-800 text-white"}`}>
          {/* Sidebar */}
          <aside
            id="cta-button-sidebar"
            className={`w-64 h-screen px-3 py-4 ${
              theme === "light" ? "bg-gray-50" : "bg-gray-800"
            }`}
            aria-label="Sidebar"
          >
            <div className="h-full overflow-y-auto">

      <ul className="space-y-2 font-medium">
        {BookShelves.map((shelf) => (
          <li
           
          >
            <NavLink
            key={shelf.id}
            onClick={() => setShelfId(shelf.id)}
            to={`/main/BookShelves/${shelf.id}`}
            className={({ isActive }) =>
                `${theme === "light" ? "text-gray-900" : "text-white"} block ${isActive ? "underline" : ""} flex items-center p-2 rounded-lg group ${
               theme === "light"
                 ? "text-gray-900 hover:bg-gray-100"
                 : "text-white hover:bg-gray-700"
             }`
              }
            >
              {shelf.title}
            </NavLink>
          </li>
        ))}
      </ul>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 p-4">
            <div
              className={`p-4 border-2 rounded-lg ${
                theme === "light"
                  ? "border-gray-200 border-dashed"
                  : "border-gray-700"
              }`}
            >
              <Outlet />
            </div>
          </div>
        </div>
      ) : (
        <div>No bookshelves found</div>
      )}
    </div>
  );
};

export default BookShelves;
