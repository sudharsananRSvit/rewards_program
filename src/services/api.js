export const fetchTransactions = async () => {
  const response = await fetch('/data/transactions.json');
  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }
  const data = await response.json();
  return data;
};