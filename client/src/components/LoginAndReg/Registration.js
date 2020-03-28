import React, { useState, useEffect } from 'react'
import {
  Form,
  FormGroup,
  FormControl
} from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { useSelector } from 'react-redux'

import { register } from '../../actions/'

import AlertMessage from '../AlertMessage/AlertMessage'
import LoaderButton from '../../components/Buttons/LoaderButton'

const Registration = (props) => {
  const [email, setEmail] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [isLoading, setIsLoading] = useState(false)
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

  function validateForm () {
    return (
      email.length > 0 &&
      password1.length > 5 &&
      password1 === password2
    )
  }

  function handleSubmit (event) {
    event.preventDefault()

    props.register(email, password1);
  }

  function renderForm () {
    return (
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
          <Form.Label>Email</Form.Label>
          <FormControl
            autoFocus
            type='email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormGroup>
        <FormGroup controlId='password' bsSize='large'>
          <Form.Label>Password</Form.Label>
          <FormControl
            type='password'
            value={password1}
            onChange={(event) => setPassword1(event.target.value)}
          />
        </FormGroup>
        <FormGroup controlId='confirmPassword' bsSize='large'>
          <Form.Label>Confirm Password</Form.Label>
          <FormControl
            type='password'
            onChange={(event) => setPassword2(event.target.value)}
            value={password2}
          />
        </FormGroup>
        <LoaderButton
          block
          type='submit'
          bsSize='large'
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Signup
        </LoaderButton>
      </form>
    )
  }

  return (
    <div className='Signup'>
      {renderForm()}
    </div>
  )
}

export default withRouter(connect(null, { register })(Registration))
