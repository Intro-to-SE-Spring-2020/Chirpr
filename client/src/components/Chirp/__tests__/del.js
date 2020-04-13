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

    const setupDelete = (state = null) => {

        // fake chirp info to send to mocked API request
        const data = { name:'Keith', username:'@Rwkeith', content:'TEST TWEET', likes:10, retweets:3, time:'', isOwned:true, isLiked:false, isReChirped:false, isEditing:false, _id:1 }
        const component = renderWithRedux(<Chirp data={data} />, { initialState: state });
        const {getByTestId } = component;

        // get chirp button fields
        const deleteButton = getByTestId("delete-button");
        
       // set functions for changing input field
        const clickDelete = () => fireEvent.click(deleteButton);

        return {
          ...component,
          clickDelete, // handler for submit button click
          deleteButton,
      }
  }

  // TEST CASE 1 DELETING  THE CHIRP

test('The deletion of a chirp is working', async () => {

    mockAxios.post.mockImplementationOnce(() => 
      Promise.resolve({ status: 200, data: { msg: "Chirp Deleted!" }}),
    );
    const component = setupDelete();
    const {
        store,
        clickDelete,
        deleteButton} = component;

        expect(deleteButton).not.toBeDisabled();
        expect(deleteButton).toBeVisible();



})
  })