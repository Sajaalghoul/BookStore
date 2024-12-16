import React, { createContext, useReducer, useEffect, useContext } from "react";
import UseFetch from "../CustomeHooks/UseFetch";
import { AccessTokenContext } from "./AccessTokenProvider";

// Asynchronous API operation
const handleAdd = async (AddOrRemove, book, accessToken) => {
  const url = `https://www.googleapis.com/books/v1/mylibrary/bookshelves/0/${AddOrRemove}?volumeId=${book}&key=AIzaSyDVJoJ9emOGe6Qsi2cf63H717RFn5P3Zb4`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to ${AddOrRemove} book.`);
    }
    return true; 
  } catch (error) {
    console.error(`Error during ${AddOrRemove}:`, error.message);
    return false; 
  }
};

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
    [accessToken],
    "GET",
    accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : null // Skip headers if accessToken is missing
  );

  const [favourites, dispatch] = useReducer(favouritesReducer, []);

  // set faviourites based on fetched data
  useEffect(() => {
    if (data?.items) {
      dispatch({ type: "SET_FAVOURITES", payload: data.items });
    }
  }, [data]);

  // Add or remove favourites (with API call)
  const updateFavourites = async (actionType, book) => {
    const AddOrRemove = actionType === "ADD_FAVOURITE" ? "addVolume" : "removeVolume";
    const success = await handleAdd(AddOrRemove, book.id, accessToken);
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
