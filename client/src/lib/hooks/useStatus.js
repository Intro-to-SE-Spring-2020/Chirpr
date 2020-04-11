import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { history } from '../history'

export default function useStatus () {
  const [status, setStatus] = useState(false)
  const isMounted = useRef(true)
  const { auth } = useSelector(state => state)
  const dispatch = useDispatch()

  // set isMounted to false when we unmount the component
  useEffect(() => {
    if (auth.token !== null) setStatus(true)
    return () => {
      isMounted.current = false
      setStatus(false)
    }
  }, [auth, history.location.pathname])

  useEffect(() => {
    return () => {
      dispatch({ type: 'REQUEST_ERROR', payload: null })
      dispatch({ type: 'REQUEST_SUCCESS', payload: null })
    }
  }, [history.location.pathname])

  return status
}
