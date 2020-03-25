// import action types
import {
 LOGIN,
 LOGOUT,
 REGISTER,
 GET_USER_PROFILE
} from "../actions/types"

// initial state
const initialState = {
    token: localStorage.getItem('token'),
    expiry: localStorage.getItem('expiry'),
    profile: null
}

// authentication reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, profile: action.payload }
        case GET_USER_PROFILE:
            return { ...state, profile: action.payload }
        default:
            return state;
    }
}
