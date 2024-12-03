import React from 'react'
import { createContext,useState} from "react";
const ThemeContext = createContext();
const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");
  
    return (
      <ThemeContext.Provider value={{ theme }}>
        {children}
      </ThemeContext.Provider>
    );
}
export default ThemeProvider
