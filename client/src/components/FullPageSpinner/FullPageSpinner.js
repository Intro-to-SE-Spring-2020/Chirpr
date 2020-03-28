import React from 'react'
import { Spinner } from 'react-bootstrap'


const FullPageSpinner = ({
}) => {
  return (

    <div className="row justify-content-center align-items-center" style={{height: "100vh"}}>
          <Spinner animation="border" style={{width: '4rem', height: '4rem'}}/>
    </div>

  )
}

export default FullPageSpinner
