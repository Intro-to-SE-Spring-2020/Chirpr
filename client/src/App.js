import React, { Profiler, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

// import navbar
import Navigation from './components/Navigation/Navigation'

// import pages
import Landing from './pages/Landing/Landing';
import Feed from './pages/Feed/Feed';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import AuthPage from './pages/AuthPage/AuthPage'
import Profile from './pages/Profile/Profile'

import { isAuthed } from './lib/api/auth'
import { logout } from '../src/lib/api/auth'

function App (props) {
  
  const handleLogout = () => {
    logout()
    if (!isAuthed()) {
        setAuthed(false)
        props.history.push('/')
    } else {
        setAuthed(isAuthed())
    }
  }

  const [authed, setAuthed] = React.useState(false)

  useEffect(() => {
    setAuthed(isAuthed())
  }, [window.location.href])

  return (
      <div data-testid='app' className='App'>
        <Navigation status={authed} handleLogout={handleLogout} />
        <Switch>
          {/* put exact so that the component is only rendered when http://localhost/ */}
          <Route exact path='/' component={Landing} />
          <Route path='/register' exact component={() => <AuthPage register login={false} createProfile={false} />} />
          <Route path='/login' exact component={() => <AuthPage register={false} login createProfile={false} />} />
          <Route path='/create-profile' exact component={() => <AuthPage register={false} login={false} createProfile />} />
          <Route path='/profile' exact component={() => <Profile />} />
          <Route path="/Feed" exact component={Feed}/>
          {/* Add all pages above the error page! -KRW */}
          <Route path='*' component={ErrorPage} />
        </Switch>
      </div>
  )
}

export default withRouter(App)
