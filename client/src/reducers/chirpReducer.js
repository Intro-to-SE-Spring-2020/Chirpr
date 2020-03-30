// import action types
import {
    CREATE_CHIRP,
    READ_CHIRP,
    UPDATE_CHIRP,
    DELETE_CHIRP,
    LIKE_OR_UNLIKE,
    UPDATE_RECHIRP
   } from "../actions/types"
   
   // initial state
   const initialState = []
   
   // chirp reducer
   export default (state = initialState, action) => {
       switch (action.type) {
           case READ_CHIRP:
               return { ...state, data: action.payload }
           default:
               return state;
       }
   }
   