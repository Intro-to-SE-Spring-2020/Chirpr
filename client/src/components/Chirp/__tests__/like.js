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

    const unlikeSetup = (state = null) => {
        
        const data = { name:'Keith', username:'@Rwkeith', content:'TEST TWEET', likes:10, retweets:3, time:'', isOwned:true, isLiked:false, isReChirped:false, _id:1 }
        // render component with custom render function
        const component = renderWithRedux(<Chirp data={data}/>, { initialState: state })
        // destructure attributes from component
        const { getByTestId, store  } = component
        const unlikeButton = getByTestId('unlike-button')
        const clickUnlike = () => fireEvent.click(unlikeButton)
        return {
          ...component,
          store, // mocked redux store
          unlikeButton, // unlike button
          clickUnlike // handler for submit button click
        }
      }

    const likeSetup = (state = null) => {
        const data = { name:'Keith', username:'@Rwkeith', content:'TEST TWEET', likes:10, retweets:3, time:'', isOwned:true, isLiked:true, isReChirped:false, _id:1 }
        // render component with custom render function
        const component = renderWithRedux(<Chirp data={data} />, { initialState: state })
        // destructure attributes from component
        const { getByTestId, store  } = component
        const likeButton = getByTestId('like-button')
        const clickLike = () => fireEvent.click(likeButton)
        return {
          ...component,
          store, // mocked redux store
          likeButton,
          clickLike // handler for submit button click
        }
    }
    
      // TEST CASE 1: Clicking the like button gives correct feedback
      test('The chirp has been liked', async () => {
        // setup Chirp component
        const unlikeComponent = unlikeSetup()
        // destructure attributes from component
        const {
          unlikeButton,
          clickUnlike
        } = unlikeComponent

        expect(unlikeButton).toBeVisible()
        
      })

      test("The chirp has not been liked", async () => {
        const likeComponent = likeSetup()

        const {
          likeButton,
        } = likeComponent

        expect(likeButton).toBeVisible()
      })
})
