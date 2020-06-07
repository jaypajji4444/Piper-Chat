import * as actions from "./types";

export  const fetchUsers = () => async dispatch => {
    try {
        const response = await fetch("http://localhost:5000/api/v1/users", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const users = await response.json();
        console.log(users)
        
    }
    catch (err) {
        dispatch({
            type:actions.FETCH_FAIL,
            error:err
        })
    }
}