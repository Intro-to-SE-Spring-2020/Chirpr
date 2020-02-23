import React from 'react';
import { render } from '@testing-library/react';
import { withRouter } from 'react-router-dom'
import Landing from './Landing';

test('renders App component', () => {
    const renderResult = render(<Landing/>);
    const elem = renderResult.getByTestId('landing');
    expect(elem).not.toBeEmpty();
});