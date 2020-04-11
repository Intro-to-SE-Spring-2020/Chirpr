import React from 'react'
import { render } from '@testing-library/react'
import { withRouter } from 'react-router-dom'
import Landing from './Landing'

test('renders Landing component', () => {
  const renderResult = render(<Landing/>)
  const elem = renderResult.getByTestId('landing')
  expect(elem).not.toBeEmpty()
})

test('renders Landing Welcome', () => {
  const renderResult = render(<Landing/>)
  const elem = renderResult.getByTestId('landing-welcome')
  expect(elem).toHaveTextContent('Welcome to Chirpr!')
})

// test('renders landing HomepageImage component', () => {
//     const renderResult = render(<Landing/>);
//     const elem = renderResult.getByTestId('landing-homepage-image');
//     expect(elem).not.toBeEmpty();
// });
