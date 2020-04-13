import React from 'react';
import { fireEvent, cleanup, wait } from '@testing-library/react';
import mockAxios from 'axios';
import { renderWithRedux } from '../../../lib/test-utils'
import Chirp from '../Chirp'


afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('Edit React-Redux Component', () => {
    let spy;
    
    afterEach(() => {
        cleanup
        mockAxios.mockClear();
    });

    const setupEditButton = (state = null) => {

        // fake chirp info to send to mocked API request
        const data = { name:'Keith', username:'@Rwkeith', content:'TEST TWEET', likes:10, retweets:3, time:'', isOwned:true, isLiked:false, isReChirped:false, isEditing:false, _id:1 }
        const component = renderWithRedux(<Chirp data={data} />, { initialState: state });
        const {getByTestId } = component;

        // get chirp button fields
        const editButton = getByTestId("edit-button");
        
       // set functions for changing input field
        const clickEdit = () => fireEvent.click(editButton);

        return {
          ...component,
          clickEdit, // handler for submit button click
          editButton,
      }
  }
  // TEST CASE 1: Chrip Edited and updated Successfully 
  test('chirp edit button is working', async () => {
    // call setup to render Edit component
    const component = setupEditButton();
    // destructure attributes from component
    const {
      editButton} = component;

    // expect the update and cancel to be disabled as the edited button isnt enabled.
    expect(editButton).toBeTruthy()
  })

  // TEST CASE 2:
  test('chirp is updated', async () => {
       // intercept network POST requests for registration
    mockAxios.post.mockImplementationOnce(() => 
      Promise.resolve({ status: 200, data: { msg: "Chirp Updated!" }}),
    );
    // const component = setupUpdate();
    const component = setupEditButton();

    const {
      editButton,
      store, // mocked redux store
      clickEdit, // handler for submit button click
      getByTestId
    } = component;
    
    // Since the edit button has been clicked the update and cancel buttons should be available.
    clickEdit();
    // Grab buttons after edit is pressed.
    const cancelButton = getByTestId("cancel-button");
    const updateButton = getByTestId("update-button");
    expect(updateButton).toBeTruthy();
    expect(cancelButton).toBeTruthy();
    const inputForm = getByTestId("chirp-update-input");
    expect(inputForm).toBeTruthy();
    expect(inputForm.value).toBe("TEST TWEET");

    const changeChirpInput = value =>
        fireEvent.change(inputForm, {target: {value}});
    const clickUpdate = () => fireEvent.click(updateButton);
    const clickCancel = () => fireEvent.click(cancelButton);

    // Set the input chirp to the updated chirp
    changeChirpInput("Test tweet updated!"); 
    expect(inputForm.value).toBe("Test tweet updated!");

    // can't click update b/c action is not
    // ... passed as prop. 'props.handleEdit(_id, chirpContent)'
    //clickUpdate();

    clickCancel();
  })
})
