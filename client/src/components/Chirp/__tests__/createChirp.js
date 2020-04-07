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