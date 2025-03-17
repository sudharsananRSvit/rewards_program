import React, { useState, useMemo } from 'react'; // Removed useEffect
import CustomerDropdown from './components/customerDropdown';
import CustomerRewards from './components/customerRewards';
import TransactionDetails from './components/transactionDetails';
import Pagination from './components/Pagination';
import Filter from './components/Filter';
import { Container, Header, Section, FlexContainer, ClearButton, ButtonContainer } from './styles';
import { HEADERS } from './constants'; // Removed ALL_MONTHS and YEARS
import useFetchTransactions from './hooks/useFetchTransactions';

const App = () => {
  const { transactions, loading, error } = useFetchTransactions();
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('RECENT');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [currentPage, setCurrentPage] = useState(1);
  const [customerNameTemp,setCustomerNameTemp] = useState('');;
  const transactionsPerPage = 5;

  const handleCustomerSelect = (customerId) => {
    setSelectedCustomer(customerId);
    setCurrentPage(1);
    setSelectedMonth('RECENT');
    setSelectedYear('2025');
    setCustomerNameTemp(customerId);
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
    setSelectedMonth('RECENT');
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

  const displayedTransactions = useMemo(() => {
    if (selectedMonth === 'RECENT') {
      return filteredTransactions.filter(transaction => {
        const transactionMonth = new Date(transaction.date).toLocaleString('default', { month: 'long' });
        return recentMonths.includes(transactionMonth) && new Date(transaction.date).getFullYear().toString() === selectedYear;
      });
    } else {
      return filteredTransactions.filter(transaction => {
        const transactionMonth = new Date(transaction.date).toLocaleString('default', { month: 'long' });
        return transactionMonth === selectedMonth && new Date(transaction.date).getFullYear().toString() === selectedYear;
      });
    }
  }, [filteredTransactions, selectedMonth, selectedYear, recentMonths]);

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
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              onMonthChange={handleMonthChange}
              onYearChange={handleYearChange}
              customerName={customerName}
              transactions={filteredTransactions}
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