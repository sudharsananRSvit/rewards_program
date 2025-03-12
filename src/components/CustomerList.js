import React from 'react';
import PropTypes from 'prop-types';

const CustomerList = ({ customers }) => {
  return (
    <ul>
      {customers?.map(customer => (
        <li key={customer.customerId}>
          {customer.name} (Customer ID: {customer.customerId})
        </li>
      ))}
    </ul>
  );
};

CustomerList.propTypes = {
  customers: PropTypes.arrayOf(PropTypes.shape({
    customerId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default CustomerList;