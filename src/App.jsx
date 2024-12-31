import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import NavBar from "./components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import ThemeProvider from "./Contexts/ThemeProvider";
import FavouriteReducerProvider from "./Contexts/FavouriteReducerProvider";
import SearchProvider from "./Contexts/SearchProvider";
import AccessTokenProvider from "./Contexts/AccessTokenProvider";
import BookShelvesProvider from "./Contexts/BookShelvesProvider";
import BooksProvider from "./Contexts/BooksProvider";

function App() {
  return (
    <ThemeProvider>
     <AccessTokenProvider>
        <SearchProvider>
          <NavBar/>
        <BookShelvesProvider>
          <FavouriteReducerProvider>
            <BooksProvider>
                  <Outlet />
            </BooksProvider>
          </FavouriteReducerProvider>
        </BookShelvesProvider>
      </SearchProvider>
      </AccessTokenProvider>
    </ThemeProvider>
  );
}
export default App;
