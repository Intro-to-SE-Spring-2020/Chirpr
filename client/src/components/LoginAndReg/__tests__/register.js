import React from 'react';
import { fireEvent, cleanup, wait } from '@testing-library/react';
import mockAxios from 'axios';

import { renderWithRedux } from '../../../lib/test-utils'
import Registration from "../Registration"

afterAll(() => {
  jest.restoreAllMocks();
});

describe('Registration React-Redux Component', () => {
    let spy;
    
    afterEach(() => {
        cleanup
        mockAxios.mockClear();
    });
    
    const setup = () => {
        // set to check if network POST request was
        // ... executed/intercepted
        spy = jest.spyOn(mockAxios, "post");
        
        // fake user info to send to mocked API request
        const user = { fakeEmail: 'testcase@chirpr.com', fakePassword: 'testcase', fakePassword1: 'testcase' };
        // render component with custom render function
        const component = renderWithRedux(<Registration/>);
        // destructure attributes from component
        const { getByLabelText, getByTestId, store } = component;
        
        // get registration form input fields
        const email = getByLabelText("Email");
        const password = getByLabelText("Password");
        const password1 = getByLabelText("Confirm Password");
        const submitButton = getByTestId("submit-button");
        // set functions for changing input fields
        const changeEmailInput = value =>
            fireEvent.change(email, {target: {value}});
        const changePasswordInput = value =>
            fireEvent.change(password, {target: {value}});
        const changeConfirmPasswordInput = value =>
            fireEvent.change(password1, {target: {value}});
        const clickSubmit = () => fireEvent.click(submitButton);
        
        return {
            ...component,
            store, // mocked redux store
            user, // fake user object
            email, // email field
            password, // password field
            password1, // confirm password field
            submitButton, // submit button on form
            changeEmailInput, // change handler for email
            changePasswordInput, // change handler for email
            changeConfirmPasswordInput, // change handler for email
            clickSubmit // handler for submit button click
        }
    }
    
    // TEST CASE: Successful registration
    test('registers user with valid email and valid password', async () => {
        // intercept network POST requests for registration
        mockAxios.post.mockImplementationOnce(() => 
            Promise.resolve({ status: 200, data: { msg: "Registration successful!" }}),
        );
        // call setup to render Registration component
        const component = setup();
        // destructure attributes from component
        const {
            store,
            user,
            email,
            password,
            password1,
            submitButton,
            changeEmailInput,
            changePasswordInput,
            changeConfirmPasswordInput,
            clickSubmit } = component;
        const { fakeEmail, fakePassword, fakePassword1 } = user;

        // expect the submit button to be disabled
        expect(submitButton).toBeDisabled();

        // set email, password, and confirm password field
        // ... on registration form
        changeEmailInput(fakeEmail);
        changePasswordInput(fakePassword);
        changeConfirmPasswordInput(fakePassword1);

        // expect the submit button to be enabled
        // ... since the password fields match
        expect(submitButton).not.toBeDisabled();

        // check values in registration form are actually set
        expect(email.value).toBe(fakeEmail);
        expect(password.value).toBe(fakePassword);
        expect(password1.value).toBe(fakePassword1);

        // SUBMIT FORM DATA *Note: await wait(() => ...)
        // ... asynchronous call because registration
        // does a network request, or in this case
        // ... a mocked network request
        await wait(() => clickSubmit());
        
        // check that the mocked network POST request was called
        // ... using spy variable declared above
        expect(spy).toHaveBeenCalled();
        
        // If you look at 'src/actions/index.js'
        // ... at the register action, you can see all the
        // action types dispatched
        // So declare an expectedActions array to test against
        const expectedActions = [
            { type: 'IS_LOADING', payload: true },
            { type: 'REQUEST_SUCCESS', payload: 'Registration successful!' },
            { type: 'IS_LOADING', payload: false },
            { type: 'REDIRECT_STATUS', payload: '/login' }
        ];

        // test against expectedActions based on logic of
        // ... 'src/actions/index.js' register action creator
        expect(store.getActions()).toEqual(expectedActions);
    });

    // TEST CASE: Invalid registration
    test('register user with email already in use and valid password', async () => {
        // intercept network POST request
        // ... NOTE the Promise.reject portion
        // ... and how the response is structured
        // ... This is how the API would reject the request
        mockAxios.post.mockImplementationOnce(() => 
            Promise.reject({
                status: 400,
                response: {
                    data: { error: "Registration Error: Email already exists" }
                }
            })
        );
        // setup Registration component
        const component = setup();
        // destructure attributes from component
        const {
            store,
            user,
            email,
            password,
            password1,
            submitButton,
            changeEmailInput,
            changePasswordInput,
            changeConfirmPasswordInput,
            clickSubmit } = component;
        const { fakeEmail, fakePassword, fakePassword1 } = user;

        // expect the submit button to be disabled
        expect(submitButton).toBeDisabled();

        // set email, password, and confirm password field
        // ... on registration form
        changeEmailInput(fakeEmail); // we act like this email is already in use in this test
        changePasswordInput(fakePassword);
        changeConfirmPasswordInput(fakePassword1);

        // expect the submit button to be enabled
        // ... since the password fields match
        expect(submitButton).not.toBeDisabled();

        // check values in registration form are actually set
        expect(email.value).toBe(fakeEmail);
        expect(password.value).toBe(fakePassword);
        expect(password1.value).toBe(fakePassword1);

        // Click submit button
        await wait(() => clickSubmit());

        // check that network request was intercepted/executed
        expect(spy).toHaveBeenCalled();
        
        // Following the action creator 'register' in
        // ... 'src/actions/index.js', the expected actions are
        const expectedActions = [
            { type: 'IS_LOADING', payload: true },
            {
              type: 'REQUEST_ERROR',
              payload: { error: 'Registration Error: Email already exists' }
            },
            { type: 'IS_LOADING', payload: false },
            { type: 'REDIRECT_STATUS', payload: '/register' }      
        ];

        // Test that these actions were dispatched
        expect(store.getActions()).toEqual(expectedActions);
    });

  });