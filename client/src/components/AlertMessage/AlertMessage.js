import React from 'react';
import { Alert } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

const AlertMessage = (props) => {
  const dispatch = useDispatch();
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
            dispatch({ type: 'REQUEST_ERROR', payload: null })
          }}
        >
          {msg}
        </Alert>
      )
    }
    else return <></>
};

export default AlertMessage;