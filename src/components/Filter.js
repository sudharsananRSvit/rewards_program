import React from 'react';
import PropTypes from 'prop-types';
import { Container, Label, Select } from '../styles';

const Filter = ({ months, selectedMonth, onMonthChange }) => {
  return (
    <Container>
      <Label htmlFor="month-select">Select Month:</Label>
      <Select id="month-select" value={selectedMonth} onChange={(e) => onMonthChange(e.target.value)}>
        <option value="ALL">ALL</option>
        {months.map(month => (
          <option key={month} value={month}>{month}</option>
        ))}
      </Select>
    </Container>
  );
};

Filter.propTypes = {
  months: PropTypes.array.isRequired,
  selectedMonth: PropTypes.string.isRequired,
  onMonthChange: PropTypes.func.isRequired,
};

export default Filter;