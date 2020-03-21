import React from 'react';
import { Alert } from 'react-bootstrap'

const AlertMessage = (props) => {
    const { success, error, msg, setSuccess, setError, setMsg } = props;
    if (success) {
        return (
          <Alert
            variant="success"
            dismissible
            onClose={() => {
              setSuccess(false)
              setMsg('')
            }}
          >
            {msg}
          </Alert>
        )
      }
      else if (error) {
        return (
          <Alert
            variant="danger"
            dismissible
            onClose={() => {
              setError(false)
              setMsg('')
            }}
          >
            {msg}
          </Alert>
        )
      }
      else return <></>
};

export default AlertMessage;