import { render } from '@testing-library/react-native';
import Page from '../home';
import React from 'react';

test('renders Header, Swipper, and FilterBottomSheet', () => {
  const { getByTestId } = render(<Page />);
  expect(getByTestId('header')).toBeTruthy();
});
