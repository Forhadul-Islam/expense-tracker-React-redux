import React from "react";
import Balance from "../components/Balance";
import Form from "../components/Form";
import Transactions from "../components/Transactions/Transactions";

const Home = () => {
  return (
    <div className="mx-auto">
      <Balance />
      <Form />
      <Transactions />
    </div>
  );
};

export default Home;
