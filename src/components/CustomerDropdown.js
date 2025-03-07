import React from 'react';
import PropTypes from 'prop-types';
import { Select } from '../styles';

const CustomerDropdown = ({ customers, onSelectCustomer }) => {
  return (
    <Select onChange={(e) => onSelectCustomer(Number(e.target.value))}>
      <option value="">Select a customer</option>
      {customers.map(customer => (
        <option key={customer.customerId} value={customer.customerId}>
          Customer {customer.customerId}
        </option>
      ))}
    </Select>
  );
};

CustomerDropdown.propTypes = {
  customers: PropTypes.array.isRequired,
  onSelectCustomer: PropTypes.func.isRequired,
};

export default CustomerDropdown;