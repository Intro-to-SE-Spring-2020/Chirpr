import React from 'react';
import { Redirect, Route } from 'react-router-dom'

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, status, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        status ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
  }

export default PrivateRoute;