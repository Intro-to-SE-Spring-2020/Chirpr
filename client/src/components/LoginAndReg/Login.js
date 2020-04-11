import React, { useState, useEffect } from 'react'
import { FormGroup, FormControl, FormLabel } from 'react-bootstrap'
import { connect, useSelector } from 'react-redux'

import { login } from '../../actions/'

import LoaderButton from '../Buttons/LoaderButton'
import AlertMessage from '../AlertMessage/AlertMessage'

const Login = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [msg, setMsg] = useState('')
  const { request_error } = useSelector(state => state.network)

  useEffect(() => {
    if (request_error && request_error.error) {
      setMsg(request_error.error)
      setError(true)
    }
  }, [request_error])

  function validateForm (props) {
    return email.length > 0 && password.length > 5
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    props.login(email, password)
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
        <FormGroup controlId='email'>
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId='password'>
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type='password'
          />
        </FormGroup>
        <LoaderButton data-testid="submit-button" block type='submit' isLoading={isLoading} disabled={!validateForm()}>
            Login
        </LoaderButton>
      </form>
    </div>
  )
}
export default connect(null, { login })(Login)
