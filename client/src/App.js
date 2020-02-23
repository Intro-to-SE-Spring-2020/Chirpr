import React, { Profiler } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
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


// Font Awesome (May be used for design later)
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSpinner } from '@fortawesome/free-solid-svg-icons'
// import { library } from '@fortawesome/fontawesome-svg-core'

// Global list so we don't have to import each icon in each react component
// library.add(faSpinner)

function App () {
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
          <Route path="/Feed" exact component={Feed}/>
          {/* Add all pages above the error page! -KRW */}
          <Route path='*' component={ErrorPage} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
