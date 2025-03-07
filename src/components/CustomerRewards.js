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

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  padding: 10px 15px;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const calculateRewards = (transactions) => {
  return transactions.reduce((acc, transaction) => {
    let points = 0;
    if (transaction.amount > 100) {
      points += (transaction.amount - 100) * 2;
    }
    if (transaction.amount > 50) {
      points += Math.min(transaction.amount, 100) - 50;
    }
    const month = new Date(transaction.date).getMonth() + 1;
    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month] += points;
    return acc;
  }, {});
};

const CustomerRewards = ({ transactions }) => {
  const rewards = calculateRewards(transactions);
  return (
    <Container>
      <Title>Monthly Rewards</Title>
      <List>
        {Object.keys(rewards).map(month => (
          <ListItem key={month}>Month {month}: {rewards[month]} points</ListItem>
        ))}
      </List>
    </Container>
  );
};

CustomerRewards.propTypes = {
  transactions: PropTypes.array.isRequired,
};

export default CustomerRewards;