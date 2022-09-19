import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Transaction from "../components/Transactions/Transaction";
import Pagination from "../components/ui/Pagination";
import {
  searched,
  setLimit,
  typeChanged,
} from "../features/transactions/filters/filtersSlice";
import { fetchTransactions } from "../features/transactions/transactionsSlice";

const AllTransactions = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const { transactions, isLoading, isError, error } = useSelector(
    (state) => state.transactions
  );
  const {
    pagination: { limit, currentPage: page },
    type,
    search,
  } = useSelector((state) => state.filters);
  useEffect(() => {
    dispatch(setLimit(10));
    dispatch(fetchTransactions({ limit: 10, type, search, page }));
  }, [dispatch, limit, type, search, page]);

  // content to show
  let content;
  // if (isLoading) {
  //   content = <div>Loding...</div>;
  // }
  if (!isLoading && isError) {
    content = <div>{error}</div>;
  }
  if (!isError && transactions.length > 0) {
    content = transactions.map((transaction) => (
      <Transaction transaction={transaction} hideEditButton />
    ));
  }
  if (!isError && transactions.length === 0) {
    content = (
      <div className="text-xl text-center font-semibold">
        No transaction found!
      </div>
    );
  }

  const handleSelectType = (e) => {
    let type = e.target.value.toLowerCase();
    dispatch(typeChanged(type));
  };
  const handleSearch = (e) => {
    setText(e.target.value);
    dispatch(searched(e.target.value));
  };
  return (
    <div className="flex flex-col rounded-md w-screen mx-16 bg-slate-100 justify-between">
      <div className="p-4">
        <div>
          <div className=" mb-6 flex justify-between border-b border-b-slate-400 pb-2 ">
            <input
              type="search"
              name="seatch"
              placeholder="Search here"
              value={text}
              onChange={(e) => handleSearch(e)}
              className=" border focus:outline-none focus:font-extralight border-gray-600 px-2 rounded-md"
            />
            <div>
              <select
                onChange={(e) => handleSelectType(e)}
                name="select"
                className="text-gray-600 font-semibold border-2 border-gray-600  px-1 "
              >
                <option value="all">All</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
          </div>
          <div>{content}</div>
        </div>
      </div>
      <div className="mr-4">
        <Pagination />
      </div>
    </div>
  );
};

export default AllTransactions;
