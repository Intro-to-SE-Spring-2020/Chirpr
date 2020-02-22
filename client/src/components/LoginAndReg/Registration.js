import React, { useState } from "react";
import {
  Form,
  FormGroup,
  FormControl
} from "react-bootstrap";
import { Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';

import LoaderButton from "../../components/Buttons/LoaderButton"

const Registration = (props) => {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      email.length > 0 &&
      password1.length > 5 &&
      password1 === password2
    );
  }

  function validateConfirmationForm() {
    return password2.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    // call api
    axios({
      method: 'post',
      url: 'http://localhost:8000/api/signup',
      data: {
        email,
        password: password1
      }
    })
      .then((success) => {
        props.history.push("/login")
      })
      .catch(err => {
        setEmail("");
        setPassword1("");
        setPassword2("");
        setIsLoading(false);
      })
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
  }

  function renderConfirmationForm() {
    return (
      <form onSubmit={handleConfirmationSubmit}>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateConfirmationForm()}
        >
          Verify
        </LoaderButton>
      </form>
    );
  }

  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <Form.Label>Email</Form.Label>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <Form.Label>Password</Form.Label>
          <FormControl
            type="password"
            value={password1}
            onChange={(event) => setPassword1(event.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <Form.Label>Confirm Password</Form.Label>
          <FormControl
            type="password"
            onChange={(event) => setPassword2(event.target.value)}
            value={password2}
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Signup
        </LoaderButton>
      </form>
    );
  }

  return (
    <div className="Signup">
      {renderForm()}
    </div>
  );
}

export default withRouter(Registration)