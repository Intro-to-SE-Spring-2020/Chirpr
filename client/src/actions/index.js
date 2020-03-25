import {
    LOGIN,
    LOGOUT,
    REGISTER,
    IS_LOADING
} from './types'
import ApiClient from '../lib/api/ApiClient'

// Action creators

export const login = ({ email, password }) => async (dispatch, getState) => {
    
    try {
        dispatch({ type: IS_LOADING, payload: true });
    
        const response = await ApiClient.post('/signin', { email, password });
    
        if (response.status !== 200) {
            dispatch({
                type: REQUEST_ERROR,
                payload: {
                    msg: response.data.msg,
                    status: response.status
                }
            });
        } else {
            dispatch({ type: LOGIN, payload: response });
        }

        dispatch({ type: IS_LOADING, payload: false });

    } catch (error) {
        dispatch({ type: REQUEST_ERROR, payload: error });
    }
}
