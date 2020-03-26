import React from 'react'
import './LoginForm.css'
import './RegForm.css'
// import Login from '../../components/LoginAndReg/Login';
import Login from '../../components/LoginAndReg/Login'
import Registration from '../../components/LoginAndReg/Registration'
import CreateProfile from '../../components/CreateProfile/CreateProfile'

function AuthPage (props) {
  const { path, status } = props
  
  if (path == "/register") {
    return <Registration />
  }
  else if (path == "/change-profile") {
    return <CreateProfile/>
  }
  else {
    return <Login status={status} />
  }
}

export default AuthPage
