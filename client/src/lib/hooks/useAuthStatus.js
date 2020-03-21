import { useState, useEffect } from 'react'
import { withCookies, useCookies } from 'react-cookie'

export default function useAuthStatus(logout) {
    const [isAuthed, setIsAuthed] = useState(null);
    const [cookies, setCookies, removeCookies] = useCookies();

    useEffect(() => {
        async function handleEffect() {
            if (!logout) {
                if (cookies["x-auth-token"]) {
                    setIsAuthed(true)
                } else {
                    setIsAuthed(false)
                }
            } else {
                removeCookies('x-auth-token')
                setIsAuthed(false)
            }
        }
        handleEffect()
    }, [cookies["x-auth-token"], logout]);
    
    return isAuthed;
}