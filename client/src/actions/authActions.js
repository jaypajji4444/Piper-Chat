

import { AUTH_START, AUTH_FAIL, AUTH_SUCCESS, AUTH_LOGOUT, REGISTER_SUCCESS ,USER_LOADED, UPDATE_USER, UPDATE_FAIL, TAB_STATUS, FORGOT_PASS, RESET_PASS, TAB_SOCIAL } from './types';

// Load User
export const loadUser = (token) => async dispatch => {
    try {
        const res = await fetch("http://localhost:5000/api/v1/auth/me",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+token
            },
        });
        const data=await res.json()
        
        console.log(data)
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
                    dispatch(loadUser(data.token))
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
                    type: REGISTER_SUCCESS
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

// Update user creds
export const updateUser = ({ name, email, token }) => {
    return dispatch => {
        dispatch(authStart());
        fetch(`http://localhost:5000/api/v1/auth/updatedetails`, {
            method: 'PUT',
            body: JSON.stringify({name,email}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+token
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success === true) {
                    dispatch({
                        type:UPDATE_USER,
                        user:data.data
                    })
                } else {
                    dispatch({
                        type:UPDATE_FAIL,
                        error:data.data
                    });
                }
            })
    }
}

// set tab status (chat)
export const tabStatus = (val) => {
    return{
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
    fetch(`http://localhost:5000/api/v1/auth/forgotpassword`, {
      method: 'POST',
      body: JSON.stringify({email: email}),
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
        } else {
          dispatch({
            type: UPDATE_FAIL,
            error: data.data,
          });
        }
      });
  };
};

// change password
export const resetPass = (payload) => {
  return (dispatch) => {
    dispatch(authStart());
    fetch(`http://localhost:5000/api/v1/auth/resetpassword/${payload.resetToken}`, {
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
        } else {
          dispatch({
            type: UPDATE_FAIL,
            error: data.data,
          });
        }
      });
  };
};

