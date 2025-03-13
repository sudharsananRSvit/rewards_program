import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Rewards Program header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Rewards Program/i);
  expect(headerElement).toBeInTheDocument();
});