import React, { Component } from 'react'
import Card from '../../components/profileCard/profileCard.js';
import {Container, Row, Col } from "react-bootstrap";

function Profile(props){
    const [bio, setBio]
    return (
        <Container>
        <Row>
            <Col> </Col>
            <Col xs={6}>
                <Card />
                </Col>
            <Col> </Col>
        </Row>
    </Container>
    )

}


export default Profile

