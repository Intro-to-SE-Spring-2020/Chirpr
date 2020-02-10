import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

// import pages
import Landing from './pages/Landing/Landing';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          {/* put exact so that the component is only rendered when http://localhost/ */}
          <Route exact path='/' component={Landing}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
