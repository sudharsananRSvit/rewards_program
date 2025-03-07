import React, { useState, useEffect } from 'react';
import { fetchTransactions } from './services/api';
import CustomerDropdown from './components/CustomerDropdown';
import CustomerRewards from './components/CustomerRewards';
import TransactionDetails from './components/TransactionDetails';
import Pagination from './components/Pagination';
import Filter from './components/Filter';
import { Container, Header, Section, FlexContainer, SmallSection, Label } from './styles';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await fetchTransactions();
        setTransactions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadTransactions();
  }, []);

  const handleCustomerSelect = (customerId) => {
    setSelectedCustomer(customerId);
    setCurrentPage(1);
    setSelectedMonth('ALL');
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const uniqueCustomers = Array.from(new Set(transactions.map(transaction => transaction.customerId)))
    .map(customerId => transactions.find(transaction => transaction.customerId === customerId));

  const filteredTransactions = transactions.filter(transaction => transaction.customerId === selectedCustomer);
  const recentMonths = [...new Set(filteredTransactions.map(transaction => new Date(transaction.date).toLocaleString('default', { month: 'long' })))].slice(-3);
  const months = selectedMonth === 'ALL' ? recentMonths : [selectedMonth];
  const displayedTransactions = selectedMonth === 'ALL'
    ? filteredTransactions
    : filteredTransactions.filter(transaction => months.includes(new Date(transaction.date).toLocaleString('default', { month: 'long' })));
  const totalPages = Math.ceil(displayedTransactions.length / transactionsPerPage);
  const paginatedTransactions = displayedTransactions.slice((currentPage - 1) * transactionsPerPage, currentPage * transactionsPerPage);

  return (
    <Container>
      <Header>Rewards Program</Header>
      <FlexContainer>
        <Section>
          <Label>Customer</Label>
          <CustomerDropdown customers={uniqueCustomers} onSelectCustomer={handleCustomerSelect} />
        </Section>
        {selectedCustomer && (
          <SmallSection>
            <CustomerRewards transactions={filteredTransactions} />
          </SmallSection>
        )}
      </FlexContainer>
      {selectedCustomer && (
        <>
          <Section>
            <Filter months={recentMonths} selectedMonth={selectedMonth} onMonthChange={handleMonthChange} />
            {selectedMonth && (
              <>
                <TransactionDetails transactions={paginatedTransactions} />
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              </>
            )}
          </Section>
        </>
      )}
    </Container>
  );
};

export default App;