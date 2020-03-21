import { useState, useEffect } from 'react'
import { withCookies, useCookies } from 'react-cookie'

export default function useAuthStatus() {
    const [isAuthed, setIsAuthed] = useState(null);
    const [cookies, setCookies] = useCookies();

    useEffect(() => {
        if (cookies["x-auth-token"]) {
            setIsAuthed(true)
        } else {
            setIsAuthed(false)
        }
    }, [cookies["x-auth-token"]]);
    
    return isAuthed;
}