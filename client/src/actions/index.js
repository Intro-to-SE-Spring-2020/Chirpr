import {
    LOGIN,
    LOGOUT,
    REGISTER,
    GET_USER_PROFILE,
    IS_LOADING,
    REQUEST_ERROR,
    REDIRECT_STATUS,
    CREATE_CHIRP,
    READ_CHIRP,
    UPDATE_CHIRP,
    DELETE_CHIRP,
    REQUEST_SUCCESS,
    LIKE_OR_UNLIKE,
    CHANGE_PROFILE,
    UPDATE_RECHIRP
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
                    error: response.data.error
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
        console.log(error)
        dispatch({ type: REQUEST_ERROR,
            payload: {
                error: error.response.data.error
            }
        });
        dispatch({ type: IS_LOADING, payload: false });
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
                error: error.response.data.error
            }
        });
        dispatch({ type: IS_LOADING, payload: false });
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
                    error: response.data.error
                }
            });
            dispatch({ type: IS_LOADING, payload: false });

            dispatch({ type: REDIRECT_STATUS, payload: '/register' })
        } else {
            // success
            dispatch({ type: REQUEST_SUCCESS, payload: response.data.msg });

            dispatch({ type: IS_LOADING, payload: false });

            dispatch({ type: REDIRECT_STATUS, payload: '/login' })
        }

    } catch (error) {
        dispatch({ type: REQUEST_ERROR,
            payload: {
                error: error.response.data.error
            }
        });
        dispatch({ type: IS_LOADING, payload: false });

        dispatch({ type: REDIRECT_STATUS, payload: '/register' })
    }
}

export const getUserProfile = () => async (dispatch, getState) => {

    try {

        dispatch({ type: IS_LOADING, payload: true });

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
                    error: response.data.error
                }
            });
        } else {
            dispatch({ type: GET_USER_PROFILE, payload: response.data });
        }

        dispatch({ type: IS_LOADING, payload: false });

    } catch (error) {
        dispatch({ type: REQUEST_ERROR,
            payload: {
                error: error.response.data.error
            }
        });
        dispatch({ type: IS_LOADING, payload: false });
    }
}

export const redirect = (to) => {
    return {
        type: REDIRECT_STATUS,
        payload: to
    }
}

export const changeProfile = (data) => async (dispatch, getState) => {
    const { first_name, last_name, username, bio, dob } = data;
    try {
        dispatch({ type: IS_LOADING, payload: true });
        const token = getState().auth.token;
        const response = await ApiClient.post('/user/profile/createOrUpdate',
                { first_name, last_name, username, bio, dob },
                { headers: {
                    'x-auth-token': token
                }}
        );
    
        if (response.status !== 200) {
            dispatch({
                type: REQUEST_ERROR,
                payload: {
                    error: response.data.error
                }
            });
        } else {
            dispatch({ type: CHANGE_PROFILE, payload: response.data });
            dispatch({ type: REDIRECT_STATUS, payload: '/profile' });
        }

        dispatch({ type: IS_LOADING, payload: false });

    } catch (error) {
        dispatch({ type: REQUEST_ERROR,
            payload: {
                error: error.response.data.error
            }
        });
        dispatch({ type: IS_LOADING, payload: false });
    }
}

export const readChirp = () => async (dispatch, getState) => {
    
    try {
        dispatch({ type: IS_LOADING, payload: true });
        const token = getState().auth.token;
        const response = await ApiClient.get(
            '/chirp',
            {
                headers: { 'x-auth-token': token }
            }
        );
    
        if (response.status !== 200) {
            dispatch({
                type: REQUEST_ERROR,
                payload: {
                    error: response.data.error
                }
            });
        } else {
            dispatch({ type: READ_CHIRP, payload: response.data.chirps });
        }

        dispatch({ type: IS_LOADING, payload: false });

    } catch (error) {
        dispatch({ type: REQUEST_ERROR,
            payload: {
                error: error.response.data.error
            }
        });
        dispatch({ type: IS_LOADING, payload: false });
    }
}

