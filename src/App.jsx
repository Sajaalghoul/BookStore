import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar/NavBar";
import UseFetch from './CustomeHooks/UseFetch';
import UseDebounce from './CustomeHooks/UseDebounce';
import { useReducer, useState, useEffect } from "react";
import { Outlet } from "react-router-dom"; // Import useLocation to track route changes
import ThemeProvider from "./Contexts/ThemeProvider";

function App() {
  // Handle search field state
  const [SearchField, setSearchField] = useState("coding");

  // Debounce for timing fetching data based on search changes
  const debounced = UseDebounce(SearchField, 1000);

  // Custom fetch
  const { data, isLoading, error } = UseFetch(
    `https://www.googleapis.com/books/v1/volumes?q=${debounced}&key=AIzaSyAckshg1Ja2fM2ov7x6Qmq8CqR5WS0d0Ec&maxResults=40`, 
    [debounced]
  );

  console.log("fetched", data);

  // Handle search function
  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchField(value);
  };

  // Favourites reducer
  const favouritesReducer = (state, action) => {
    switch (action.type) {
      case "ADD_FAVOURITE":
        return [...state, action.payload];
      case "REMOVE_FAVOURITE":
        return state.filter((fav) => fav.id !== action.payload);
      default:
        return state;
    }
  };

  const [favourites, dispatch] = useReducer(favouritesReducer, []);

  return (
    <ThemeProvider>
      <NavBar handleSearch={handleSearch} SearchField={SearchField} />
      <Outlet context={{ data, isLoading, error, dispatch, favourites }} />
    </ThemeProvider>
  );
}

export default App;
