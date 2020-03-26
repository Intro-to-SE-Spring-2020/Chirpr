import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage/session' // defaults to localStorage for web
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import checkTokenExpiryMiddleware from './lib/checkTokenExiryMiddleware'

import reducers from './reducers'

// configureStore.js
 
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = createStore(persistedReducer, applyMiddleware(checkTokenExpiryMiddleware, thunk))
const persistor = persistStore(store)

export { store, persistor }