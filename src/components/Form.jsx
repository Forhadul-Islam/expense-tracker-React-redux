import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTransaction,
  editingDeactivated,
  modifyTransiction,
} from "../features/transactions/transactionsSlice";

export default function Form() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const { editing } = useSelector((state) => state.transactions);

  //reset form
  const resetForm = () => {
    setName("");
    setType("");
    setAmount("");
  };

  //listen for edit mode
  useEffect(() => {
    if (editing.id) {
      setEditMode(true);
      setName(editing.name);
      setType(editing.type);
      setAmount(editing.amount);
      console.log({ name, amount, type });
    } else {
      setEditMode(false);
      resetForm();
    }
  }, [editing]);

  // handle create
  const handleCreateTransaction = (e) => {
    e.preventDefault();
    const formData = { name, type, amount: Number(amount) };
    dispatch(createTransaction(formData));
    resetForm();
  };

  //handle update
  const handleUpdataTransaction = (e) => {
    e.preventDefault();
    const data = {
      name,
      amount: Number(amount),
      type,
    };
    dispatch(modifyTransiction({ id: editing.id, data }));
    resetForm();
    dispatch(editingDeactivated());
  };

  const handleDeactivateEditMode = () => {
    resetForm();
    dispatch(editingDeactivated());
  };
  return (
    <div className="form">
      <h3>Add new transaction</h3>

      <form
        onSubmit={editMode ? handleUpdataTransaction : handleCreateTransaction}
      >
        <div className="form-group">
          <label htmlFor="transaction_name">Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            name="transaction_name"
            placeholder="My Salary"
            required
          />
        </div>

        <div className="form-group radio">
          <label htmlFor="transaction_type">Type</label>
          <div className="radio_group">
            <input
              type="radio"
              id="transaction_type"
              value={type}
              name="type"
              checked={type == "income"}
              onChange={() => setType("income")}
              required
            />
            <label htmlFor="transaction_type">Income</label>
          </div>
          <div className="radio_group">
            <input
              type="radio"
              value={type}
              id="transaction_type-expense"
              name="type"
              placeholder="Expense"
              checked={type == "expense"}
              onChange={() => setType("expense")}
              required
            />
            <label htmlFor="transaction_type-expense">Expense</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="transaction_amount">Amount</label>
          <input
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            value={amount}
            placeholder="300"
            name="transaction_amount"
            required
          />
        </div>
        <button className="btn">
          {editMode ? "Update Transaction" : "Add Transaction"}
        </button>
      </form>

      {editMode && (
        <button onClick={handleDeactivateEditMode} className="btn cancel_edit">
          Cancel Edit
        </button>
      )}
    </div>
  );
}
