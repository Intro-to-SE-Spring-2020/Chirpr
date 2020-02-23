import React, { Component } from 'react';
import Card from '../../components/profileCard/profileCard.js';
import {Container, Row, Col } from "react-bootstrap";

class ErrorPage extends Component {
  render () {
    return (
      <h1>
        404 Error: Page Not Found!
      </h1>
    )
  }
}

export default ErrorPage
