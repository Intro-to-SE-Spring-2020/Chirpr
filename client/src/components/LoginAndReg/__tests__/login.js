import React from 'react'
import { fireEvent, cleanup, wait } from '@testing-library/react'
import mockAxios from 'axios'

import { renderWithRedux } from '../../../lib/test-utils'
import Login from '../Login'

afterAll(() => {
  jest.restoreAllMocks()
})

describe('Login React-Redux Component', () => {
  let spy

  afterEach(() => {
    cleanup
    mockAxios.mockClear()
  })

  const setup = (state = null) => {
    // set to check if network POST request was
    // ... executed/intercepted
    spy = jest.spyOn(mockAxios, 'post')

    // fake user info to send to mocked API request
    const user = { fakeEmail: 'testcase@chirpr.com', fakePassword: 'testcase' }
    // render component with custom render function
    const component = renderWithRedux(<Login/>, { initialState: state })
    // destructure attributes from component
    const { getByLabelText, getByTestId, store } = component

    // get login form input fields
    const email = getByLabelText('Email')
    const password = getByLabelText('Password')
    const submitButton = getByTestId('submit-button')
    // set functions for changing input fields
    const changeEmailInput = value =>
      fireEvent.change(email, { target: { value } })
    const changePasswordInput = value =>
      fireEvent.change(password, { target: { value } })
    const clickSubmit = () => fireEvent.click(submitButton)

    return {
      ...component,
      store, // mocked redux store
      user, // fake user object
      email, // email field
      password, // password field
      submitButton, // submit button on form
      changeEmailInput, // change handler for email
      changePasswordInput, // change handler for email
      clickSubmit // handler for submit button click
    }
  }

  // TEST CASE 1: Successful login WITHOUT profile
  test('login with valid email, valid password, and WITHOUT a profile', async () => {
    // intercept network POST requests for login API request
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        data: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
          profile: null
        }
      })
    )

    // setup Login component
    const component = setup()
    // destructure attributes from component
    const {
      store,
      user,
      email,
      password,
      submitButton,
      changeEmailInput,
      changePasswordInput,
      clickSubmit
    } = component
    const { fakeEmail, fakePassword } = user

    // expect the submit button to be disabled
    expect(submitButton).toBeDisabled()

    // set email, password, and confirm password field
    // ... on login form
    changeEmailInput(fakeEmail)
    changePasswordInput(fakePassword)

    // expect the submit button to be enabled
    // ... since the password fields match
    expect(submitButton).not.toBeDisabled()

    // check values in login form are actually set
    expect(email.value).toBe(fakeEmail)
    expect(password.value).toBe(fakePassword)

    // User Submits Form
    await wait(() => clickSubmit())

    // check that the mocked network POST request was called
    // ... using spy variable declared above
    expect(spy).toHaveBeenCalled()

    const expectedActions = [
      { type: 'IS_LOADING', payload: true },
      {
        type: 'LOGIN',
        payload: {
          data: {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
            profile: null
          }
        }
      },
      { type: 'IS_LOADING', payload: false },
      { type: 'REDIRECT_STATUS', payload: '/change-profile' },
      { type: 'REQUEST_SUCCESS', payload: { msg: 'Login success!' } }
    ]

    // check individual parts of actions
    const actions = store.getActions()
    // check first action
    expect(actions[0]).toEqual(expectedActions[0])

    // check section action piece by piece
    // ... b/c Date is set before actions can be checked
    expect(actions[1].type).toBe('LOGIN')
    expect(actions[1].payload.data).toEqual(expectedActions[1].payload.data)

    // check that expiry is set and is not undefined
    expect(actions[1].payload.expiry).toBeDefined()

    // check last two actions
    expect(actions[2]).toEqual(expectedActions[2])
    expect(actions[3]).toEqual(expectedActions[3])
    expect(actions[4]).toEqual(expectedActions[4])
  })

  // TEST CASE 2: Successful login WITh profile
  test('login with valid email, valid password, and WITH a profile', async () => {
    // intercept network POST requests for login API request
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        data: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
          profile: {
            _id: '7863Djkd833dkf',
            first_name: 'test',
            last_name: 'case',
            username: 'testcase',
            bio: 'This is a test case user'
          }
        }
      })
    )

    // setup Login component
    const component = setup()
    // destructure attributes from component
    const {
      store,
      user,
      email,
      password,
      submitButton,
      changeEmailInput,
      changePasswordInput,
      clickSubmit
    } = component
    const { fakeEmail, fakePassword } = user

    // expect the submit button to be disabled
    expect(submitButton).toBeDisabled()

    // set email, password, and confirm password field
    // ... on login form
    changeEmailInput(fakeEmail)
    changePasswordInput(fakePassword)

    // expect the submit button to be enabled
    // ... since the password fields match
    expect(submitButton).not.toBeDisabled()

    // check values in login form are actually set
    expect(email.value).toBe(fakeEmail)
    expect(password.value).toBe(fakePassword)

    // User Submits Form
    await wait(() => clickSubmit())

    // check that the mocked network POST request was called
    // ... using spy variable declared above
    expect(spy).toHaveBeenCalled()

    const expectedActions = [
      { type: 'IS_LOADING', payload: true },
      {
        type: 'LOGIN',
        payload: {
          data: {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
            profile: {
              _id: '7863Djkd833dkf',
              first_name: 'test',
              last_name: 'case',
              username: 'testcase',
              bio: 'This is a test case user'
            }
          }
        }
      },
      { type: 'IS_LOADING', payload: false },
      { type: 'REDIRECT_STATUS', payload: '/feed' }, // redirect to feed instead
      { type: 'REQUEST_SUCCESS', payload: { msg: 'Login success!' } }
    ]

    // check individual parts of actions
    const actions = store.getActions()

    // check first action
    expect(actions[0]).toEqual(expectedActions[0])

    // check section action piece by piece
    // ... b/c Date is set before actions can be checked
    expect(actions[1].type).toBe('LOGIN')
    expect(actions[1].payload.data).toEqual(expectedActions[1].payload.data)

    // check that expiry is set and is not undefined
    expect(actions[1].payload.expiry).toBeDefined()

    // check last two actions
    expect(actions[2]).toEqual(expectedActions[2])
    expect(actions[3]).toEqual(expectedActions[3])
  })

  // TEST CASE 3: Invalid login
  test('login with valid email and wrong password', async () => {
    // intercept network POST requests for login API request
    mockAxios.post.mockImplementationOnce(() =>
      Promise.reject({
        status: 400,
        response: {
          data: { error: 'Email and password do not match' }
        }
      })
    )

    // setup Login component
    const component = setup()
    // destructure attributes from component
    const {
      store,
      user,
      email,
      password,
      submitButton,
      changeEmailInput,
      changePasswordInput,
      clickSubmit
    } = component
    const { fakeEmail, fakePassword } = user

    // expect the submit button to be disabled
    expect(submitButton).toBeDisabled()

    // set email, password, and confirm password field
    // ... on login form
    changeEmailInput(fakeEmail)
    changePasswordInput(fakePassword)

    // expect the submit button to be enabled
    // ... since the password fields match
    expect(submitButton).not.toBeDisabled()

    // check values in login form are actually set
    expect(email.value).toBe(fakeEmail)
    expect(password.value).toBe(fakePassword)

    // User Submits Form
    await wait(() => clickSubmit())

    // check that the mocked network POST request was called
    // ... using spy variable declared above
    expect(spy).toHaveBeenCalled()

    const expectedActions = [
      { type: 'IS_LOADING', payload: true },
      {
        type: 'REQUEST_ERROR',
        payload: { error: 'Email and password do not match' }
      },
      { type: 'IS_LOADING', payload: false }
    ]

    // check individual parts of actions
    const actions = store.getActions()
    expect(actions).toEqual(expectedActions)
  })

  // TEST CASE 4: Invalid Request Error when component mounts
  // ... This would happen when a user tries to login
  // ... with invalid credentials.
  test('display request error after logging in with invalid credentials', () => {
    // Set initial state to reproduce user
    // ... inputting an email already in use
    // ... useEffect will be triggered to display
    // .. alert message to user
    const initialState = {
      network: {
        request_error: {
          error: 'Email and password do not match'
        }
      }
    }

    /*
            NOTE: User input is not necessary b/c
                  if a user inputs invalid credentials,
                  the component will be re-rendered with
                  above initial state
        */

    // setup with initial state
    const component = setup(initialState)

    // grab alert message on screen
    const alert = component.getByTestId('alert-error')

    // check that the message shown to user
    // ... is the network request error message
    expect(alert.textContent).toEqual(initialState.network.request_error.error)
  })
})
