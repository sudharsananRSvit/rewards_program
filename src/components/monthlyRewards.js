import React from 'react';
import PropTypes from 'prop-types';
import { MONTH_NAMES, HEADERS } from '../constants';

const MonthlyRewards = ({ rewards, customerName }) => {
  return (
    <div>
      <h3>{`${HEADERS.MONTHLY_REWARDS} Customer ${customerName}`}</h3>
      <ul>
        {rewards.map((reward, index) => (
          reward > 0 && (
            <li key={index}>
              {MONTH_NAMES[index]}: {reward} points
            </li>
          )
        ))}
      </ul>
    </div>
  );
};

MonthlyRewards.propTypes = {
  rewards: PropTypes.arrayOf(PropTypes.number).isRequired,
  customerName: PropTypes.string.isRequired,
};

export default MonthlyRewards;