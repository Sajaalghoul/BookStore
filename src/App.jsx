import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import ThemeProvider from "./Contexts/ThemeProvider";
import FavouriteReducerProvider from "./Contexts/FavouriteReducerProvider";
import SearchProvider from "./Contexts/SearchProvider";
import AccessTokenProvider from "./Contexts/AccessTokenProvider";

function App() {
  return (
    <ThemeProvider>
     <AccessTokenProvider>
        <SearchProvider>
          <NavBar/>
      <FavouriteReducerProvider>
          <Outlet />
        </FavouriteReducerProvider>
      </SearchProvider>
      </AccessTokenProvider>
    </ThemeProvider>
  );
}
export default App;
