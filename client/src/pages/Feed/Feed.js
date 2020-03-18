import React from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  Image,
  Button
} from 'react-bootstrap'
import axios from 'axios';
import Cookies from 'universal-cookie'

import ChirpInputForm from '../../components/ChirpInputForm/ChirpInputForm'
import Chirp from '../../components/Chirp/Chirp'
import isEmpty from 'lodash'

const  Feed = (props) => {
  const [chirpFieldData, setChirpFieldData] = React.useState('');
  const [chirpData, setChirpData] = React.useState(null);
  const [loadNew, setLoadNew] = React.useState(false);
  const [loadMore, setLoadMore] = React.useState(false);
  // loadMore will be used later to load 10 chirps at a time
  // then load more when user scrolls farther. Do this to cut down
  // on amount of data sent back to user at one time
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [msg, setMsg] = React.useState('');

  const cookie = new Cookies();
  const token = cookie.get('x-auth-token');

  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios({
          method: 'get',
          url: 'http://localhost:8000/api/chirp',
          headers: {
            'x-auth-token': token
          }
        });
        setChirpData(res.data.chirps);
      } catch (err) {
        setMsg(`${err.message}. Could not load Chirps! Try refreshing page.`)
        setError(true)
      }
    }
    fetchData();
  }, [loadNew, token])

  const shareChirp = async () => {
    try {
      const res = await axios({
        method: 'post',
        url: 'http://localhost:8000/api/chirp',
        data: {
          content: chirpFieldData       
        },
        headers: {
          'x-auth-token': token
        }
      });
  
      if (res.status === 200) {
        setChirpFieldData('');
        setLoadNew(!loadNew)
        setMsg('Chirp shared successfully.')
        setSuccess(true)
      }
      else {
        setMsg(`Status: ${res.status}. Could not share Chirp! Try refreshing page.`)
        setError(true)
      }
    } catch (err) {
      setMsg(`${err.message}. Could not share Chirp! Try refreshing page.`)
      setError(true)
    }
  }

  const handleEdit = async (id, chirpContent) => {
    try {
      const res = await axios({
          method: 'patch',
          url: `http://localhost:8000/api/chirp/${id}`,
          data: {
            content: chirpContent       
          },
          headers: {
            'x-auth-token': token
          }
      });

      if (res.status === 200) {
          const foundIndex = chirpData.findIndex(el => el._id === id)
          let newData = chirpData
          newData[foundIndex] = {
            ...newData[foundIndex],
            content: chirpContent
          }
          setChirpData(newData)
          setMsg('Chirp updated successfully.')
          setSuccess(true)
      }
      else {
        setMsg(`Status: ${res.status}. Could not update Chirp! Try refreshing page.`)
        setError(true)
      }
    } catch (err) {
      setMsg(`${err.message}. Could not update Chirp! Try refreshing page.`)
      setError(true)
    }
  }

  const handleDelete = async (id) => {
    try {
      const res = await axios({
          method: 'delete',
          url: `http://localhost:8000/api/chirp/${id}`,
          headers: {
            'x-auth-token': token
          }
      });
      
      if (res.status === 200) {
          let newData = chirpData
          newData = newData.filter(el => el._id !== id)
          setChirpData(newData)
          setMsg('Chirp deleted successfully.')
          setSuccess(true)
      }
      else {
        setMsg(`Status: ${res.status}. Could not delete Chirp! Try refreshing page.`)
        setError(true)
      }
    } catch (err) {
      setMsg(`${err.message}. Could not delete Chirp! Try refreshing page.`)
      setError(true)
    }
  }

  const handleLoadingNew = () => {
    setLoadNew(!loadNew)
  }

  const renderMessage = () => {
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
  }

  const renderChirps = () => {
    let chirps;
    if (chirpData !== null) {
      chirps = chirpData.map(chirp => {
        if (isEmpty(chirp)) {
          const { name, username, isOwned, content, likes, retweets, updatedAt, _id } = chirp;
          let now = new Date();
          let time = now - Date.parse(updatedAt); // in ms
          time = Math.floor(time / 1000);
          if (time < 60) time = time.toString() + 's'
          else if (time < 3600) {
            time = Math.floor(time / 60)
            time = time.toString() + 'm'
          }
          else if (time < (3600*24)) {
            time = Math.floor(time / 3600) // to hour
            time = time.toString() + 'h'
          }
          else {
            time = Math.floor(time / (3600*24)); // to days
            time = time.toString() + 'd'
          }
          const data = { name, username, content, likes, retweets, time, isOwned, _id };
          return (
            <Chirp
              className="mb-4"
              data={data}
              loadNew={handleLoadingNew}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
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
        {chirps}
      </>
    )
  }

  return (
    <Container className="mt-4">
      {renderMessage()}
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
          <div className="sticky-top" style={{top: 'calc(56px + 1.5rem)'}}>
            <Card className="shadow">
              <Card.Body>
              <h4 className="lead">Your recent followers</h4>
              <hr/>
              <ul style={{listStyle: 'none', margin: 0, padding: 0}}>
                <li style={{position: 'relative'}} className="p-2">
                  <Image style={{position: 'absolute', maxWidth: '35px', left: 0, top: '50%', transform: 'translate(0, -50%)'}} className="ml-0" src="https://cdn2.iconfinder.com/data/icons/facebook-51/32/FACEBOOK_LINE-01-512.png" roundedCircle/>
                  <span className="ml-5">
                    @justin
                  </span>
                  <Button size="sm" variant="outline-primary" style={{position: 'absolute', right: 0}}>Follow</Button>
                </li>
                <li style={{position: 'relative'}} className="p-2">
                  <Image style={{position: 'absolute', maxWidth: '35px', left: 0, top: '50%', transform: 'translate(0, -50%)'}} className="ml-0" src="https://cdn2.iconfinder.com/data/icons/facebook-51/32/FACEBOOK_LINE-01-512.png" roundedCircle/>
                  <span className="ml-5">
                    @pranay
                  </span>
                  <Button size="sm" variant="outline-primary" style={{position: 'absolute', right: 0}}>Follow</Button>
                </li>
                <li style={{position: 'relative'}} className="p-2">
                  <Image style={{position: 'absolute', maxWidth: '35px', left: 0, top: '50%', transform: 'translate(0, -50%)'}} className="ml-0" src="https://cdn2.iconfinder.com/data/icons/facebook-51/32/FACEBOOK_LINE-01-512.png" roundedCircle/>
                  <span className="ml-5">
                    @keith
                  </span>
                  <Button size="sm" variant="outline-primary" style={{position: 'absolute', right: 0}}>Follow</Button>
                </li>
                <li style={{position: 'relative'}} className="p-2">
                  <Image style={{position: 'absolute', maxWidth: '35px', left: 0, top: '50%', transform: 'translate(0, -50%)'}} className="ml-0" src="https://cdn2.iconfinder.com/data/icons/facebook-51/32/FACEBOOK_LINE-01-512.png" roundedCircle/>
                  <span className="ml-5">
                    @dylan
                  </span>
                  <Button size="sm" variant="outline-primary" style={{position: 'absolute', right: 0}}>Follow</Button>
                </li>
              </ul>
              </Card.Body>
            </Card>
            <Card className="shadow mt-4">
              <Card.Body>
                <h4 className="lead">People you may like</h4>
                <hr/>
                <ul style={{listStyle: 'none', margin: 0, padding: 0}}>
                  <li style={{position: 'relative'}} className="p-2">
                    <Image style={{position: 'absolute', maxWidth: '35px', left: 0, top: '50%', transform: 'translate(0, -50%)'}} className="ml-0" src="https://cdn2.iconfinder.com/data/icons/facebook-51/32/FACEBOOK_LINE-01-512.png" roundedCircle/>
                    <span className="ml-5">
                      @beautifulkenzie
                    </span>
                    <Button size="sm" variant="outline-primary" style={{position: 'absolute', right: 0}}>Follow</Button>
                  </li>
                  <li style={{position: 'relative'}} className="p-2">
                    <Image style={{position: 'absolute', maxWidth: '35px', left: 0, top: '50%', transform: 'translate(0, -50%)'}} className="ml-0" src="https://cdn2.iconfinder.com/data/icons/facebook-51/32/FACEBOOK_LINE-01-512.png" roundedCircle/>
                    <span className="ml-5">
                      @bimbopjoe
                    </span>
                    <Button size="sm" variant="outline-primary" style={{position: 'absolute', right: 0}}>Follow</Button>
                  </li>
                  <li style={{position: 'relative'}} className="p-2">
                    <Image style={{position: 'absolute', maxWidth: '35px', left: 0, top: '50%', transform: 'translate(0, -50%)'}} className="ml-0" src="https://cdn2.iconfinder.com/data/icons/facebook-51/32/FACEBOOK_LINE-01-512.png" roundedCircle/>
                    <span className="ml-5">
                      @gladchad
                    </span>
                    <Button size="sm" variant="outline-primary" style={{position: 'absolute', right: 0}}>Follow</Button>
                  </li>
                  <li style={{position: 'relative'}} className="p-2">
                    <Image style={{position: 'absolute', maxWidth: '35px', left: 0, top: '50%', transform: 'translate(0, -50%)'}} className="ml-0" src="https://cdn2.iconfinder.com/data/icons/facebook-51/32/FACEBOOK_LINE-01-512.png" roundedCircle/>
                    <span className="ml-5">
                      @bollymolly
                    </span>
                    <Button size="sm" variant="outline-primary" style={{position: 'absolute', right: 0}}>Follow</Button>
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  )
};

export default Feed
