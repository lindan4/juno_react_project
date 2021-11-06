import { render, screen } from '@testing-library/react';
import Main from './Main'
import React from 'react'

test('renders main title', () => {
  render(<Main />);
  const linkElement = screen.getByText(/The Recipe Archive/i);
});
