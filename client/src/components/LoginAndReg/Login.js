import React, { useState } from 'react'
import { Alert, FormGroup, FormControl, FormLabel } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'universal-cookie'
import LoaderButton from '../Buttons/LoaderButton'

const Login = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState('')

  function validateForm () {
    return email.length > 0 && password.length > 5
  }

  async function handleSubmit (event) {
    event.preventDefault()

    setIsLoading(true)
    // call api
    axios({
      method: 'post',
      url: 'http://localhost:8000/api/signin',
      data: {
        email,
        password
      }
    })
      .then((success) => {
        const cookies = new Cookies()
        cookies.set('x-auth-token', success.data.token, { path: '/' })

        if (success.data.hasProfile) {
          // parse info here and create dummy profile info
          props.history.push('/')
        } else {
          props.history.push('/create-profile')
        }
        
      })
      .catch(err => {
        setEmail('')
        setPassword('')
        setErrors(err.response.data.error)
        setIsLoading(false)
      })
  }

  const renderErrors = () => {
    if (errors) return <Alert variant="danger">{errors}</Alert>
    else return <></>
  }
  
  return (
    <div className='AuthPage'>
      <form onSubmit={handleSubmit}>
      {renderErrors()}
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

export default withRouter(Login)
