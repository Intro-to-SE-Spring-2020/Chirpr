import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/lib/integration/react";

import { history } from './lib/history'
// import { history } from './lib/history'
import { store, persistor } from './configureStore'
// custom auth middleware
import './index.css'
import App from './App'

// const store = createStore(reducers, applyMiddleware(checkTokenExpiryMiddleware));

ReactDOM.render(
<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
            <CookiesProvider>
                <App />
            </CookiesProvider>
        </Router>
    </PersistGate>
</Provider>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
