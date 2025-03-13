import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { HEADERS } from '../constants';

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
  text-align: center;
`;

const NoTransactionMessage = styled.td`
  padding: 20px;
  text-align: center;
  font-size: 18px;
  color: #999;
`;

const TransactionDetails = ({ transactions, customerName }) => {
  const sortedTransactions = useMemo(() => {
    return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [transactions]);

  return (
    <>
      <h3>{`${HEADERS.TRANSACTION_DETAILS} Customer ${customerName}`}</h3>
      <Table>
        <thead>
          <tr>
            <Th>{HEADERS.TRANSACTION_ID}</Th>
            <Th>{HEADERS.AMOUNT}</Th>
            <Th>{HEADERS.DATE}</Th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.length > 0 ? (
            sortedTransactions.map(transaction => (
              <tr key={transaction.transactionId}>
                <Td>{transaction.transactionId}</Td>
                <Td>{transaction.amount}</Td>
                <Td>{transaction.date}</Td>
              </tr>
            ))
          ) : (
            <tr>
              <NoTransactionMessage colSpan="3">{HEADERS.NO_TRANSACTION}</NoTransactionMessage>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

TransactionDetails.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape({
    transactionId: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
  })).isRequired,
  customerName: PropTypes.string.isRequired,
};

export default TransactionDetails;