import React, { useEffect, useState, useRef } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import { getUserProfile } from './actions'
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

import useAuthStatus from './lib/hooks/useAuthStatus'

function App (props) {
  const [logout, setLogout] = useState(false);
  const [status, setStatus] = useState(true);
  const isMounted = useRef(true)
  // const isAuthed = useAuthStatus(logout);
  
  const { auth } = props;

  // set isMounted to false when we unmount the component
  useEffect(() => {
    if (!auth) {
      localStorage.clear();
      setStatus(false);
    } else {
      const now = Date.now();
      const authed = Date.parse(auth.expiry) > now;
      if (!auth.profile) {
        props.getUserProfile();
      }
      setStatus(true);
    }
    return () => {
        isMounted.current = false
    }
  }, [props.location])

  
  const handleLogout = () => {
    setLogout(true)
    if (!status)
      setLogout(false)
  }

  return (
      <div data-testid='app' className='App'>
        <Navigation status={status} handleLogout={handleLogout} />
        <Switch>
          {/* put exact so that the component is only rendered when http://localhost/ */}
          <PrivateRoute path='/create-profile' isAuthed={status} exact component={() => <AuthPage register={false} login={false} createProfile />} />
          <PrivateRoute path="/Feed" isAuthed={status} exact component={Feed}/>
          <PrivateRoute path='/profile' exact component={() => <Profile />} />
          <Route exact path='/' component={Landing} />
          <Route path='/register' exact component={() => <AuthPage register login={false} createProfile={false} />} />
          <Route path='/login' exact component={() => <AuthPage register={false} login createProfile={false} />} />
          {/* Add all pages above the error page! -KRW */}
          <Route path='*' component={ErrorPage} />
        </Switch>
      </div>
  )
}

const mapStateToProps = (state) => {
  return { auth: state.auth }
}

export default withRouter(connect(mapStateToProps, { getUserProfile })(App))
