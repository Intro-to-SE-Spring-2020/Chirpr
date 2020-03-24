import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import './index.css'
import App from './App'
import reducers from './reducers'

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
<Provider store={store}>
    <Router>
        <CookiesProvider>
            <App />
        </CookiesProvider>
    </Router>
</Provider>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
