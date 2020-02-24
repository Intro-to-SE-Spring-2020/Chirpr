import React from 'react'
import './LoginForm.css'
import './RegForm.css'
// import Login from '../../components/LoginAndReg/Login';
import Login from '../../components/LoginAndReg/Login'
import Registration from '../../components/LoginAndReg/Registration'
import CreateProfile from '../../components/CreateProfile/CreateProfile'

function AuthPage (props) {
  const { login, register } = props

  if (login) {
    return <Login />
  }
  if (register) {
    return <Registration />
  }
  if (CreateProfile) {
    return <CreateProfile/>
  }
}

export default AuthPage
