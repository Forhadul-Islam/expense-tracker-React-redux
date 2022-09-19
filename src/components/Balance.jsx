import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getCurrency } from "../utils/numberFormatter";

const calculatebalance = (transactions) => {
  let amount = transactions.reduce((acc, curr) => {
    if (curr.type === "income") return acc + curr.amount;
    if (curr.type === "expense") return acc - curr.amount;
  }, 0);
  return amount;
};

export default function Balance() {
  const { transactions } = useSelector((state) => state.transactions);

  return (
    <div className="top_card">
      <p>Your Current Balance</p>
      <h3>
        <span>৳</span>
        <span>{calculatebalance(transactions)}</span>
      </h3>
    </div>
  );
}
