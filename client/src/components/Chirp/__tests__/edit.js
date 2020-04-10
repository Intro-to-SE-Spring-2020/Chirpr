import React from 'react';
import { fireEvent, cleanup, wait } from '@testing-library/react';
import mockAxios from 'axios';
import { renderWithRedux } from '../../../lib/test-utils'
import Chirp from "../Chrip"

afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('Edit React-Redux Component', () => {
    let spy;
    
    afterEach(() => {
        cleanup
        mockAxios.mockClear();
    });

    const setup = (state = null) => {
        spy = jest.spyOn(mockAxios, "post");

        // fake chirp info to send to mocked API request
        const user = { fakeChirp: 'testChirp'};
        const component = renderWithRedux(<Chirp/>, { initialState: state });
        const {getByTestId, store } = component;

        // get chirp button fields
        const updateButton = getByTestId("update-button");
        const cancelButton = getByTestId("cancel-button");
        const editButton = getByTestId("edit-button");

        
        // ? Chirp Input Box ?
        const chirpContent = getByTestIdText("chirpContent");
        const changeChirpInput = value =>
            fireEvent.change(chirpContent, {target: {value}});
       // set functions for changing input fields
        const clickUpdate = () => fireEvent.click(updateButton);
        const clickCancel = () => fireEvent.click(cancelButton);
        const clickEdit = () => fireEvent.click(editButton);

        return {
          ...component,
          store, // mocked redux store
          user, // fake user object
          clickEdit, // handler for submit button click
          clickCancel,
          clickUpdate,
          changeChirpInput,
      }
  }

  // TEST CASE 1: Chrip Edited and edited Successfully 

  test('chirp updated to match new chirp', async () => {
    // intercept network POST requests for registration
    mockAxios.post.mockImplementationOnce(() => 
        Promise.resolve({ status: 200, data: { msg: "Chirp Updated!" }}),
    );
    // call setup to render Registration component
    const component = setup();
    // destructure attributes from component
    const {
      store, // mocked redux store
      user, // fake user object
      clickEdit, // handler for button clicks
      clickCancel,
      clickEdit,
      changeChirpInput,} = component;
    const { fakeChirp, newFakeChirp } = user;

    // expect the update and cancel to be disabled as the edited button isnt enabled.
    expect(updateButton).toBeDisabled();
    expect(cancelButton).toBeDisabled();

    expect(clickEdit).toHaveBeenCalled();

    // Since the edit button has been clicked the update and cancel buttons should be available.
    expect(updateButton).not.toBeDisabled();
    expect(cancelButton).not.toBeDisabled();

    // Set the input chirp to the updated chirp
    changeChirpInput(fakeChirp);

    // check values in registration form are actually set
    expect(chirpContent.value).toBe(fakeChirp);

  

    // SUBMIT FORM DATA *Note: await wait(() => ...)
    // ... asynchronous call because updating
    // does a network request, or in this case
    // ... a mocked network request
    await wait(() => clickUpdate());
    
    // check that the mocked network POST request was called
    // ... using spy variable declared above
    expect(spy).toHaveBeenCalled();
    
    // If you look at 'src/actions/index.js'
    // ... at the register action, you can see all the
    // action types dispatched
    // So declare an expectedActions array to test against
    const expectedActions = [
        { type: 'IS_LOADING', payload: true },
        { type: 'REQUEST_SUCCESS', payload: 'Chirp Updated!' },
        { type: 'IS_LOADING', payload: false },
        { type: 'REDIRECT_STATUS', payload: '/feed' }
    ];

    // test against expectedActions based on logic of
    // ... 'src/actions/index.js' register action creator
    expect(store.getActions()).toEqual(expectedActions);
});







        

})