export const createChirp = (content) => async (dispatch, getState) => {
    try {
        
        dispatch({ type: IS_LOADING, payload: true });

        if (getState().auth.profile == null) {
            dispatch({
                type: REQUEST_ERROR,
                payload: {
                    error: "Your profile isn't created yet! Click 'My Profile' above."
                }
            });
            dispatch({ type: IS_LOADING, payload: false });
        } else {
            const response = await ApiClient.post('/chirp',
                { content },
                { headers: {
                    'x-auth-token': getState().auth.token
                }}
            );
    
            if (response.status !== 200) {
                dispatch({
                    type: REQUEST_ERROR,
                    payload: {
                        error: response.data.error
                    }
                });
                dispatch({ type: IS_LOADING, payload: false });
    
            } else {
                dispatch({ type: CREATE_CHIRP, payload: response.data })
                dispatch(readChirp());
                dispatch({ type: REQUEST_SUCCESS, payload: { msg: "Chirp created!" }})
            }
        }

        
    } catch (error) {
        dispatch({ type: REQUEST_ERROR,
            payload: {
                error: error.response.data.error
            }
        });
        dispatch({ type: IS_LOADING, payload: false });
    }
}

export const updateChirp = (id, content) => async (dispatch, getState) => {
    try {
        
        dispatch({ type: IS_LOADING, payload: true });

        const response = await ApiClient.patch(`/chirp/${id}`,
            { content },
            { headers: {
                'x-auth-token': getState().auth.token
            }});

        if (response.status !== 200) {
            dispatch({
                type: REQUEST_ERROR,
                payload: {
                    error: response.data.error
                }
            });
            dispatch({ type: IS_LOADING, payload: false });

        } else {
            dispatch({ type: UPDATE_CHIRP, payload: response.data })
            dispatch(readChirp());
            dispatch({ type: REQUEST_SUCCESS, payload: { msg: "Chirp updated!" }})
        }
        
    } catch (error) {
        dispatch({ type: REQUEST_ERROR,
            payload: {
                error: error.response.data.error
            }
        });
        dispatch({ type: IS_LOADING, payload: false });
    }
}

export const deleteChirp = (id) => async (dispatch, getState) => {
    try {
        
        dispatch({ type: IS_LOADING, payload: true });

        const response = await ApiClient.delete(`/chirp/${id}`,
            { headers: {
                'x-auth-token': getState().auth.token
            }});

        if (response.status !== 200) {
            dispatch({
                type: REQUEST_ERROR,
                payload: {
                    error: response.data.error
                }
            });

        } else {
            dispatch({ type: DELETE_CHIRP, payload: response.data })
            dispatch(readChirp());
            dispatch({ type: REQUEST_SUCCESS, payload: { msg: "Chirp deleted!" }})
        }
        
    } catch (error) {
        dispatch({ type: REQUEST_ERROR,
            payload: {
                error: error.response.data.error
            }
        });
        dispatch({ type: IS_LOADING, payload: false });
    }
}

export const likeOrUnlikeChirp = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: IS_LOADING, payload: true });
        const token = getState().auth.token;
        const response = await ApiClient.patch(`/chirp/${id}/likeorunlike`,
            null, { headers: {
                'x-auth-token': token
            }});
            
        if (response.status !== 200) {
            dispatch({
                type: REQUEST_ERROR,
                payload: {
                    error: response.data.error
                }
            });

        } else {
            dispatch({ type: LIKE_OR_UNLIKE, payload: response.data })
            dispatch(readChirp());
            dispatch({ type: REQUEST_SUCCESS, payload: { msg: `Chirp ${response.data.msg}!` }})
        }
        
    } catch (error) {
        dispatch({ type: REQUEST_ERROR,
            payload: {
                error: error.response.data.error
            }
        });
        dispatch({ type: IS_LOADING, payload: false });
    }
}

export const updateReChirp = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: IS_LOADING, payload: true });
        const token = getState().auth.token;
        const response = await ApiClient.patch(`/chirp/${id}/rechirp`,
            null, { headers: {
                'x-auth-token': token
            }});
            
        if (response.status !== 200) {
            dispatch({
                type: REQUEST_ERROR,
                payload: {
                    error: response.data.error
                }
            });

        } else {
            dispatch({ type: UPDATE_RECHIRP, payload: response.data })
            dispatch(readChirp());
            dispatch({ type: REQUEST_SUCCESS, payload: { msg: `${response.data.msg}!` }})
        }
        
    } catch (error) {
        dispatch({ type: REQUEST_ERROR,
            payload: {
                error: error.response.data.error
            }
        });
        dispatch({ type: IS_LOADING, payload: false });
    }
}
