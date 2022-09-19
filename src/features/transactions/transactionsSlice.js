import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  getTransactions,
} from "./transactionAPI";

const initialState = {
  transactions: [],
  totalTransactions: 1,
  isLoading: false,
  isError: false,
  error: "",
  editing: {},
};

//fetch all transactions
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async ({ limit, type, search, page }) => {
    const transactions = await getTransactions(limit, type, search, page);
    return transactions;
  }
);

//create single transaction
export const createTransaction = createAsyncThunk(
  "transactions/createTransaction",
  async (data) => {
    const createdTransactions = await addTransaction(data);
    return createdTransactions;
  }
);

//edit transaction by id
export const modifyTransiction = createAsyncThunk(
  "transactions/modifyTransaction",
  async ({ id, data }) => {
    const editedTransaction = await editTransaction(id, data);
    return editedTransaction;
  }
);

//remove transaction by id
export const removeTransaction = createAsyncThunk(
  "transactions/removeTransaction",
  async (id) => {
    const removedTransaction = await deleteTransaction(id);
    return removedTransaction;
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    editingActivaed: (state, action) => {
      state.editing = action.payload;
    },
    editingDeactivated: (state) => {
      state.editing = {};
    },
  },
  extraReducers: (builder) => {
    //fetch all transactions
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.transactions = action.payload.transactions;
        state.totalTransactions = action.payload.totalCount;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.transactions = [];
        state.error = action.error?.message;
      });
    // create transaction
    builder
      .addCase(createTransaction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.transactions.unshift(action.payload);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error?.message;
      });
    // modified transaction
    builder
      .addCase(modifyTransiction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(modifyTransiction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        const transaction = action.payload;
        const transactionIdx = state.transactions.findIndex(
          (t) => t.id === transaction.id
        );
        if (transactionIdx !== -1)
          state.transactions[transactionIdx] = transaction;
      })
      .addCase(modifyTransiction.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error?.message;
      });
    // removed transaction
    builder
      .addCase(removeTransaction.pending, (state) => {
        state.isError = false;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(removeTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;

        state.transactions = state.transactions.filter(
          (t) => t.id !== action.meta.arg
        );
      })
      .addCase(removeTransaction.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error?.message;
      });
  },
});

export default transactionsSlice.reducer;
export const { editingActivaed, editingDeactivated } =
  transactionsSlice.actions;
