import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar/NavBar";
import UseFetch from './CustomeHooks/UseFetch'
import { useState } from "react";
import { Outlet } from "react-router-dom";

function App() {
  const[SearchField,setSearchField]=useState("coding")
  // custome fetch
  const { data, isLoading, error } = UseFetch(
    `https://www.googleapis.com/books/v1/volumes?q=${SearchField}&key=AIzaSyAckshg1Ja2fM2ov7x6Qmq8CqR5WS0d0Ec&maxResults=40`,
    SearchField
  );

  const handleSearch=(event)=>{
    event.preventDefault();
    const {value}=event.target.search;
    if(value){
      setSearchField(value);
    }
  }
  return (
    <>
      <NavBar setSearchField={handleSearch}></NavBar>
      <Outlet context={{data,isLoading, error}}/>
    </>
  );
}

export default App;
