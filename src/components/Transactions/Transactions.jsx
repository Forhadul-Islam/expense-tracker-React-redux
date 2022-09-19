import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setLimit } from "../../features/transactions/filters/filtersSlice";
import { fetchTransactions } from "../../features/transactions/transactionsSlice";
import Transaction from "./Transaction";

export default function Transactions() {
  const dispatch = useDispatch();
  const { transactions, isLoading, isError, error, totalTransactions } =
    useSelector((state) => state.transactions);
  const {
    pagination: { limit, currentPage: page },
    type,
    search,
  } = useSelector((state) => state.filters);

  //load transactions data
  useEffect(() => {
    dispatch(setLimit(5));
    dispatch(fetchTransactions({ limit: 5, type, search, page }));
  }, [dispatch, limit, search, page]);

  let content;
  if (isLoading) {
    content = <div>Loading</div>;
  }
  if (!isLoading && isError) {
    content = <div className="text-red-700">{error}</div>;
  }
  if (!isLoading && !isError && transactions.length > 0) {
    content = transactions.map((t) => (
      <Transaction key={t.id} transaction={t} />
    ));
  }
  if (!isLoading && !isError && transactions?.length === 0) {
    content = <p>No transactions found!</p>;
  }

  return (
    <>
      <p className="second_heading">Your Transactions:</p>

      <div className="conatiner_of_list_of_transactions ">
        <ul>{content}</ul>
      </div>
      <div className="text-end">
        {totalTransactions > limit && (
          <Link
            to="/transactions"
            className=" cursor-pointer font-semibold text-gray-800 underline underline-offset-2"
          >
            Shom more
          </Link>
        )}
      </div>
    </>
  );
}
