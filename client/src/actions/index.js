import {
    LOGIN,
    LOGOUT,
    REGISTER,
    GET_USER_PROFILE,
    IS_LOADING,
    REQUEST_ERROR,
    REDIRECT_STATUS
} from './types'
import { persistor } from '../configureStore'
import ApiClient from '../lib/api/ApiClient'

// Action creators

export const login = (email, password) => async (dispatch) => {
    
    try {
        dispatch({ type: IS_LOADING, payload: true });
    
        const response = await ApiClient.post('/signin', { email, password });
    
        if (response.status !== 200) {
            dispatch({
                type: REQUEST_ERROR,
                payload: {
                    error: response.data.error,
                    status: response.status
                }
            });
        } else {
            // set token/expiry
            const expireDate = new Date();
            expireDate.setMinutes(expireDate.getMinutes() + 119);
            // login user, saving user profile to store
            dispatch({
                type: LOGIN, 
                payload: {
                    data: response.data,
                    expiry: expireDate
                }
            });
        }

        dispatch({ type: IS_LOADING, payload: false });

        if (response.data.profile !== null && response.data.profile._id) dispatch({ type: REDIRECT_STATUS, payload: '/feed' })
        else dispatch({ type: REDIRECT_STATUS, payload: '/change-profile' })

    } catch (error) {
        dispatch({ type: REQUEST_ERROR,
            payload: {
                error: error.response.data.error,
                status: error.response.status
            }
        });
    }
}

export const logout = () => async (dispatch) => {
   try {

    dispatch({ type: IS_LOADING, payload: true });
    await persistor.purge();

    dispatch({ type: LOGOUT });

    dispatch({ type: IS_LOADING, payload: false });

    dispatch({ type: REDIRECT_STATUS, payload: '/login' })

   } catch (error) {
        dispatch({ type: REQUEST_ERROR,
            payload: {
                error: error.response.data.error,
                status: error.response.status
            }
        });
    }
}

export const register = (email, password) => async (dispatch) => {
    try {

        dispatch({ type: IS_LOADING, payload: true });

        const response = await ApiClient.post('/signup', { email, password });

        if (response.status !== 200) {
            dispatch({
                type: REQUEST_ERROR,
                payload: {
                    error: response.data.error,
                    status: response.status
                }
            });
            dispatch({ type: IS_LOADING, payload: false });

            dispatch({ type: REDIRECT_STATUS, payload: '/register' })
        } else {
            // success
            dispatch({ type: REGISTER, payload: response.data.error });

            dispatch({ type: IS_LOADING, payload: false });

            dispatch({ type: REDIRECT_STATUS, payload: '/login' })
        }

    } catch (error) {
        dispatch({ type: REQUEST_ERROR,
            payload: {
                error: error.response.data.error,
                status: error.response.status
            }
        });
        dispatch({ type: IS_LOADING, payload: false });

        dispatch({ type: REDIRECT_STATUS, payload: '/register' })
    }
}

export const getUserProfile = () => async (dispatch, getState) => {

    try {
        const currState = getState();
        const response = await ApiClient.get(
            '/user/profile',
            {
                headers: { 'x-auth-token': currState.auth.token }
            }
        );

        if (response.status !== 200) {
            dispatch({
                type: REQUEST_ERROR,
                payload: {
                    error: response.data.error,
                    status: response.status
                }
            });
        } else {
            dispatch({ type: GET_USER_PROFILE, payload: response.data });
        }

        dispatch({ type: IS_LOADING, payload: false });

    } catch (error) {
        dispatch({ type: REQUEST_ERROR,
            payload: {
                error: error.response.data.error,
                status: error.response.status
            }
        });
    }
}

export const redirect = (to) => {
    return {
        type: REDIRECT_STATUS,
        payload: to
    }
}
