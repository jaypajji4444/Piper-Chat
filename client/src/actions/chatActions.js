import * as actions from "./types";

export  const fetchUsers = () => async dispatch => {
    try {
        const response = await fetch("http://localhost:5000/api/v1/auth/users", {
            method: 'GET'
        })
        const res = await response.json();
        console.log(res)
        dispatch({
            type:actions.FETCH_USERS,
            users:res.data
        })
        
    }
    catch (err) {
        console.log(err)
        dispatch({
            type:actions.FETCH_FAIL,
            error:err
        })
    }
}

 export const newChat =(chat)=>async dispatch=>{
    dispatch({
        type:actions.CHAT_OPEN,
        chat:chat
    })
}