import React from "react";
import "./NavBar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import SearchBox from "../SearchBox/SearchBox";
import { NavLink } from "react-router-dom";
import { useContext,useState } from "react";
import { ThemeContext } from "../../Contexts/ThemeProvider";
library.add(faBars);
const NavBar = (props) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  // menu displaying
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev); 
  };

  const closeMenu = () => {
    setMenuOpen(false); 
  };
  return (
<header className={`fixed top-0 left-0 w-full z-50 border-b ${theme === "light" ? 'bg-white text-black' : 'bg-[rgb(17,24,39)] text-white'} font-semibold min-h-[60px] px-20 py-3 tracking-wide pb-16`}>
  <div className='flex flex-wrap items-center max-lg:gap-y-6 max-sm:gap-x-4'>
    <h1 className="w-36 text-2xl font-bold">BooksLibrary</h1>
    <div
      id="collapseMenu"
      className={`max-lg:fixed max-lg:w-2/3 max-lg:min-w-[200px] max-lg:max-w-[300px] max-lg:box-border max-lg:top-0 max-lg:left-0 max-lg:px-6 max-lg:py-4 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50 
        lg:!flex lg:items-center lg:gap-x-10 max-lg:space-y-3 transition-transform duration-300 ease-in-out ${
          menuOpen ? "max-lg:translate-x-0" : "max-lg:-translate-x-full"
        } ${theme === "light" ? "bg-white text-black" : "bg-[rgb(17,24,39)] text-white"}`}
    >
      <ul className='lg:flex lg:gap-x-10 lg:absolute lg:left-1/2 lg:-translate-x-1/2 max-lg:space-y-3 max-lg:fixed max-lg:w-2/3 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:px-10 max-lg:py-4 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50'>
        <li className='max-lg:border-b max-lg:py-3'>
          <NavLink
            to="/"
            onClick={closeMenu}
            className={({ isActive }) =>
              `text-[20px] block font-semibold ${
                isActive ? 'underline' : 'hover:text-indigo-500'
              }`
            }
          >
            Home
          </NavLink>
        </li>
        <li className='group max-lg:border-b max-lg:py-3 relative'>
          <NavLink
            to="favourites"
            onClick={closeMenu}
            className={({ isActive }) =>
              `text-[20px] block font-semibold ${
                isActive ? 'underline' : 'hover:text-indigo-500'
              }`
            }
          >
            Favourites
          </NavLink>
        </li>
      </ul>
    </div>
    <div className='flex items-center ml-auto space-x-8'>
      <button className="border" onClick={toggleTheme}>
        ToggleTheme
      </button>
      {!menuOpen && (
        <button onClick={toggleMenu} className='lg:hidden'>
          <FontAwesomeIcon icon="bars" className="text-2xl" />
        </button>
      )}
    </div>
  </div>
  <SearchBox
    handleSearch={props.handleSearch}
    SearchField={props.SearchField}
  />
</header>


  
  );
};

export default NavBar;
