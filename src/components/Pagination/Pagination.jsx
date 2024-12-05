
import React from "react";
import './Pagination.css';

const Pagination = ({ totalPosts, postsPerPage, currentPage, setCurrentPage }) => {
  let pages = [];
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };


  return (
    <div className="flex items-center justify-center space-x-1 p-4">
      <button
        className="rounded-full border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
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
          className={`min-w-9 rounded-full py-2 px-3.5 border border-transparent text-center text-sm transition-all shadow-md ml-2 ${
            currentPage === page
              ? "bg-slate-800 text-white"
              : "bg-white text-slate-600 border-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-800"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        className="rounded-full border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
        disabled={currentPage === totalPages}
        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
      >
        NEXT
      </button>
    </div>
  );
};

export default Pagination;
