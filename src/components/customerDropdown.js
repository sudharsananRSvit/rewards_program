import React from 'react';
import PropTypes from 'prop-types';
import { Select, Label } from '../styles';

const CustomerDropdown = ({ customers = [], onSelectCustomer }) => {
  const handleChange = (e) => {
    const value = e.target.value;
    onSelectCustomer(value ? Number(value) : '');
    
  };

  return (
    <div>
      <Label htmlFor="customer-select">Customer</Label>
      <Select id="customer-select" onChange={handleChange}>
        <option value="">Select a customer</option>
        {customers?.map(customer => (
          <option key={customer.customerId} value={customer.customerId}>
            Customer {customer.customerId}
          </option>
        ))}
      </Select>
    </div>
  );
};

CustomerDropdown.propTypes = {
  customers: PropTypes.arrayOf(PropTypes.shape({
    customerId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  onSelectCustomer: PropTypes.func.isRequired,
};

export default CustomerDropdown;