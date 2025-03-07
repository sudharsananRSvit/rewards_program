import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  font-family: 'Arial', sans-serif;
  max-width: 800px;
  margin: 0 auto;
  background-color:rgb(249, 242, 247);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 40px;
  font-size: 32px;
  font-weight: bold;
`;

export const Section = styled.section`
  margin-bottom: 20px;
  padding: 20px;
  background-color: rgb(243, 248, 249);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(248, 9, 9, 0.1);
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
`;

export const SmallSection = styled(Section)`
  flex: 1;
  max-width: 300px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #004494;
    transform: translateY(0);
  }
`;

export const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const Label = styled.label`
  margin-right: 10px;
  font-size: 16px;
  color: #333;
  display: block;
  margin-bottom: 10px;
`;