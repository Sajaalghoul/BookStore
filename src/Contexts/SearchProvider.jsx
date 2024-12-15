
 import React,{useState,createContext} from 'react'

  // Create context
export const SearchContext = createContext();
 const SearchProvider = ({ children }) => {
     // Handle search field state
  const [searchField, setSearchField] = useState(" ");
    // Handle search function
    const handleSearch = (event) => {
        const { value } = event.target;
        setSearchField(value);
      };
     
  
    return (
      <SearchContext.Provider value={{ searchField, handleSearch }}>
        {children}
      </SearchContext.Provider>
    );
  };
 
 export default SearchProvider
 