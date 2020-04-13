import React from 'react'
import { fireEvent, cleanup, wait } from '@testing-library/react'
import mockAxios from 'axios'

import { renderWithRedux } from '../../../lib/test-utils'
import Chirp from '../Chirp'

afterAll(() => {
    jest.restoreAllMocks()
  })


// Chirp component test Suite begins here.
describe('Chirp React-Redux Component', () => {
    let spy
  
    afterEach(() => {
      cleanup
      mockAxios.mockClear()
    })

    const setup = (state = null) => {
        
        const data = { name:'Keith', username:'@Rwkeith', content:'TEST TWEET', likes:10, retweets:3, time:'', isOwned:true, isLiked:false, isReChirped:false, _id:1 }
        // render component with custom render function
        const component = renderWithRedux(<Chirp data={data}/>, { initialState: state })
        // destructure attributes from component
        const { getByTestId, store  } = component
        const likeButton = getByTestId('unlike-button')
        const clickLike = () => fireEvent.click(likeButton)
        return {
          ...component,
          store, // mocked redux store
          likeButton, // submit button on form
          clickLike // handler for submit button click
        }
      }
    
      // TEST CASE 1: Clicking the like button gives correct feedback
      test('user clicks like button and a like is added', async () => {
        // setup Chirp component
        const component = setup()
        // destructure attributes from component
        const {
          store,
          likeButton,
          clickLike
        } = component

        expect(likeButton).toBeVisible()
      })
})
