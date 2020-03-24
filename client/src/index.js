import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux';
import { createStore } from 'redux'

import './index.css'
import App from './App'
import reducers from './reducers'

ReactDOM.render(
<Provider store={createStore(reducers)}>
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
