import React, { useState, useEffect } from 'react'
import { FormGroup, FormControl, FormLabel } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { useSelector } from 'react-redux'

import { login, logout } from '../../actions/'

import LoaderButton from '../Buttons/LoaderButton'
import AlertMessage from '../AlertMessage/AlertMessage'

const Login = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = React.useState(false);
  const [msg, setMsg] = React.useState('');
  const { request_error } = useSelector(state => state.network);

  useEffect(() => {
    if (request_error && request_error.error) {
      setMsg(request_error.error)
      setError(true);
    }
  }, [])

  function validateForm (props) {
    return email.length > 0 && password.length > 5
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    props.login(email, password);
  }
  
  return (
    <div className='AuthPage'>
      <form onSubmit={handleSubmit}>
        <AlertMessage
          success={success}
          error={error}
          msg={msg}
          setSuccess={setSuccess}
          setError={setError}
          setMsg={setMsg}
        />
        <FormGroup controlId='email' bsSize='large'>
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId='password' bsSize='large'>
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type='password'
          />
        </FormGroup>
        <LoaderButton block type='submit' bsSize='large' isLoading={isLoading} disabled={!validateForm()}>
            Login
        </LoaderButton>
      </form>
    </div>
  )
}
export default withRouter(connect(null, { login, logout })(Login))
