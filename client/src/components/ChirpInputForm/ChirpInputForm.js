import React from 'react'
import {
  Card,
  FormControl,
  Button,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap'

import './ChirpInputForm.scss'

const ChirpInputForm = (props) => {
  return (
    <>
      <Card className={['shadow', props.className]}>
        <Card.Body >
          <div className="input-wrapper">
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip-top">
                Most recent chirps will load after sharing
                </Tooltip>
              }
            >
              <FormControl
                placeholder="Say something..."
                className="input"
                onChange={e => props.setChirpData(e.target.value)}
                value={props.chirpData}
              />
            </OverlayTrigger>
            <Button onClick={props.shareChirp} className="button" variant="primary">Share</Button>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}

export default ChirpInputForm
