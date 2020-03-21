import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, isAuthed, logout, ...rest }) => {
    if (isAuthed === true) {
        return (
            <Route
                {...rest}
                render={props => <Component {...rest} {...props} />}
            />
        )
    }
    else if (isAuthed === null) return <>loading...</>
    else return <Redirect to="/login"/>
};

export default PrivateRoute;