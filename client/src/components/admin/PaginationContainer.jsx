import React, { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";

const PaginationContainer = ({ pageCount, resultCount, currentPage }) => {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // const pages = Array.from({ length: pageCount }, (_, index) => {
  //   return index + 1;
  // });

  const handlePageChange = (pageNum) => {
    setLoading(true);

    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNum);
    navigate(`${pathname}?${searchParams.toString()}`);

    setLoading(false);
  };

  const addPageButtons = ({ pageNum, activeClass }) => {
    return (
      <li key={pageNum} className={`page-item ${activeClass && "active"}`}>
        <button
          type="button"
          onClick={() => handlePageChange(pageNum)}
          className="page-link"
        >
          {pageNum}
        </button>
      </li>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    // First page --
    pageButtons.push(
      addPageButtons({ pageNum: 1, activeClass: currentPage === 1 })
    );
    // Dots 1 --
    if (currentPage > 3) {
      pageButtons.push(
        <li key="dots-1" className={`page-item`}>
          <button type="button" className="page-link">
            ...
          </button>
        </li>
      );
    }
    // One before current page --
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageButtons({
          pageNum: currentPage - 1,
          activeClass: false,
        })
      );
    }
    // Current page --
    if (currentPage !== 1 && currentPage !== pageCount) {
      pageButtons.push(
        addPageButtons({
          pageNum: currentPage,
          activeClass: true,
        })
      );
    }
    // One after current page --
    if (currentPage !== pageCount && currentPage !== pageCount - 1) {
      pageButtons.push(
        addPageButtons({
          pageNum: currentPage + 1,
          activeClass: false,
        })
      );
    }
    // Dots 2 --
    if (currentPage < pageCount - 2) {
      pageButtons.push(
        <li key="dots-2" className={`page-item`}>
          <button type="button" className="page-link">
            ...
          </button>
        </li>
      );
    }
    pageButtons.push(
      addPageButtons({
        pageNum: pageCount,
        activeClass: currentPage === pageCount,
      })
    );
    return pageButtons;
  };

  return (
    pageCount > 1 && (
      <div className="col-12">
        <div className="card border-0">
          <div className="card-body">
            <ul className="pagination justify-content-end">
              <li className="page-item">
                <button
                  type="button"
                  className="page-link"
                  onClick={() => {
                    let prevPage = currentPage - 1;
                    if (prevPage < 1) prevPage = 1;
                    handlePageChange(prevPage);
                  }}
                >
                  <BsChevronLeft />
                </button>
              </li>
              {/* {pages.map((pageNum) => {})} */}
              {renderPageButtons()}
              <li className="page-item">
                <button
                  type="button"
                  className="page-link"
                  onClick={() => {
                    let prevPage = currentPage + 1;
                    if (prevPage >= pageCount) prevPage = pageCount;
                    handlePageChange(prevPage);
                  }}
                >
                  <BsChevronRight />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  );
};

export default PaginationContainer;
