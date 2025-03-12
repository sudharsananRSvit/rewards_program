import React, { useState, useEffect } from 'react';
import { fetchTransactions } from './services/api';
import CustomerDropdown from './components/CustomerDropdown';
import CustomerRewards from './components/CustomerRewards';
import TransactionDetails from './components/TransactionDetails';
import Pagination from './components/Pagination';
import Filter from './components/Filter';
import { Container, Header, Section, FlexContainer, SmallSection, ClearButton, ButtonContainer } from './styles';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false); // Set loading to false by default
  const [error, setError] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('ALL');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;

  useEffect(() => {
    const loadTransactions = async () => {
      setLoading(true); // Set loading to true when starting to load transactions
      try {
        const data = await fetchTransactions();
        setTransactions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Set loading to false after transactions are loaded
      }
    };
    loadTransactions();
  }, []);

  const handleCustomerSelect = (customerId) => {
    setSelectedCustomer(customerId);
    setCurrentPage(1);
    setSelectedMonth('ALL');
    setSelectedYear('2025');
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    setCurrentPage(1);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleClear = () => {
    setSelectedCustomer('');
    setSelectedMonth('ALL');
    setSelectedYear('2025');
    setCurrentPage(1);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const uniqueCustomers = Array.from(new Set(transactions.map(transaction => transaction.customerId)))
    .map(customerId => transactions.find(transaction => transaction.customerId === customerId));

  const filteredTransactions = transactions.filter(transaction => transaction.customerId === selectedCustomer);
  const recentMonths = [...new Set(filteredTransactions.map(transaction => new Date(transaction.date).toLocaleString('default', { month: 'long' })))].slice(-3);
  const allMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const years = Array.from({ length: 21 }, (_, i) => (2010 + i).toString());
  const months = selectedMonth === 'ALL' ? recentMonths : [selectedMonth];
  const displayedTransactions = filteredTransactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    const transactionMonth = transactionDate.toLocaleString('default', { month: 'long' });
    const transactionYear = transactionDate.getFullYear().toString();
    return (selectedMonth === 'ALL' || months.includes(transactionMonth)) && transactionYear === selectedYear;
  });
  const totalPages = Math.ceil(displayedTransactions.length / transactionsPerPage);
  const paginatedTransactions = displayedTransactions.slice((currentPage - 1) * transactionsPerPage, currentPage * transactionsPerPage);

  return (
    <Container>
      <Header>Rewards Program</Header>
      <FlexContainer>
        <Section>
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
            <Filter
              months={allMonths}
              years={years}
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              onMonthChange={handleMonthChange}
              onYearChange={handleYearChange}
            />
            <TransactionDetails transactions={paginatedTransactions} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </Section>
          <ButtonContainer>
            <ClearButton onClick={handleClear}>Clear</ClearButton>
          </ButtonContainer>
        </>
      )}
    </Container>
  );
};

export default App;