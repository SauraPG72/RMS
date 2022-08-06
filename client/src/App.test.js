import { render, screen } from '@testing-library/react';

import {About} from './App'

test('renders learn react link', () => {
  render(<About />);
  const imgDiv = screen.getByTestId('custom-element2');
  expect(imgDiv).toHaveAttribute('alt', 'logo')

});
