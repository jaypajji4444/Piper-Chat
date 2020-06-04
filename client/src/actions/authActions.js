

import { LOGGEDIN_VALUE, AUTH_START, AUTH_FAIL, AUTH_SUCCESS, AUTH_LOGOUT } from './types';

// set loggedIn value to true
export const loginUser = () => {
    return {
        type: LOGGEDIN_VALUE
    }
}

// Start the auth_Process
export const authStart = () => {
    return {
        type: AUTH_START
    }
}

// Failure of Authentication
export const authFail = (error) => {
    return {
        type: AUTH_FAIL,
        error: error
    };
};

// Auth Success
export const authSuccess = (token, userId) => {
    return {
        type: AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};


export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password
        }

        fetch(`http://localhost:5000/api/v1/auth/login`, {
            method: 'POST',
            body: JSON.stringify(authData),
            headers: {
                'Content-Type': 'application/json',
                'Authentication': ''
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success === true) {
                    localStorage.setItem('token', data.token);
                    dispatch(authSuccess(data.token));
                } else {
                    dispatch(authFail(data.error));
                }
            })
        

    }
}




// Logout
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    return {
        type: AUTH_LOGOUT
    };
};



