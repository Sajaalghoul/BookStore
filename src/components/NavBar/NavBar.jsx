import React from "react";
import "./NavBar.css";
import SearchBox from "../SearchBox/SearchBox";
import { NavLink } from "react-router-dom";
import { useContext,useState } from "react";
import { ThemeContext } from "../../Contexts/ThemeProvider";
const NavBar = (props) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  console.log("theme", theme);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev); 
  };

  const closeMenu = () => {
    setMenuOpen(false); 
  };
  return (
    <header className='border-b bg-white font-sans min-h-[60px] px-10 py-3 relative tracking-wide z-50'>
    <div className='flex flex-wrap items-center max-lg:gap-y-6 max-sm:gap-x-4'>
     <h1 className="w-36 text-2xl font-bold">BooksLibrary</h1>
      <div id="collapseMenu"
       className={`max-lg:fixed max-lg:bg-white max-lg:w-2/3 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:px-10 max-lg:py-4 max-lg:h-full
         max-lg:shadow-md max-lg:overflow-auto z-50 
        lg:!flex lg:items-center lg:gap-x-10 max-lg:space-y-3 ${
          menuOpen ? "block" : "hidden"
        }`}>
        <ul
          className='lg:flex lg:gap-x-10 lg:absolute lg:left-1/2 lg:-translate-x-1/2 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-2/3 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:px-10 max-lg:py-4 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50'>
          <li className='max-lg:border-b max-lg:py-3'><NavLink to="/" onClick={closeMenu}
              className={({ isActive }) =>
                `text-[20px] block font-bold ${
                  isActive ? 'underline text-[#007bff]' : 'hover:text-[#007bff]'
                }`
              }>Home</NavLink></li>
          <li className='group max-lg:border-b max-lg:py-3 relative'>
            <NavLink to="favourites" onClick={closeMenu}
              className={({ isActive }) =>
                `text-[20px] block font-bold ${
                  isActive ? 'underline text-[#007bff]' : 'hover:text-[#007bff]'
                }`
              }>
              Favourites
            </NavLink>
          </li>
        </ul>
      </div>
  
      <div className='flex items-center ml-auto space-x-8'>
        <svg xmlns="http://www.w3.org/2000/svg" width="20px"
          className="cursor-pointer fill-[#000] hover:fill-[#007bff] inline-block" viewBox="0 0 371.263 371.263">
          <path
            d="M305.402 234.794v-70.54c0-52.396-33.533-98.085-79.702-115.151.539-2.695.838-5.449.838-8.204C226.539 18.324 208.215 0 185.64 0s-40.899 18.324-40.899 40.899c0 2.695.299 5.389.778 7.964-15.868 5.629-30.539 14.551-43.054 26.647-23.593 22.755-36.587 53.354-36.587 86.169v73.115c0 2.575-2.096 4.731-4.731 4.731-22.096 0-40.959 16.647-42.995 37.845-1.138 11.797 2.755 23.533 10.719 32.276 7.904 8.683 19.222 13.713 31.018 13.713h72.217c2.994 26.887 25.869 47.905 53.534 47.905s50.54-21.018 53.534-47.905h72.217c11.797 0 23.114-5.03 31.018-13.713 7.904-8.743 11.797-20.479 10.719-32.276-2.036-21.198-20.958-37.845-42.995-37.845a4.704 4.704 0 0 1-4.731-4.731zM185.64 23.952c9.341 0 16.946 7.605 16.946 16.946 0 .778-.12 1.497-.24 2.275-4.072-.599-8.204-1.018-12.336-1.138-7.126-.24-14.132.24-21.078 1.198-.12-.778-.24-1.497-.24-2.275.002-9.401 7.607-17.006 16.948-17.006zm0 323.358c-14.431 0-26.527-10.3-29.342-23.952h58.683c-2.813 13.653-14.909 23.952-29.341 23.952zm143.655-67.665c.479 5.15-1.138 10.12-4.551 13.892-3.533 3.773-8.204 5.868-13.353 5.868H59.89c-5.15 0-9.82-2.096-13.294-5.868-3.473-3.772-5.09-8.743-4.611-13.892.838-9.042 9.282-16.168 19.162-16.168 15.809 0 28.683-12.874 28.683-28.683v-73.115c0-26.228 10.419-50.719 29.282-68.923 18.024-17.425 41.498-26.887 66.528-26.887 1.198 0 2.335 0 3.533.06 50.839 1.796 92.277 45.929 92.277 98.325v70.54c0 15.809 12.874 28.683 28.683 28.683 9.88 0 18.264 7.126 19.162 16.168z"
            data-original="#000000"></path>
        </svg>
        {/* close */}
        {!menuOpen &&(<button onClick={toggleMenu} className='lg:hidden'>
          <svg className="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"></path>
          </svg>
        </button>)}
      </div>
    </div>
    <SearchBox
    handleSearch={props.handleSearch}
    SearchField={props.SearchField}
    ></SearchBox>
  
  </header>

  
  );
};

export default NavBar;
