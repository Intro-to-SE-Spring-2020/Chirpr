import React from 'react'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { createBrowserHistory } from 'history'

import checkTokenExpiryMiddleware from '../checkTokenExiryMiddleware'

const mockStore = (state) => configureStore([checkTokenExpiryMiddleware, thunk])(state);

export function renderWithRedux (
  ui,
  { initialState = null,
    store = mockStore(() => initialState !== null ? initialState : (
      { 
        auth: {
          token: null,
          expiry: null,
          profile: null,
          redirect: "/"
        },
        network: {
          is_loading: false,
          request_error: null
        },
        chirps: []
      }
    ))
  } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store
  }
}

export function renderWithRouter (
  ui,
  {
    route = '/',
    history = createBrowserHistory({ initialEntries: [route] })
  } = {}
) {
  const Wrapper = ({ children }) => (
    <Router history={history}>{children}</Router>
  )
  return {
    ...render(ui, { wrapper: Wrapper }),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history
  }
}

export function renderWithReduxRouter (
  ui,
  {
    initialState = null,
    store = mockStore(() => initialState !== null ? initialState : (
      { 
        auth: {
          token: null,
          expiry: null,
          profile: null,
          redirect: "/"
        },
        network: {
          is_loading: false,
          request_error: null
        },
        chirps: []
      }
    )),
    route = '/',
    history = createBrowserHistory({ initialEntries: [route] })
  } = {}
) {
  const Wrapper = ({ children }) => (
    <Router history={history}>{children}</Router>
  )
  return {
    ...render(<Provider store={store}>{ui}</Provider>, { wrapper: Wrapper }),
    store,
    history
  }
}