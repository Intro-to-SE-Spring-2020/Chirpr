import React, { useState } from 'react'
import { FormGroup, FormControl, FormLabel } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'universal-cookie'
import LoaderButton from '../Buttons/LoaderButton'
import './CreateProfile.css'

const CreateProfile = (props) => {
  const [firstn, setFirstn] = useState('')
  const [lastn, setLastn] = useState('')
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [dob, setDob] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  function validateForm () {
    return (
      firstn.length > 0 &&
      lastn.length > 0 &&
      username.length > 0 &&
      bio.length < 121 &&
      dob.length > 0
    )
  }

  async function handleSubmit (event) {
    event.preventDefault()

    const cookies = new Cookies()
    const token = cookies.get('x-auth-token')

    setIsLoading(true)
    // call api
    axios({
      method: 'post',
      url: 'http://localhost:8000/api/user/profile/createOrUpdate',
      data: {
        first_name: firstn,
        last_name: lastn,
        bio,
        username,
        dob
      },
      headers: {
        'x-auth-token': token
      }
    })
      .then((success) => {
        props.history.push('/profile')
      })
      .catch(err => {
        setLastn('')
        setFirstn('')
        setUsername('')
        setDob('')
        setBio('')
        setIsLoading(false)
      })
  }

  function renderForm() {
    return (
      <form className='Name' onSubmit={handleSubmit}>
        <FormGroup controlId="firstn" bsSize="large">
          <FormLabel>First Name</FormLabel>
          <FormControl
            autoFocus
            type="firstn"
            value={firstn}
            onChange={(event) => setFirstn(event.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="lastn" bsSize="large">
          <FormLabel>Last Name</FormLabel>
          <FormControl
            type="lastn"
            value={lastn}
            onChange={(event) => setLastn(event.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="username" bsSize="large">
          <FormLabel>Username</FormLabel>
          <FormControl
            type="username"
            onChange={(event) => setUsername(event.target.value)}
            value={username}
          />
        </FormGroup>
        <FormGroup controlId="bio" bsSize="large">
          <FormLabel>Short Bio (120 characters)</FormLabel>
          <FormControl
            autoFocus
            type="bio"
            value={bio}
            onChange={(event) => setBio(event.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="dob" bsSize="large">
          <FormLabel>Date of Birth (YYYY-MM-DD)</FormLabel>
          <FormControl
            autoFocus
            type="dob"
            value={dob}
            onChange={(event) => setDob(event.target.value)}
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Update Profile
        </LoaderButton>
      </form>
    )
  }

  return (
    <div className="CreateProfile">
      {renderForm()}
    </div>
  )
}

export default withRouter(CreateProfile)
