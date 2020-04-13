import React from 'react'
import {
  Card,
  Image,
  FormControl
} from 'react-bootstrap'
import {
  Heart,
  HeartFill,
  ArrowRepeat,
  Dot,
  Pencil,
  XCircle,
  X,
  CheckCircle
} from 'react-bootstrap-icons'

import './Chirp.scss'

const Chirp = (props) => {
  const [chirpContent, setChirpContent] = React.useState(props.data.content)
  const [showInput, setShowInput] = React.useState(false)
  const [isEditing, setEditing] = React.useState(false)
  const [liked, setLiked] = React.useState(false)
  const [reChirped, setReChirped] = React.useState(false)
  const [likeHover, setLikeHover] = React.useState(false)
  const [reChirpHover, setReChirpHover] = React.useState(false)
  const inputRef = React.useRef(null)
  const isMounted = React.useRef(true)

  const { name, username, content, likes, retweets, time, isOwned, isLiked, isReChirped, _id } = props.data

  React.useEffect(() => {
    if (isEditing) {
      inputRef.current.focus()
      setChirpContent(content)
    } else {
      setShowInput(false)
    }
  }, [isEditing, content])

  // set isMounted to false when we unmount the component
  React.useEffect(() => {
    if (isLiked) setLiked(true)
    else setLiked(false)
    if (isReChirped) setReChirped(true)
    else setReChirped(false)
    return () => {
      isMounted.current = false
    }
  }, [])

  const edit = () => {
    if (isOwned && !isEditing) {
      return (
        <span
          className="float-right"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setShowInput(true)
            setEditing(true)
          }}
        >
          <Pencil className="text-success" style={{ fontSize: '24px' }}/>
        </span>
      )
    } else if (isOwned && isEditing) {
      return (
        <>
          <span
            className="float-right hover-opacity ml-3"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setShowInput(false)
              setEditing(false)
            }}
          >
                        Cancel <X className="" style={{ fontSize: '24px' }}/>
          </span>
          <span
            className="float-right hover-opacity"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              props.handleEdit(_id, chirpContent)
              setShowInput(false)
              setEditing(false)
            }}
          >
                        Update <CheckCircle className="" style={{ fontSize: '24px' }}/>
          </span>
        </>
      )
    }
  }

  const del = () => {
    if (isOwned) {
      return (
        <span
          className="float-right text-danger hover-opacity"
          style={{ cursor: 'pointer' }}
          onClick={() => props.handleDelete(_id)}
        >
          <XCircle className="text-danger" style={{ fontSize: '24px' }}/>
        </span>
      )
    }
  }

  const renderInput = () => {
    if (showInput) {
      return (
        <FormControl
          as="textarea"
          placeholder="Chirp cannot be empty!"
          value={chirpContent}
          onChange={(e) => setChirpContent(e.target.value)}
          ref={inputRef}
          className="mt-4 mb-2"
        />
      )
    }
  }

  const likeButton = () => {
    if (liked || likeHover) {
      return (
        <span
          onMouseEnter={() => setLikeHover(true)}
          onMouseLeave={() => setLikeHover(false)}
          onClick={() => props.handleLikeOrUnlike(_id)}
          style={{ cursor: 'pointer' }}
          className="text-danger">
          <HeartFill data-testid="like-button" className="mr-2 text-danger" style={{ fontSize: '24px' }}/>
          {likes.length}
        </span>
      )
    } else {
      return (
        <span
          onMouseEnter={() => setLikeHover(true)}
          onMouseLeave={() => setLikeHover(false)}
          onClick={() => props.handleLikeOrUnlike(_id)}
          style={{ cursor: 'pointer' }}>
          <Heart className="mr-2" data-testid="unlike-button" style={{ fontSize: '24px' }}/>
          {likes.length}
        </span>
      )
    }
  }

  const reChirpButton = () => {
    if (reChirped || reChirpHover) {
      return (
        <span
          onMouseEnter={() => setReChirpHover(true)}
          onMouseLeave={() => setReChirpHover(false)}
          onClick={() => props.handleReChirp(_id)}
          style={{ cursor: 'pointer' }}
          className="ml-4 text-success">
          <ArrowRepeat className="text-success mr-2" data-testid="rechirp-button" style={{ fontSize: '24px' }}/>
          {retweets.length > 0 ? retweets.length : ''}
        </span>
      )
    } else {
      return (
        <span
          onMouseEnter={() => setReChirpHover(true)}
          onMouseLeave={() => setReChirpHover(false)}
          onClick={() => props.handleReChirp(_id)}
          style={{ cursor: 'pointer' }}
          className="ml-4">
          <ArrowRepeat className="mr-2" data-testid="unchirp-button" style={{ fontSize: '24px' }}/>
          {retweets.length > 0 ? retweets.length : ''}
        </span>
      )
    }
  }

  const likedBy = () => {
    return liked ? (
      <div className="ml-5 mb-3 w-100 text-muted">
        <span style={{ fontSize: '16px' }}>
          <HeartFill className="mr-2"/>
                    You liked
        </span>
      </div>
    ) : ''
  }

  const reChirpedBy = () => {
    return reChirped ? (
      <div className="ml-5 mb-3 w-100 text-muted">
        <span style={{ fontSize: '16px' }}>
          <ArrowRepeat className="text-muted mr-2"/>
                    You ReChirped
        </span>
      </div>
    ) : ''
  }

  return (
    <>
      <Card className={['shadow', props.className]}>
        <Card.Body>
          {likedBy()}
          {reChirpedBy()}
          <div className="mb-2" style={{ position: 'relative' }}>
            <Image style={{
              position: 'absolute',
              maxWidth: '40px',
              left: 0,
              top: '15%',
              transform: 'translate(0%, -15%)'
            }} src="https://cdn2.iconfinder.com/data/icons/facebook-51/32/FACEBOOK_LINE-01-512.png" roundedCircle/>
            <span className="ml-5">
              <strong>{name}</strong>
              <span className="text-muted ml-2">
                                @{username} <Dot/> {time} ago
              </span>
            </span>
            {edit()}
          </div>
          <Card.Text
            className="ml-5"
            style={{ display: `${showInput ? 'none' : 'block'}` }}
          >
            {chirpContent}
          </Card.Text>
          {renderInput()}
          <div className="pl-5">
            {likeButton()}
            {reChirpButton()}
            {del()}
          </div>
        </Card.Body>
      </Card>
    </>
  )
}

export default Chirp
