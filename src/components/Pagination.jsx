import React from "react";
import "../styles/paginationstyle.css";

const Pagination = ({ setPage, page, productsData, count }) => {
  const nextPage = (currentPage) => {
    window.scrollTo(0, 0);
    setPage(currentPage + 1);
  };

  const afterPage = (currentPage) => {
    window.scrollTo(0, 0);
    setPage(currentPage - 1);
  };

  const numPages = Math.ceil(count / 6);

  console.log(numPages);

  return (
    <>
      <div className="pag-box">
        {page > 1 ? (
          <div onClick={() => afterPage(page)}>&#60;</div>
        ) : (
          <div className="uns-pag">&#60;</div>
        )}

        {page >= 2 && <div onClick={() => afterPage(page)}>{page - 1}</div>}

        <div className="selected-pag">{page}</div>

        {page < numPages && (
          <div onClick={() => nextPage(page)}>{page + 1}</div>
        )}

        {page != numPages ? (
          <div onClick={() => nextPage(page)}>&#62;</div>
        ) : (
          <div className="uns-pag">&#62;</div>
        )}
      </div>
    </>
  );
};

export default Pagination;
