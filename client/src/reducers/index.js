import { combineReducers } from 'redux'

// import reducers
import authReducer from './authReducer'
import networkReducer from './networkReducer'
import chirpReducer from './chirpReducer'

export default combineReducers({
  auth: authReducer,
  network: networkReducer,
  chirps: chirpReducer
})
