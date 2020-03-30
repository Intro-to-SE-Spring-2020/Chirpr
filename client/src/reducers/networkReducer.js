// import action types
import {
    IS_LOADING,
    REQUEST_ERROR,
    REQUEST_SUCCESS
   } from "../actions/types"
   
   // initial state
   const initialState = {
       is_loading: false,
       request_error: null
   }
   
   // misc reducer
   export default (state = initialState, action) => {
       switch (action.type) {
           case IS_LOADING:
               return { ...state, is_loading: action.payload }
            case REQUEST_ERROR:
                return { ...state, request_error: action.payload }
            case REQUEST_SUCCESS:
                return { ...state, request_success: action.payload }
           default:
               return state;
       }
   }
   