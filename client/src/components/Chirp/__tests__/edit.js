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

  const setupUpdate = async (state = null) => {

    // fake chirp info to send to mocked API request
    const data = { name:'Keith', username:'@Rwkeith', content:'TEST TWEET', fakeNewContent:'NEW TEST TWEET', likes:10, retweets:3, time:'', isOwned:true, isLiked:false, isReChirped:false, isEditing:true, _id:1 }
    const component = renderWithRedux(<Chirp data={data} />, { initialState: state});
    const {getByTestId, store } = component;

    // get chirp button fields
    const editButton = getByTestId("edit-button");
    const cancelButton = await wait(() => getByTestId("cancel-button"));
    const updateButton = await wait(() => getByTestId("update-button"));
    
    //  Chirp Input Box 
    const changeChirpInput = value =>
        fireEvent.change(content, {target: {value}});
   // set functions for changing input fields
    const clickUpdate = () => fireEvent.click(updateButton);
    const clickCancel = () => fireEvent.click(cancelButton);
    const clickEdit = () => fireEvent.click(editButton);

    return {
      ...component,
      store, // mocked redux store
      clickEdit, // handler for submit button click
      clickCancel,
      clickUpdate,
      changeChirpInput,
      updateButton,
      cancelButton,
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

    expect(editButton).toBeVisible()
    expect(editButton).not.toBeDisabled()
    })

    test('chirp is updated', async () => {
       // intercept network POST requests for registration
    mockAxios.post.mockImplementationOnce(() => 
      Promise.resolve({ status: 200, data: { msg: "Chirp Updated!" }}),
    );
    const component = setupUpdate();

    const {
      editButton,
      store, // mocked redux store
      clickEdit, // handler for submit button click
      clickCancel,
      clickUpdate,
      changeChirpInput,
      updateButton,
      cancelButton} = component;
    
    // Since the edit button has been clicked the update and cancel buttons should be available.
    expect(updateButton).not.toBeDisabled();
    expect(cancelButton).not.toBeDisabled();
    expect(cancelButton).not.toBeVisible();
    expect(updateButton).not.toBeVisible();

    // Set the input chirp to the updated chirp
    changeChirpInput(fakeNewContent);
   
})



})
