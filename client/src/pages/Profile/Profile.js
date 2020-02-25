import React, { useState, useEffect } from 'react'
import Card from '../../components/profileCard/profileCard.js';
import Cookies from 'universal-cookie'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import {Container, Row, Col } from "react-bootstrap";

function Profile(props) {
    const [fields, setFields] = useState({
        bio: '',
        username: '',
        first_name: '',
        last_name: ''
    })

    const cookies = new Cookies()
    const token = cookies.get('x-auth-token')

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/user/profile',
            headers: {
                'x-auth-token': token
            }
        })
            .then((success) => {
                const { username, first_name, last_name, bio } = success.data
                setFields({
                    username,
                    first_name,
                    last_name,
                    bio
                })
            })
            .catch((err) => {
                props.history.push('/create-profile')
            })
    }, [])

    const { username, first_name, last_name, bio } = fields;

    return (
        <Container>
        <Row>
            <Col> </Col>
            <Col xs={6}>
            <Card username={username} bio={bio} first={first_name} last={last_name} />
                </Col>
            <Col> </Col>
        </Row>
    </Container>
    )

}


export default withRouter(Profile)

