import { useState, useEffect, useRef } from 'react'
import { useSelector, shallowEqual } from 'react-redux'

export default function useAuthStatus() {
    const [status, setStatus] = useState(false);
    const isMounted = useRef(true)
    const { auth, network } = useSelector(state => state);

    // set isMounted to false when we unmount the component
    useEffect(() => {
        console.log('mount', status)
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
            console.log('unmount', status)
            isMounted.current = false
        }
    }, [auth, network])
    
    return status;
}