import React from 'react'
import { Spinner, Container, Row, Col } from 'react-bootstrap'


const FullPageSpinner = ({
}) => {
  return (

    <Container>
    <Row className="show-grid">
        <Col xs={1} md={4}></Col>
        <Col xs={4} md={4}><Spinner animation="border"/></Col>
        <Col xs={1} md={4}></Col>
    </Row>
    </Container>

  )
}

export default FullPageSpinner
