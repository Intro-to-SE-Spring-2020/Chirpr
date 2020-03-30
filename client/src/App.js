import React, { useEffect, useState, useRef } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

// import private route
import PrivateRoute from './components/PrivateRoute/PrivateRoute'

// import navbar
import Navigation from './components/Navigation/Navigation'

// import pages
import Landing from './pages/Landing/Landing';
import Feed from './pages/Feed/Feed';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import AuthPage from './pages/AuthPage/AuthPage'
import Profile from './pages/Profile/Profile'
//import components
import FullPageSpinner from './components/FullPageSpinner/FullPageSpinner.js'

import useAuthStatus from './lib/hooks/useAuthStatus'

function App (props) {
  
  const { auth, network } = useSelector(state => state);
  const dispatch = useDispatch();

  const status = useAuthStatus();

  if (network.is_loading) {
    return (
    <>
      <Navigation status={status} handleLogout={() => dispatch({ type : 'LOGOUT'})} />
      <FullPageSpinner/>
    </>
    )
  } else {
    return (
    <div data-testid='app' className='App'>
        <Navigation status={status} handleLogout={() => dispatch({ type: 'LOGOUT' })} />
        <Switch>
          {/* put exact so that the component is only rendered when http://localhost/ */}
          <Route exact path='/' component={Landing} />
          <PrivateRoute status={status} path="/feed">
            <Feed/>
          </PrivateRoute>
          <PrivateRoute status={status} path='/change-profile'>
            <AuthPage path={"/change-profile"}/>
          </PrivateRoute>
          <PrivateRoute status={status} path='/profile'>
            <Profile />
          </PrivateRoute>>
          <Route path='/login' component={() => <AuthPage status={status} path="/login" />} />
          <Route path='/register' component={() => <AuthPage status={status} path="/register" />} />
          {/* Add all pages above the error page! -KRW */}
          <Route path='*' component={ErrorPage} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)
