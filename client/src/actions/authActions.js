

import { AUTH_START, AUTH_FAIL, AUTH_SUCCESS, AUTH_LOGOUT, REGISTER_SUCCESS } from './types';



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
        token: token
    };
};


export const authUser = (authData) => {
    return dispatch => {
        dispatch(authStart());
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


// Register 
export const register = (formData) => dispatch => {
    dispatch(authStart())
    fetch(`http://localhost:5000/api/v1/auth/register`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (data.success === true) {
                dispatch({
                    type:REGISTER_SUCCESS
                })
            } else {
                dispatch(authFail(data.error));
            }
        })
}


// Logout
export const logout = () => {
    localStorage.removeItem('token');
    return {
        type: AUTH_LOGOUT
    };
};



