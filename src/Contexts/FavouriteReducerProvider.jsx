import React, { createContext, useReducer, useEffect, useContext } from "react";
import UseFetch from "../CustomeHooks/UseFetch";
import { AccessTokenContext } from "./AccessTokenProvider";


// Reducer function (should be pure and not to call handle add here)
const favouritesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FAVOURITE":
      return [...state, action.payload];
    case "REMOVE_FAVOURITE":
      return state.filter((fav) => fav.id !== action.payload.id);
    case "SET_FAVOURITES":
      return action.payload; // Update favourites with initial fetched data
    default:
      return state;
  }
};

// Create context
export const FavouritesContext = createContext();

// Provider Component
const FavouriteReducerProvider = ({ children }) => {
  const { accessToken } = useContext(AccessTokenContext);

  // Fetch initial favourites data
  const { data } = UseFetch(
    "https://www.googleapis.com/books/v1/mylibrary/bookshelves/0/volumes?key=AIzaSyDVJoJ9emOGe6Qsi2cf63H717RFn5P3Zb4",
    [],
    "GET",
    { Authorization: `Bearer ${accessToken}` }
  );

  const [favourites, dispatch] = useReducer(favouritesReducer, []);

  // set faviourites based on fetched data
  useEffect(() => {
    if (data?.items) {
      dispatch({ type: "SET_FAVOURITES", payload: data.items });
    }
  }, [data]);

  //for posting
  const {callApi}=UseFetch();
  
  // Add or remove favourites (with API call)
  const updateFavourites = async (actionType, book) => {
    const AddOrRemove = actionType === "ADD_FAVOURITE" ? "addVolume" : "removeVolume";
    const url = `https://www.googleapis.com/books/v1/mylibrary/bookshelves/0/${AddOrRemove}?volumeId=${book.id}&key=AIzaSyDVJoJ9emOGe6Qsi2cf63H717RFn5P3Zb4`;
    const success = await callApi(url, { method: "POST", headers: { Authorization: `Bearer ${accessToken}` } });
    if (success) {
      dispatch({ type: actionType, payload: book });
    }
  };

  return (
    <FavouritesContext.Provider value={{ favourites, updateFavourites }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export default FavouriteReducerProvider;
