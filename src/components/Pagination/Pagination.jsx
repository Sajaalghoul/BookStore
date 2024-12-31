import React, { memo, useContext } from "react";
import { ThemeContext } from "../../Contexts/ThemeProvider.jsx"; // assuming ThemeContext is set up

const Pagination = ({ totalPosts, postsPerPage, currentPage, setCurrentPage }) => {
  const { theme } = useContext(ThemeContext);
  let pages = [];
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const themeStyles = {
    light: {
      button: "border-slate-300 text-slate-600 hover:bg-slate-800 hover:text-white focus:bg-slate-800 focus:text-white",
      activeButton: "bg-slate-800 text-white",
      disabled: "disabled:opacity-50 disabled:shadow-none",
    },
    dark: {
      button: "border-slate-600 text-slate-400 hover:bg-slate-800 hover:text-white focus:bg-slate-800 focus:text-white",
      activeButton: "bg-slate-800 text-white",
      disabled: "disabled:opacity-50 disabled:shadow-none",
    }
  };

  return (
    <div className="flex items-center justify-center space-x-1 p-4">
      <button
        className={`rounded-full py-2 px-3 text-center text-sm transition-all shadow-sm ml-2 ${theme === "light" ? themeStyles.light.button : themeStyles.dark.button} ${currentPage === 1 ? themeStyles.light.disabled : ""}`}
        disabled={currentPage === 1}
        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(page)}
          className={`min-w-9 rounded-full py-2 px-3.5 border border-transparent text-center text-sm transition-all shadow-md ml-2 ${currentPage === page ? themeStyles.light.activeButton : theme === "light" ? themeStyles.light.button : themeStyles.dark.button}`}
        >
          {page}
        </button>
      ))}
      
      <button
        className={`rounded-full py-2 px-3 text-center text-sm transition-all shadow-sm ml-2 ${theme === "light" ? themeStyles.light.button : themeStyles.dark.button} ${currentPage === totalPages ? themeStyles.light.disabled : ""}`}
        disabled={currentPage === totalPages}
        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
      >
        NEXT
      </button>
    </div>
  );
};

export default memo(Pagination);
