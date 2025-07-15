import App from '@/App';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('App', () => {
  it('Should render App component', () => {
    render(<App />);

    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
  });
});
