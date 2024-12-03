import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar/NavBar";
import UseFetch from './CustomeHooks/UseFetch'
import UseDebounce from './CustomeHooks/UseDebounce'
import { useReducer, useState} from "react";
import { Outlet } from "react-router-dom";

function App() {

  //handle  search
  const[SearchField,setSearchField]=useState("coding");
  //debounce for timing fetching data based on changinging the srarch
  const debounced=UseDebounce(SearchField,3000);
  // custome fetch

  const { data, isLoading, error } = UseFetch(
    `https://www.googleapis.com/books/v1/volumes?q=${debounced}&key=AIzaSyAckshg1Ja2fM2ov7x6Qmq8CqR5WS0d0Ec&maxResults=40`, 
    [debounced]
  );
  console.log(data);
//Handle search function
  const handleSearch=(event)=>{
    const {value}=event.target;
    if(value){
    setSearchField(value);
    }
}
// favourites reducer
const favouritesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FAVOURITE":
      const isFavourite = state.some((fav) => fav.id === action.payload.id);
      if (!isFavourite) {
        return [...state, action.payload];
      }
      return state;
    case "REMOVE_FAVOURITE":
      return state.filter((fav) => fav.id !== action.payload);
    default:
      return state;
  }
};

  const [favourites,dispatch]=useReducer(favouritesReducer, []);
  //local storage favourites
  //
  return (
    <>
      <NavBar handleSearch={handleSearch} SearchField={SearchField}></NavBar>
      <Outlet context={{data,isLoading, error,dispatch,favourites}}/>
    </>
  );
}

export default App;
