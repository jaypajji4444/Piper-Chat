

import { AUTH_START, AUTH_FAIL, AUTH_SUCCESS, AUTH_LOGOUT, REGISTER_SUCCESS, USER_LOADED, UPDATE_USER, UPDATE_FAIL, TAB_STATUS, FORGOT_PASS, RESET_PASS, TAB_SOCIAL, INVITE_ACCEPTED } from './types';
import { setAlert } from './alertActions';

// Load User
export const loadUser = (token) => async dispatch => {
    try {
        const res = await fetch("/api/v1/auth/me", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
            },
        });
        const data = await res.json()

        dispatch({
            type: USER_LOADED,
            user: data.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_FAIL
        });
    }
};

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
        fetch(`/api/v1/auth/login`, {
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
                    // Alert
                    dispatch(setAlert("Login Successfull", "info"))
                    dispatch(authSuccess(data.token));
                    dispatch(loadUser(data.token))
                } else {

                    dispatch(setAlert(data.error, "error"))
                    dispatch(authFail(data.error));
                }
            })
    }
}


// Register 
export const register = (formData) => dispatch => {
    dispatch(authStart())
    fetch(`/api/v1/auth/register`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.success === true) {
                dispatch({
                    type: REGISTER_SUCCESS
                })
                dispatch(setAlert("         Registration Succesfull!"))
            } else {
                dispatch(authFail(data.error));
                dispatch(setAlert("      "+data.error, "error"))
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

// Update user creds
export const updateUser = ({ name, email, token }) => {
    return dispatch => {
        dispatch(authStart());
        fetch(`/api/v1/auth/updatedetails`, {
            method: 'PUT',  
            body: JSON.stringify({ name, email }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success === true) {
                    dispatch({
                        type: UPDATE_USER,
                        user: data.data
                    })
                    //Alert
                    dispatch(setAlert('    Details Updated!', 'info'))
                } else {
                    dispatch({
                        type: UPDATE_FAIL,
                        error: data.data
                    });
                    dispatch(setAlert("    Error! Try again', 'error"))
                }
            })
    }
}

// set tab status (chat)
export const tabStatus = (val) => {
    return {
        type: TAB_STATUS,
        tabVal: val
    }
}

// set tab status (social)
export const tabSocial = (val) => {
    return {
        type: TAB_SOCIAL,
        tabValSocial: val
    }
}

// forgot password
export const forgotPass = (email) => {
    return (dispatch) => {
        dispatch(authStart());
        fetch(`/api/v1/auth/forgotpassword`, {
            method: 'POST',
            body: JSON.stringify({ email: email }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success === true) {
                    dispatch({
                        type: FORGOT_PASS
                    });
                    dispatch(setAlert('    Check you mail!', 'info'))
                } else {
                    dispatch({
                        type: UPDATE_FAIL,
                        error: data.data,
                    });
                    dispatch(setAlert('    This email does not exist', 'error'))
                }
            });
    };
};

// change password
export const resetPass = (payload) => {
    return (dispatch) => {
        dispatch(authStart());
        fetch(`/api/v1/auth/resetpassword/${payload.resetToken}`, {
            method: 'PUT',
            body: JSON.stringify({ password: `${payload.password}` }),
            headers: {
                'Content-Type': 'application/json',
            },
            })
            .then((res) => res.json())
            .then((data) => {
                if (data.success === true) {
                    dispatch({
                        type: RESET_PASS,
                    });
                    dispatch(setAlert("    Login Successful!","info"))
                } 
                else {
                    dispatch({type: UPDATE_FAIL,error: data.data})
                    dispatch(setAlert('    Invalid Credentials', 'error'))
                }

            });
        }
    }        

// Admin - accepting invites
export const adminRoute = (reqBody) => {
    return dispatch => {
        dispatch(authStart());
        console.log(reqBody)
        fetch(`/api/v1/auth/sendInvite`, {
            method: 'PUT',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((resData) => {
                if (resData.success === true) {
                    dispatch({
                        type: INVITE_ACCEPTED,
                        success: resData.success
                    })
                    dispatch(setAlert('    Invite accepted!', 'info'))
                }
                else {
                    dispatch(setAlert("    Error! Try again', 'error"))
                }
            })
            .catch((err) => console.log(err));
    }
}