import { render, screen } from '@testing-library/react';
import App from './App.jsx';

test('renders App component', () => {
  render(<App />);
  const linkElement = screen.getByText(/App Component/i);
  expect(linkElement).toBeInTheDocument();
});
