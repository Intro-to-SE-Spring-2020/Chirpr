import React from 'react'
import './LoginForm.css'
import './RegForm.css'
// import Login from '../../components/LoginAndReg/Login';
import Login from '../../components/LoginAndReg/Login'
import Registration from '../../components/LoginAndReg/Registration'

function AuthPage (props) {
  const { login, register } = props

  if (login) {
    return <Login />
  }
  if (register) {
    return <Registration />
  }
}

export default AuthPage
