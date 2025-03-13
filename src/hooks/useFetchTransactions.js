import { useState, useEffect } from 'react';
import { fetchTransactions } from '../services/api';

const useFetchTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTransactions = async () => {
      setLoading(true);
      try {
        console.log('Fetching transactions...');
        const data = await fetchTransactions();
        console.log('Transactions fetched successfully:', data);
        setTransactions(data);
      } catch (err) {
        console.error('Error fetching transactions:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadTransactions();
  }, []);

  return { transactions, loading, error };
};

export default useFetchTransactions;