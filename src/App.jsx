import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar/NavBar";
import UseFetch from './CustomeHooks/UseFetch'
import UseDebounce from './CustomeHooks/UseDebounce'
import { useReducer, useState} from "react";
import { Outlet } from "react-router-dom";
import ThemeProvider from "./Contexts/ThemeProvider";
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
  console.log("fetched",data);
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
        return [...state, action.payload];
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
    <ThemeProvider>
        <NavBar handleSearch={handleSearch} SearchField={SearchField}></NavBar>
        <main style={{ paddingTop: '9rem' }}>
        <Outlet context={{data,isLoading, error,dispatch,favourites}}/>
        </main>
    </ThemeProvider>
  )
}

export default App;
