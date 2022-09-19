import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../features/transactions/filters/filtersSlice";

const Pagination = () => {
  const dispatch = useDispatch();
  const { totalTransactions } = useSelector((state) => state.transactions);
  const {
    pagination: { limit, currentPage },
  } = useSelector((state) => state.filters);

  const perPageContent = Math.ceil(totalTransactions / limit);

  const handleChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };
  return (
    <section className="pt-12">
      <div className="max-w-7xl mx-auto px-5 py-6 lg:px-0 flex gap-2 justify-end">
        {[
          ...Array(perPageContent)
            .fill()
            .map((_, i) => {
              let page = i + 1;
              return (
                <div
                  onClick={() => handleChangePage(page)}
                  className={`${
                    page === currentPage ? "bg-blue-600" : "bg-blue-300"
                  } text-white px-4 py-1 rounded-full cursor-pointer`}
                >
                  {page}
                </div>
              );
            }),
        ]}
      </div>
    </section>
  );
};

export default Pagination;
