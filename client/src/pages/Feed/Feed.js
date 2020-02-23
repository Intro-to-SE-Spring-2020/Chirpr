import React, { Component } from 'react'
import {
    Card,
    ListGroup,
    Button,
    Container,
    Row,
    Form,
    Col

} from 'react-bootstrap';

class Feed extends Component {
    render () {
        return (
            <div>
            <Container>
            <Container>
            <Row>
            <Col>
            <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Your Chirp</Form.Label>
            <Form.Control as="textarea" rows="3" size="lg" />
            </Form.Group>
            </Form>
            </Col>
            <Col>
            <Button variant="primary">Chirp</Button>
            </Col>
            </Row>
            </Container>

                <Row>
                <Col>
                <Card style={{ width: '18rem' }}>
                <Card.Header>Featured</Card.Header>
                 <ListGroup variant="flush">
                 <ListGroup.Item>Chirps</ListGroup.Item>
                <ListGroup.Item>Likes</ListGroup.Item>
                </ListGroup>
                </Card>

                </Col>
                <Card style={{ width: '32rem' }}>
                <Card className="text-center">
                <Card.Header>Featured</Card.Header>
                <Card.Body>
                <Card.Title>Tweets</Card.Title>
                <Card.Text>
                Fake News
                </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">2 days ago</Card.Footer>
                </Card>
                </Card>

                <Card style={{ width: '18rem' }}>
                <Card.Header>Trending Chirps</Card.Header>
                 <ListGroup variant="flush">
                 <ListGroup.Item>#TeamChirp</ListGroup.Item>
                <ListGroup.Item>#SoftwareBoys</ListGroup.Item>
                <ListGroup.Item>#Design</ListGroup.Item>
                </ListGroup>
                </Card>
                </Row>
                </Container>
                 
            </div>
        )
    }
}

export default Feed