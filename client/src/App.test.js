import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders App component', () => {
    const renderResult = render(<App/>);
    const elem = renderResult.getByTestId('app');
    expect(elem).not.toBeEmpty();
});