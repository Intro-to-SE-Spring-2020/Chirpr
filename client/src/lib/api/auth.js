import Cookies from 'universal-cookie';

export const isAuthed = () => {
    // check if token is present in cookies
    const cookies = new Cookies()
    let token = cookies.get('x-auth-token')

    // verify token is valid with api
    return token ? true : false
}

export const logout = () => {
    const cookies = new Cookies()
    cookies.remove('x-auth-token')
}
