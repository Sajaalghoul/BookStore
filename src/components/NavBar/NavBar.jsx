import React, { useContext, useId, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import SearchBox from "../SearchBox/SearchBox";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../Contexts/ThemeProvider";
import { AccessTokenContext } from "../../Contexts/AccessTokenProvider";
import { useLocation } from 'react-router-dom';
import navigators from "../../Navigators";

// Add the required icons to the library
library.add(faBars, faSun, faMoon);

const NavBar = () => {
  const navButtonsId=useId();
  const location = useLocation();
// Conditionally render the search bar only for the datalist royte
  const showSearch = location.pathname === '/main';
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { userDetails } = useContext(AccessTokenContext);
  // Menu displaying
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 border-b ${
        theme === "light"
          ? "bg-white text-black"
          : "bg-[rgb(17,24,39)] text-white"
      } font-semibold min-h-[60px] px-20 py-3 tracking-wide pb-16`}
    >
      <div className="flex flex-wrap items-center max-lg:gap-y-6 max-sm:gap-x-4">
        <h1 className="w-36 text-2xl font-bold">{userDetails?.name} Library</h1>
        <div
          id="collapseMenu"
          className={`max-lg:fixed max-lg:w-2/3 max-lg:min-w-[200px] max-lg:max-w-[300px] max-lg:box-border max-lg:top-0 max-lg:left-0 max-lg:px-6 max-lg:py-4 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50 
            lg:!flex lg:items-center lg:gap-x-10 max-lg:space-y-3 transition-transform duration-300 ease-in-out ${
              menuOpen ? "max-lg:translate-x-0" : "max-lg:-translate-x-full"
            } ${
            theme === "light"
              ? "bg-white text-black"
              : "bg-[rgb(17,24,39)] text-white"
          }`}
        >
          <ul className="lg:flex lg:gap-x-10 lg:absolute lg:left-1/2 lg:-translate-x-1/2 max-lg:space-y-3 max-lg:fixed max-lg:w-2/3 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:px-10 max-lg:py-4 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            {navigators.map((navigator,idx)=>(
            <li className="group max-lg:border-b max-lg:py-3" key={idx}>
                <NavLink
                to={navigator.route}
                onClick={closeMenu}
                end // Ensure exact match for `home` or other routes
                className={({ isActive }) =>
                  `text-[20px] block font-semibold ${
                    isActive ? "underline" : "hover:text-indigo-500"
                  }`
                }
                id={`${navButtonsId}${navigator.name}`}
              >
                {navigator.name}
              </NavLink>
            </li>
          ))}
          </ul>
        </div>
        <div className="flex items-center ml-auto space-x-8">
          <button
            className=" flex items-center gap-x-2 px-4 py-2 rounded-md"
            onClick={toggleTheme}
            aria-label={`${navButtonsId}ToggleTheme`}
          >
            <FontAwesomeIcon
              icon={theme === "light" ? "moon" : "sun"}
              className="text-xl"
            />
          </button>
          {!menuOpen && (
            <button onClick={toggleMenu} className="lg:hidden" aria-label={`${navButtonsId}menue`}>
              <FontAwesomeIcon icon="bars" className="text-2xl" />
            </button>
          )}
        </div>
      </div>
      {showSearch && (
      <SearchBox />
      )}
    </header>
  );
};

export default NavBar;
