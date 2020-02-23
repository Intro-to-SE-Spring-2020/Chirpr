import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <>
      <Navbar bg='dark' variant='dark'>
        <Navbar.Brand href='#home'>Chirpr</Navbar.Brand>
        <Nav className='mr-auto'>
          <Link className='nav-link' to='/'>Home</Link>
          <Link className='nav-link' to='/profile'>My Profile</Link>
        </Nav>
        <Nav>
          <Link className='nav-link' to='/login'>Login</Link>
          <Link className='nav-link' to='/register'>Register</Link>
        </Nav>
      </Navbar>
    </>
  )
}

export default Navigation
