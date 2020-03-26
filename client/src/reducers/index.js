import { combineReducers } from 'redux';

// import reducers
import authReducer from './authReducer';
import networkReducer from './networkReducer';

export default combineReducers({
    auth: authReducer,
    network: networkReducer
});