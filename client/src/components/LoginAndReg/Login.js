import React, { useState } from 'react'
import {Button, FormGroup, FormControl, FormLabel} from 'react-bootstrap'

const Login = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    
    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
      
        setIsLoading(true);
      
        try {
            //Auth is an AWS Cognito object.  We need to replace it with our own signin.
          //await Auth.signIn(email, password);
          props.userHasAuthenticated(true);
          props.history.push("/");
        } catch (e) {
          alert(e.message);
          setIsLoading(false);
        }
      }

    return (
        <div className="AuthPage">
                <form onSubmit={handleSubmit}>
                    <FormGroup controlId="email" bsSize="large">
                        <FormLabel>Email</FormLabel>
                        <FormControl
                        autoFocus
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <FormLabel>Password</FormLabel>
                        <FormControl
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        />
                    </FormGroup>
                    <Button block bsSize="large" disabled={!validateForm()} type="submit">
                        Login
                    </Button>
                </form>
        </div>
    )
}

export default Login