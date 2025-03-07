import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  text-align: left;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const TransactionDetails = ({ transactions }) => {
  return (
    <Container>
      <Title>Transaction Details</Title>
      <Table>
        <thead>
          <tr>
            <Th>Transaction ID</Th>
            <Th>Amount</Th>
            <Th>Date</Th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.transactionId}>
              <Td>{transaction.transactionId}</Td>
              <Td>{transaction.amount}</Td>
              <Td>{transaction.date}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

TransactionDetails.propTypes = {
  transactions: PropTypes.array.isRequired,
};

export default TransactionDetails;