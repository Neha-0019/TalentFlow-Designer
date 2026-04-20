import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders workflow designer title', () => {
    render(<App />);
    expect(screen.getByText('HR Workflow Designer')).toBeInTheDocument();
  });
});
