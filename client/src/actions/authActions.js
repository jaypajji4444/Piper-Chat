import { LOGGEDIN_VALUE, STORE_TOKEN, LOGOUT_USER } from './types';

// set loggedIn value to true
export const loginUser = () => {
    return {
        type: LOGGEDIN_VALUE
    }
}

// store token upon loggin in
export const storeToken = (payload) => {
    return {
        type: STORE_TOKEN,
        payload: payload
    }
}

// logout user
export const logoutUser = () => {
    return {
        type: LOGOUT_USER
    }
}