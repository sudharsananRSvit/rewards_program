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
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #f1f1f1;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #e0e0e0;
    transform: translateY(0);
  }
`;

const CustomerList = ({ customers, onSelectCustomer }) => {
  return (
    <Container>
      <Title>Customers</Title>
      <List>
        {customers.map(customer => (
          <ListItem key={customer.customerId} onClick={() => onSelectCustomer(customer.customerId)}>
            Customer {customer.customerId}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

CustomerList.propTypes = {
  customers: PropTypes.array.isRequired,
  onSelectCustomer: PropTypes.func.isRequired,
};

export default CustomerList;