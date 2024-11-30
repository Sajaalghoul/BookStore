import React from "react";
import './Pagination.css'

const Pagination = (props) => {
  let pages=[];
  for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
  pages.push(i);
}
  
  return (
    <div className="paginationContainer">
      {
      pages.map((page,index)=>(
        <button key={index} onClick={()=>props.setCurrentPage(page)}>{page}</button>
      ))
      }
    
    </div>
    )
};

export default Pagination;
