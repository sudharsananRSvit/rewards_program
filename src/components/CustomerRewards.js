import React from 'react';
import PropTypes from 'prop-types';
import MonthlyRewards from './MonthlyRewards';

const CustomerRewards = ({ transactions, customerName }) => {
  // Calculate rewards for each month
  const rewards = Array(12).fill(0);
  transactions.forEach(transaction => {
    const month = new Date(transaction.date).getMonth();
    rewards[month] += calculateRewardPoints(transaction.amount);
  });

  return (
    <div>
      <MonthlyRewards rewards={rewards} customerName={customerName} />
    </div>
  );
};

const calculateRewardPoints = (amount) => {
  let points = 0;
  if (amount > 50) {
    points += Math.min(amount - 50, 50);
  }
  if (amount > 100) {
    points += (amount - 100) * 2;
  }
  return points;
};

CustomerRewards.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  })).isRequired,
  customerName: PropTypes.string.isRequired,
};

export default CustomerRewards;