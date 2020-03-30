import React, { useState, useEffect } from 'react'
import Card from '../../components/profileCard/profileCard.js';
import { withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {Container, Row, Col } from "react-bootstrap";

function Profile(props) {
    const [fields, setFields] = useState({
        bio: '',
        username: '',
        first_name: '',
        last_name: ''
    });

    const profile = useSelector(state => state.auth.profile);

    useEffect(() => {
        if (profile == null) props.history.push('/change-profile')
        else {
            const { first_name, last_name, username, bio } = profile;
            setFields({ first_name, last_name, username, bio })
        }
    }, [])

    return (
        <Container>
        <Row>
            <Col> </Col>
            <Col xs={6}>
            <Card
                username={fields.username}
                bio={fields.bio}
                first={fields.first_name}
                last={fields.last_name}
            />
                </Col>
            <Col> </Col>
        </Row>
    </Container>
    )

}


export default withRouter(Profile)

