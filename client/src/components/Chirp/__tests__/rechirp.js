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

    const unChirpSetup = (state = null) => {
        
        const data = { name:'Keith', username:'@Rwkeith', content:'TEST TWEET', likes:10, retweets:3, time:'', isOwned:true, isLiked:false, isReChirped:false, _id:1 }
        // render component with custom render function
        const component = renderWithRedux(<Chirp data={data}/>, { initialState: state })
        // destructure attributes from component
        const { getByTestId, store  } = component
        const unChirpButton = getByTestId('unchirp-button')
        return {
          ...component,
          store, // mocked redux store
          unChirpButton, // submit button on form
        }
      }

    const reChirpSetup = (state = null) => {
        
        const data = { name:'Keith', username:'@Rwkeith', content:'TEST TWEET', likes:10, retweets:3, time:'', isOwned:true, isLiked:false, isReChirped:true, _id:1 }
        // render component with custom render function
        const component = renderWithRedux(<Chirp data={data}/>, { initialState: state })
        // destructure attributes from component
        const { getByTestId, store  } = component
        const reChirpButton = getByTestId('rechirp-button')
        //const clickLike = () => fireEvent.click(unChirpButton)
        return {
          ...component,
          store, // mocked redux store
          reChirpButton, // submit button on form
          //clickLike // handler for submit button click
        }
      }
    
      // TEST CASE 1: UnChirpbutton
      test('user sees unchirp button', async () => {
        // setup Chirp component
        const component = unChirpSetup()
        // destructure attributes from component
        const {
          store,
          unChirpButton,
          //clickLike
        } = component

        expect(unChirpButton).toBeVisible()
      })

      //TEST CASE 2: ReChirp Button
      test('user sees reChirp button', async () => {
        // setup Chirp component
        const component = reChirpSetup()
        // destructure attributes from component
        const {
          store,
          reChirpButton,
          //clickLike
        } = component

        expect(reChirpButton).toBeVisible()
      })

})
