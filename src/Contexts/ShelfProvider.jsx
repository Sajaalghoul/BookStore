import React,{createContext, useState} from 'react'

export const ShelfContext=createContext();
const ShelfProvider = ({children}) => {
   const [shelf,setShelf]=useState([]);
   const handleShelf=(shelfData)=>{
    setShelf(shelfData);
   }
  return (
    <ShelfContext.Provider value={{shelf,handleShelf}}>
      {children}
    </ShelfContext.Provider>
  )
}

export default ShelfProvider
