import React from 'react';
import PropTypes from 'prop-types';
import { Label, Select, InlineContainer } from '../styles';
import { ALL_MONTHS, YEARS, HEADERS } from '../constants';

const Filter = ({ selectedMonth, selectedYear, onMonthChange, onYearChange, customerName, recentMonths }) => {
  return (
    <InlineContainer>
      <Label htmlFor="month-select">{`${HEADERS.MONTH_DETAILS}`}</Label>
      <Select id="month-select" value={selectedMonth} onChange={(e) => onMonthChange(e.target.value)}>
        <option value="RECENT">Recent 3 months</option>
        {ALL_MONTHS.map(month => (
          <option key={month} value={month}>{month}</option>
        ))}
      </Select>
      <Label htmlFor="year-select">Select Year:</Label>
      <Select id="year-select" value={selectedYear} onChange={(e) => onYearChange(e.target.value)}>
        {YEARS.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </Select>
    </InlineContainer>
  );
};

Filter.propTypes = {
  selectedMonth: PropTypes.string.isRequired,
  selectedYear: PropTypes.string.isRequired,
  onMonthChange: PropTypes.func.isRequired,
  onYearChange: PropTypes.func.isRequired,
  customerName: PropTypes.string.isRequired,
  recentMonths: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Filter;