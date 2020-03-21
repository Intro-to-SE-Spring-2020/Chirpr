import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component, isAuthed, ...rest }) => (
    console.log(isAuthed),
    <Route
        {...rest}
        render={props => 
            isAuthed ? (
                <Component {...rest} {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default PrivateRoute;