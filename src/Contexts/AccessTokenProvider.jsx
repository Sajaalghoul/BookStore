import React, { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// Create context
export const AccessTokenContext = createContext();

const AccessTokenProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [accessToken] = useState(Cookies.get("access_token"));

  // Function to fetch user details
  const getUserDetails = async (accessToken) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
      );
      const data = await response.json();
      setUserDetails(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  useEffect(() => {
    if (!accessToken) {
      navigate("/main"); // Redirect if no access token is found
    } else {
      getUserDetails(accessToken); // Fetch user details if access token exists
    }
  }, [navigate]);

  return (
    <AccessTokenContext.Provider value={{ userDetails,accessToken }}>
      {children}
    </AccessTokenContext.Provider>
  );
};

export default AccessTokenProvider;
