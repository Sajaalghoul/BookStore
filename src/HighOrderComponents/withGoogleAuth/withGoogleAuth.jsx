import React from 'react'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const withGoogleAuth = (Component) => {
    return (props) => {
      const navigate = useNavigate();
      const [isLoggedin, setIsLoggedin] = useState(false);
    
      const handleLogin = () => {
        const callbackUrl = `${window.location.origin}`;
        const googleClientId = "9009554555-nvd2uuq6jb3giptk195j6vt6g55krbfp.apps.googleusercontent.com";
        const targetUrl = `https://accounts.google.com/o/oauth2/auth?redirect_uri=${encodeURIComponent(
            callbackUrl
          )}&response_type=token&client_id=${googleClientId}&scope=openid%20email%20profile&prompt=select_account`;
          window.location.href = targetUrl;
        };
    
        useEffect(() => {
          const accessTokenRegex = /access_token=([^&]+)/;
          const isMatch = window.location.href.match(accessTokenRegex);
    
          if (isMatch) {
            const accessToken = isMatch[1];
            Cookies.set("access_token", accessToken);
            setIsLoggedin(true);
          }
        }, []);
    
        useEffect(() => {
          if (isLoggedin) {
            navigate("/main");
          }
        }, [isLoggedin, navigate]);
    
    return (
       <Component
          {...props}
          onLogin={handleLogin}
        />
          );
        };
      
      };
      
export default withGoogleAuth;