import axios from 'axios'

const API_URL = 'api/users/'

// for each function the parameters required to run the backend http request are passed as arguements, after this axios is used to run the backend http requests, once the user is registered or logged in the user is set in the local storage, and if logged out it is removed from local storage

// register user                        
const register = async (userData) => { 
    const response = await axios.post(API_URL, userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// logout user
const logout = () => {
    localStorage.removeItem('user')
}

const authService = {register, login, logout}

export default authService