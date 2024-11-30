import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar/NavBar";
import UseFetch from './CustomeHooks/UseFetch'
import UseDebounce from './CustomeHooks/UseDebounce'
import { useState , useEffect} from "react";
import { Outlet } from "react-router-dom";

function App() {

  //handle  search
  const[SearchField,setSearchField]=useState("coding");
  //debounce for timing fetching data based on changinging the srarch
  const debounced=UseDebounce(SearchField,1000);
  // custome fetch
  const { data, isLoading, error } = UseFetch(
    `https://www.googleapis.com/books/v1/volumes?q=${debounced}&key=AIzaSyAckshg1Ja2fM2ov7x6Qmq8CqR5WS0d0Ec&maxResults=40`, 
    [debounced]
  );
//Handle search function
  const handleSearch=(event)=>{
    const {value}=event.target;
    if(value){
    setSearchField(value);
    }
}
// favourites state 
  const [favourites,setFavourites]=useState([]);
  
  //local storage favourites
  //
  return (
    <>
      <NavBar handleSearch={handleSearch} SearchField={SearchField}></NavBar>
      <Outlet context={{data,isLoading, error,setFavourites,favourites}}/>
    </>
  );
}

export default App;
