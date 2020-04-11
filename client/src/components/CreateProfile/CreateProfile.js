import React, { useState } from 'react'
import { FormGroup, FormControl, FormLabel } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { changeProfile } from '../../actions'

import LoaderButton from '../Buttons/LoaderButton'
import './CreateProfile.css'

const CreateProfile = (props) => {
  const [first_name, setFirstn] = useState('')
  const [last_name, setLastn] = useState('')
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [dob, setDob] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()

  function validateForm () {
    return (
      first_name.length > 0 &&
      last_name.length > 0 &&
      username.length > 0 &&
      bio.length < 121 &&
      dob.length > 0
    )
  }

  async function handleSubmit (event) {
    event.preventDefault()
    dispatch(changeProfile({ first_name, last_name, username, bio, dob }))
  }

  function renderForm () {
    return (
      <form className='Name' onSubmit={handleSubmit}>
        <FormGroup controlId="first_name" bsSize="large">
          <FormLabel>First Name</FormLabel>
          <FormControl
            autoFocus
            type="first_name"
            value={first_name}
            onChange={(event) => setFirstn(event.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="last_name" bsSize="large">
          <FormLabel>Last Name</FormLabel>
          <FormControl
            type="last_name"
            value={last_name}
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
