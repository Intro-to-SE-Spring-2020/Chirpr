import {
    LOGIN,
    LOGOUT,
    REGISTER,
    IS_LOADING,
    REQUEST_ERROR
} from './types'
import ApiClient from '../lib/api/ApiClient'

// Action creators

export const login = (email, password) => async (dispatch, getState) => {
    
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
            // set token/expiry in local storage
            localStorage.setItem('token', response.data.token);
            const expireDate = new Date();
            expireDate.setMinutes(expireDate.getMinutes() + 119);
            localStorage.setItem('expiry', expireDate);
            // login user, saving user profile to store
            dispatch({ type: LOGIN, payload: response.data.profile });
        }

        dispatch({ type: IS_LOADING, payload: false });

    } catch (error) {
        dispatch({ type: REQUEST_ERROR, payload: error });
    }
}
