import React from 'react';
import { fireEvent, cleanup, wait, getByTestId } from '@testing-library/react';
import mockAxios from 'axios';
import { renderWithRedux } from '../../../lib/test-utils'
import ChirpInputForm from '../ChirpInputForm'


afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('Edit React-Redux Component', () => {
    let spy;
    
    afterEach(() => {
        cleanup
        mockAxios.mockClear();
    });

    const setupCreateChirp = (state = null) => {

        // fake chirp info
        const data = { fakeChirpInput: 'TEST TWEET' }
        const component = renderWithRedux(<ChirpInputForm data={data} />, { initialState: state });
        const {getByTestId } = component;

        // get chirp button fields and input
        const chirpInput = await wait(getByTestId("chirp-input"));
        const chirpButton = getByTestId("share-chirp-button");
        
        const clickChirp = () => fireEvent.click(chirpButton);

        return {
          ...component,
          chirpInput,
          chirpButton,
          clickChirp,
      }
  }

  // TEST CASE 1: Create chirp button has been pressed and the chirp has been succesfully created.
  test('Create chirp must be working', async () => {

    const component = setupCreateChirp();

    const {
        chirpInput,
        chirpButton,
        clickChirp,
      } = component;

      expect(chirpButton).toBeTruthy();
      expect(chirpInput).toBeTruthy();
      expect(chirpInput.value).toBe("TEST TWEET");
      clickChirp();

    })
    })