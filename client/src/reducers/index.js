import { combineReducers } from 'redux';

// import reducers
import authReducer from './authReducer';

export default combineReducers({
    auth: authReducer
});