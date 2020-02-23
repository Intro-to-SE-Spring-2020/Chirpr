import React from 'react'
import { Button, Spinner } from 'react-bootstrap'
// import './LoaderButton.css'

const LoaderButton = ({
  isLoading,
  className = '',
  disabled = false,
  ...props
}) => {
  return (
    <Button
      className={`LoaderButton ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Spinner animation='border' />}
      {props.children}
    </Button>
  )
}

export default LoaderButton
