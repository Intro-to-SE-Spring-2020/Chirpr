import React, { useEffect, useState } from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Button
} from 'react-bootstrap'
import { useSelector, connect } from 'react-redux'
import isEmpty from 'lodash'

import {
  readChirp,
  createChirp,
  updateChirp,
  deleteChirp,
  likeOrUnlikeChirp,
  updateReChirp
} from '../../actions'

import ChirpInputForm from '../../components/ChirpInputForm/ChirpInputForm'
import Chirp from '../../components/Chirp/Chirp'
import AlertMessage from '../../components/AlertMessage/AlertMessage'

const Feed = (props) => {
  const [chirpFieldData, setChirpFieldData] = useState('')
  const [loadNew, setLoadNew] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [loadMore, setLoadMore] = useState(false)
  // loadMore will be used later to load 10 chirps at a time
  // then load more when user scrolls farther. Do this to cut down
  // on amount of data sent back to user at one time
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [msg, setMsg] = useState('')

  const profile = useSelector(state => state.auth.profile)
  const chirps = useSelector(state => state.chirps)
  const request_error = useSelector(state => state.network.request_error)
  const request_success = useSelector(state => state.network.request_success)

  useEffect(() => {
    if (request_error && request_error.error) {
      setMsg(request_error.error)
      setError(true)
      setChirpFieldData('')
    }
    if (request_success && request_success.msg) {
      setMsg(request_success.msg)
      setSuccess(true)
    }
  }, [request_success, request_error])

  useEffect(() => {
    if (!chirps.data || refresh) setLoadNew(true)
    if (loadNew) {
      props.readChirp()
      setLoadNew(false)
    }
    return () => {
      setLoadNew(true)
    }
  }, [loadNew])

  const shareChirp = () => {
    props.createChirp(chirpFieldData)
  }

  const handleEdit = (id, chirpContent) => {
    props.updateChirp(id, chirpContent)
  }

  const handleDelete = (id) => {
    props.deleteChirp(id)
  }

  const handleLikeOrUnlike = (id) => {
    props.likeOrUnlikeChirp(id)
  }

  const handleReChirp = (id) => {
    props.updateReChirp(id)
  }

  const handleLoadingNew = () => {
    setLoadNew(!loadNew)
  }

  const renderChirps = () => {
    let rendered
    if (chirps.data) {
      rendered = chirps.data.map(chirp => {
        if (isEmpty(chirp)) {
          const { name, username, isOwned, content, likes, retweets, createdAt, isLiked, isReChirped, _id } = chirp
          const now = new Date()
          let time = now - Date.parse(createdAt) // in ms
          time = Math.floor(time / 1000)
          if (time < 60) time = time.toString() + 's'
          else if (time < 3600) {
            time = Math.floor(time / 60)
            time = time.toString() + 'm'
          } else if (time < (3600 * 24)) {
            time = Math.floor(time / 3600) // to hour
            time = time.toString() + 'h'
          } else {
            time = Math.floor(time / (3600 * 24)) // to days
            time = time.toString() + 'd'
          }
          const data = { name, username, content, likes, retweets, time, isOwned, isLiked, isReChirped, _id }
          return (
            <Chirp
              className="mb-4"
              data={data}
              loadNew={handleLoadingNew}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleLikeOrUnlike={handleLikeOrUnlike}
              handleReChirp={handleReChirp}
              currUser={profile}
              key={_id}
            />
          )
        } else {
          return (
            <h4 className="text-danger text-center">No chirps to display</h4>
          )
        }
      })
    }
    return (
      <>
        {rendered}
      </>
    )
  }

  return (
    <Container className="mt-4">
      <AlertMessage
        success={success}
        error={error}
        msg={msg}
        setSuccess={setSuccess}
        setError={setError}
        setMsg={setMsg}
      />
      <Row>
        <Col className="mx-auto" xs={8}>
          <ChirpInputForm
            shareChirp={shareChirp}
            chirpData={chirpFieldData}
            setChirpData={setChirpFieldData}
            className="mb-4"
          />
          {renderChirps()}
        </Col>
        <Col xs={4}>
          <div className="sticky-top" style={{ top: 'calc(56px + 1.5rem)' }}>
            <Card className="shadow">
              <Card.Body>
                <h4 className="lead">Your recent followers</h4>
                <hr/>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  <li style={{ position: 'relative' }} className="p-2">
                    <Image style={{ position: 'absolute', maxWidth: '35px', left: 0, top: '50%', transform: 'translate(0, -50%)' }} className="ml-0" src="https://cdn2.iconfinder.com/data/icons/facebook-51/32/FACEBOOK_LINE-01-512.png" roundedCircle/>
                    <span className="ml-5">
                    @justin
                    </span>
                    <Button size="sm" variant="outline-primary" style={{ position: 'absolute', right: 0 }}>Follow</Button>
                  </li>
                  <li style={{ position: 'relative' }} className="p-2">
                    <Image style={{ position: 'absolute', maxWidth: '35px', left: 0, top: '50%', transform: 'translate(0, -50%)' }} className="ml-0" src="https://cdn2.iconfinder.com/data/icons/facebook-51/32/FACEBOOK_LINE-01-512.png" roundedCircle/>
                    <span className="ml-5">
                    @pranay
                    </span>
                    <Button size="sm" variant="outline-primary" style={{ position: 'absolute', right: 0 }}>Follow</Button>
                  </li>
                  <li style={{ position: 'relative' }} className="p-2">
                    <Image style={{ position: 'absolute', maxWidth: '35px', left: 0, top: '50%', transform: 'translate(0, -50%)' }} className="ml-0" src="https://cdn2.iconfinder.com/data/icons/facebook-51/32/FACEBOOK_LINE-01-512.png" roundedCircle/>
                    <span className="ml-5">
                    @keith
                    </span>
                    <Button size="sm" variant="outline-primary" style={{ position: 'absolute', right: 0 }}>Follow</Button>
                  </li>
                  <li style={{ position: 'relative' }} className="p-2">
                    <Image style={{ position: 'absolute', maxWidth: '35px', left: 0, top: '50%', transform: 'translate(0, -50%)' }} className="ml-0" src="https://cdn2.iconfinder.com/data/icons/facebook-51/32/FACEBOOK_LINE-01-512.png" roundedCircle/>
                    <span className="ml-5">
                    @dylan
                    </span>
                    <Button size="sm" variant="outline-primary" style={{ position: 'absolute', right: 0 }}>Follow</Button>
                  </li>
                </ul>
              </Card.Body>
            </Card>
            <Card className="shadow mt-4">
              <Card.Body>
                <h4 className="lead">People you may like</h4>
                <hr/>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  <li style={{ position: 'relative' }} className="p-2">
                    <Image style={{ position: 'absolute', maxWidth: '35px', left: 0, top: '50%', transform: 'translate(0, -50%)' }} className="ml-0" src="https://cdn2.iconfinder.com/data/icons/facebook-51/32/FACEBOOK_LINE-01-512.png" roundedCircle/>
                    <span className="ml-5">
                      @beautifulkenzie
                    </span>
                    <Button size="sm" variant="outline-primary" style={{ position: 'absolute', right: 0 }}>Follow</Button>
                  </li>
                  <li style={{ position: 'relative' }} className="p-2">
                    <Image style={{ position: 'absolute', maxWidth: '35px', left: 0, top: '50%', transform: 'translate(0, -50%)' }} className="ml-0" src="https://cdn2.iconfinder.com/data/icons/facebook-51/32/FACEBOOK_LINE-01-512.png" roundedCircle/>
                    <span className="ml-5">
                      @bimbopjoe
                    </span>
                    <Button size="sm" variant="outline-primary" style={{ position: 'absolute', right: 0 }}>Follow</Button>
                  </li>
                  <li style={{ position: 'relative' }} className="p-2">
                    <Image style={{ position: 'absolute', maxWidth: '35px', left: 0, top: '50%', transform: 'translate(0, -50%)' }} className="ml-0" src="https://cdn2.iconfinder.com/data/icons/facebook-51/32/FACEBOOK_LINE-01-512.png" roundedCircle/>
                    <span className="ml-5">
                      @gladchad
                    </span>
                    <Button size="sm" variant="outline-primary" style={{ position: 'absolute', right: 0 }}>Follow</Button>
                  </li>
                  <li style={{ position: 'relative' }} className="p-2">
                    <Image style={{ position: 'absolute', maxWidth: '35px', left: 0, top: '50%', transform: 'translate(0, -50%)' }} className="ml-0" src="https://cdn2.iconfinder.com/data/icons/facebook-51/32/FACEBOOK_LINE-01-512.png" roundedCircle/>
                    <span className="ml-5">
                      @bollymolly
                    </span>
                    <Button size="sm" variant="outline-primary" style={{ position: 'absolute', right: 0 }}>Follow</Button>
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default connect(null, {
  readChirp,
  createChirp,
  updateChirp,
  deleteChirp,
  likeOrUnlikeChirp,
  updateReChirp
})(Feed)
