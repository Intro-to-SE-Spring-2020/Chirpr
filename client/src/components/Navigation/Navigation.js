import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Navigation = (props) => {
  
  const renderNavigation = (authed) => {
    
    if (authed === true) {
      return (
        <Navbar bg='dark' variant='dark'>
          <Navbar.Brand href='#home'>Chirpr</Navbar.Brand>
          <Nav className='mr-auto'>
            <Link className='nav-link' to='/'>Home</Link>
            <Link className='nav-link' to='/profile'>My Profile</Link>
            <Link className="nav-link" to="/feed">Feed</Link>
          </Nav>
          <Nav>
            <Link className='nav-link' onClick={props.handleLogout}>Logout</Link>
          </Nav>
        </Navbar>
      )
    }
    // otherwise return login/register
    return (
      <Navbar bg='dark' variant='dark'>
        <Navbar.Brand href='#home'>Chirpr</Navbar.Brand>
        <Nav className='mr-auto'>
          <Link className='nav-link' to='/'>Home</Link>
        </Nav>
        <Nav>
          <Link className='nav-link' to='/login'>Login</Link>
          <Link className='nav-link' to='/register' >Register</Link>
        </Nav>
      </Navbar>
    )
  }

  return (
    <>
      {renderNavigation(props.status)}
    </>
  )
}

export default Navigation
