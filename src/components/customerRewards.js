import React from 'react';
import PropTypes from 'prop-types';
import MonthlyRewards from './monthlyRewards';
import { calculateRewardPoints } from '../utils/rewardPoints';

const CustomerRewards = ({ transactions, customerName }) => {
  // Calculate rewards for each month
  const rewards = Array(12).fill(0);
  transactions.forEach(transaction => {
    const month = new Date(transaction.date).getMonth();
    rewards[month] += calculateRewardPoints(transaction.amount);
  });

  return (
    <>
      <MonthlyRewards rewards={rewards} customerName={customerName} />
    </>
  );
};

CustomerRewards.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  })).isRequired,
  customerName: PropTypes.string.isRequired,
};

export default CustomerRewards;