import axios from "../../utils/axios";

export const getTransactions = async (limit, type, search, page) => {
  let queryString = "";
  if (type == "income" || type == "expense") {
    queryString += `type_like=${type}`;
  }
  if (search !== "") {
    queryString += queryString.length > 0 ? `&q=${search}` : `q=${search}`;
  }
  queryString +=
    queryString.length > 0
      ? `&_page=${page}&_limit=${limit}`
      : `_page=${page}&_limit=${limit}`;
  queryString +=
    queryString.length > 0 ? "&_sort=name&_order=asc" : "_sort=name&_order=asc";
  const response = await axios.get(`/transactions?${queryString}`);
  const totalCount = await response.headers["x-total-count"];
  return {
    transactions: response.data,
    totalCount,
  };
};

export const addTransaction = async (data) => {
  const response = await axios.post("/transactions", data);
  return response.data;
};

export const editTransaction = async (id, data) => {
  const response = await axios.put(`/transactions/${id}`, data);
  return response.data;
};

export const deleteTransaction = async (id) => {
  const response = await axios.delete(`/transactions/${id}`);
  return response.data;
};
