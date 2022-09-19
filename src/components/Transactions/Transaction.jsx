import { useDispatch } from "react-redux";
import deleteImage from "../../assets/images/delete.svg";
import editImage from "../../assets/images/edit.svg";
import {
  editingActivaed,
  removeTransaction,
} from "../../features/transactions/transactionsSlice";

export default function Transaction({ transaction, hideEditButton }) {
  const { id, name, amount, type } = transaction;
  const dispatch = useDispatch();

  const handleActivateEditMode = () => {
    dispatch(editingActivaed(transaction));
  };

  const handleDeleteTransaction = () => {
    dispatch(removeTransaction(id));
    console.log(id);
  };

  return (
    <li className={`transaction ${type}`}>
      <p>{name}</p>
      <div className="right">
        <p>৳ {amount}</p>
        {!hideEditButton && (
          <button onClick={handleActivateEditMode} className="link">
            <img alt="Edit" className="icon" src={editImage} />
          </button>
        )}
        <button onClick={handleDeleteTransaction} className="link">
          <img alt="Delete" className="icon" src={deleteImage} />
        </button>
      </div>
    </li>
  );
}
