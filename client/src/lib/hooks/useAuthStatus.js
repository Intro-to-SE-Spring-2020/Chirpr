import { useState, useEffect } from 'react'
import { withCookies, useCookies } from 'react-cookie'

export default function useAuthStatus(logout) {
    const [isAuthed, setIsAuthed] = useState(false);
    const [cookies, setCookies, removeCookies] = useCookies();

    useEffect(() => {
        if (!logout) {
            if (cookies["x-auth-token"]) {
                setIsAuthed(true)
            }
        } else {
            removeCookies('x-auth-token')
            setIsAuthed(false)
        }
    }, [cookies["x-auth-token"], logout]);
    
    return isAuthed;
}