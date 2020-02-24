import React, { Component, useState } from 'react'
import Card from '../../components/profileCard/profileCard.js';
import Cookies from 'universal-cookie'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import {Container, Row, Col } from "react-bootstrap";

function Profile(props){
    const [bio, setBio] = useState("") //initial state of bio is empty
    const [username, setUsername] = useState("")
    const [first, setFirst] = useState("")
    const [last, setLast] = useState("")

    const cookies = new Cookies()
    const token = cookies.get('x-auth-token')

    axios({
        method: 'get',
        url: 'http://localhost:8000/api/user/profile',
        headers: {
            'x-auth-token': token
        }
    })
        .then((success) => {
            setBio(success.data.bio)
            setFirst(success.data.first_name)
            setLast(success.data.last_name)
            setUsername(success.data.username)
        })
        .catch((err) => {
            props.history.push('/create-profile')
        })

    return (
        <Container>
        <Row>
            <Col> </Col>
            <Col xs={6}>
            <Card username={username} bio={bio} first={first} last={last} />
                </Col>
            <Col> </Col>
        </Row>
    </Container>
    )

}


export default withRouter(Profile)

