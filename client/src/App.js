import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

// import navbar
import Navbar from './components/Navbar/Navbar';

// import pages
import Landing from './pages/Landing/Landing';
import Contact from './pages/Contact/Contact';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import AuthPage from './pages/AuthPage/AuthPage';

function App() {
  return (
    <Router>
      <div data-testid="app" className="App">
        <Navbar/>
        <Switch>
          {/* put exact so that the component is only rendered when http://localhost/ */}
          <Route exact path='/' component={Landing}/>
          <Route path='/contact' component={Contact}/>
          <Route path="/AuthPage" exact component={AuthPage}/>
          {/* Add all pages above the error page! -KRW */}
          <Route path='*' component={ErrorPage}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
