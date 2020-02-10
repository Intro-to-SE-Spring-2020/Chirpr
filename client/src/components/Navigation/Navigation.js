import React from 'react'
import {
    Navbar,
    Nav
} from 'react-bootstrap';
import {
    Link 
} from 'react-router-dom'

const Navigation = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Link to="/contact">Contact</Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            </Navbar>
        </>
    )
}

export default Navigation