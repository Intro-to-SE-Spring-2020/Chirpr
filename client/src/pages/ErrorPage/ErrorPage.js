import React, { Component } from 'react';
import Card from '../../components/profileCard/profileCard.js';
import {Container, Row, Col } from "react-bootstrap";

class ErrorPage extends Component {
    render () {
        return (

           <p>         
        <Container>
           <Row>
               <Col> </Col>
               <Col xs={9}>
                   <Card />
                   </Col>
               <Col> </Col>
           </Row>
       </Container> </p>     
            
        )
    }
}

export default ErrorPage
