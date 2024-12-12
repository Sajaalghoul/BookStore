import React, { createContext, useReducer } from "react";

// Initial state
const initialState = [];

// Reducer function
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
// Create context
export const FavouritesContext = createContext();

const FavouriteReducerProvider = ({ children }) => {
    const [favourites, dispatch] = useReducer(favouritesReducer, initialState);
  
    return (
      <FavouritesContext.Provider value={{ favourites, dispatch }}>
        {children}
      </FavouritesContext.Provider>
    );
  };

export default FavouriteReducerProvider
