import React, { useState, useMemo } from 'react';
import CustomerDropdown from './components/customerDropdown';
import CustomerRewards from './components/customerRewards';
import TransactionDetails from './components/transactionDetails';
import Pagination from './components/Pagination';
import Filter from './components/Filter';
import { Container, Header, Section, FlexContainer, ClearButton, ButtonContainer } from './styles';
import { HEADERS, ALL_MONTHS, YEARS } from './constants';
import useFetchTransactions from './hooks/useFetchTransactions';

const App = () => {
  const { transactions, loading, error } = useFetchTransactions();
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('ALL');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;
  const [customerNameTemp, setcustomerNameTemp] = useState('');

  const handleCustomerSelect = (customerId) => {
    setSelectedCustomer(customerId);
    setCurrentPage(1);
    setSelectedMonth('ALL');
    setSelectedYear('2025');
    setcustomerNameTemp(customerId);
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

  const uniqueCustomers = useMemo(() => {
    return Array.from(new Set(transactions.map(transaction => transaction.customerId)))
      .map(customerId => transactions.find(transaction => transaction.customerId === customerId));
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => transaction.customerId === selectedCustomer);
  }, [transactions, selectedCustomer]);

  const recentMonths = useMemo(() => {
    return [...new Set(filteredTransactions.map(transaction => new Date(transaction.date).toLocaleString('default', { month: 'long' })))].slice(-3);
  }, [filteredTransactions]);

  const customerName = useMemo(() => {
    const customer = uniqueCustomers.find(customer => customer.customerId === selectedCustomer);
    return customer ? customer.name : '';
  }, [uniqueCustomers, selectedCustomer]);

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
      <Header>{HEADERS.REWARDS_PROGRAM}</Header>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <FlexContainer>
        <Section>
          <CustomerDropdown customers={uniqueCustomers} onSelectCustomer={handleCustomerSelect} />
        </Section>
        {selectedCustomer && (
          <CustomerRewards transactions={filteredTransactions} customerName={customerNameTemp} />
        )}
      </FlexContainer>
      {selectedCustomer && (
        <>
          <Section>
            <Filter
              months={ALL_MONTHS}
              years={YEARS}
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              onMonthChange={handleMonthChange}
              onYearChange={handleYearChange}
              customerName={customerName}
            />
            <TransactionDetails transactions={paginatedTransactions} customerName={customerNameTemp} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </Section>
          <ButtonContainer>
            <ClearButton onClick={handleClear}>{HEADERS.CLEAR}</ClearButton>
          </ButtonContainer>
        </>
      )}
    </Container>
  );
};

export default App;