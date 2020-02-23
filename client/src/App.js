import React, { Profiler } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

// import navbar
import Navigation from './components/Navigation/Navigation'

// import pages
import Landing from './pages/Landing/Landing'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import AuthPage from './pages/AuthPage/AuthPage'
import Profile from './pages/Profile/Profile'

import { isAuthed } from '../../lib/api/auth'

function App () {
  console.log(isAuthed())
  return (
    <Router>
      <div data-testid='app' className='App'>
        <Navigation />
        <Switch>
          {/* put exact so that the component is only rendered when http://localhost/ */}
          <Route exact path='/' component={Landing} />
          <Route path='/register' exact component={() => <AuthPage register login={false} />} />
          <Route path='/login' exact component={() => <AuthPage register={false} login />} />
          <Route path='/profile' exact component={() => <Profile />} />
          {/* Add all pages above the error page! -KRW */}
          <Route path='*' component={ErrorPage} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
