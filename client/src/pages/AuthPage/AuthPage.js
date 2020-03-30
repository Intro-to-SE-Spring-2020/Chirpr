import React from 'react'
import './LoginForm.css'
import './RegForm.css'
// import Login from '../../components/LoginAndReg/Login';
import Login from '../../components/LoginAndReg/Login'
import Registration from '../../components/LoginAndReg/Registration'
import CreateProfile from '../../components/CreateProfile/CreateProfile'

function AuthPage (props) {
  const { path } = props
  
  if (path == "/register") {
    return (
      <>
        <h1 className="mt-4 text-center">Register Account</h1>
        <Registration/>
      </>
    )
  }
  else if (path == "/change-profile") {
    return (
      <>
        <h1 className="mt-4 text-center">Create Profile</h1>
        <CreateProfile/>
      </>
    )
  }
  else {
    return (
      <>
        <h1 className="mt-4 text-center">Login</h1>
        <Login/>
      </>
    )
  }
}

export default AuthPage
