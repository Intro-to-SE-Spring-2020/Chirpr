import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { history } from '../history'

export default function useAuthStatus() {
    const [status, setStatus] = useState(false);
    const isMounted = useRef(true)
    const { auth, network } = useSelector(state => state)
    const dispatch = useDispatch()

    // set isMounted to false when we unmount the component
    useEffect(() => {
        if (!network.is_loading && !network.request_error) {
            if (auth.token && auth.expiry) {
                const authed = Date.parse(auth.expiry) > Date.now();
            if (authed) {
                setStatus(true);
            }
            else setStatus(false);
            }
            else setStatus(false);
        }
        return () => {
            isMounted.current = false
        }
    }, [auth, network])

    useEffect(() => {
        return () => {
            dispatch({ type: 'REQUEST_ERROR', payload: null })
        }
    }, [history.location.pathname])
    
    return status;
}