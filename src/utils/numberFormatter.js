export const getCurrency = (balance) => {
  const amount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BDT",
  }).format(balance);
  return amount;
};
