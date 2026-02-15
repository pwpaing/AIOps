import { render, screen } from '@testing-library/react';
import App from './App';

test('renders monitoring console title', () => {
  render(<App />);
  const titleElement = screen.getByText(/faro monitoring test console/i);
  expect(titleElement).toBeInTheDocument();
});
