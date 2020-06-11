import * as actions from "./types";
import chatSocket from "../utils/webSockets";

export const fetchUsers = () => async dispatch => {
    try {
        const response = await fetch("http://localhost:5000/api/v1/auth/users", {
            method: 'GET'
        })
        const res = await response.json();
        console.log(res)
        dispatch({
            type: actions.FETCH_USERS,
            users: res.data
        })

    }
    catch (err) {
        console.log(err)
        dispatch({
            type: actions.FETCH_FAIL,
            error: err
        })
    }
}

export const newChat = (user,otherUser,token) => async dispatch => {
    
    try{
        console.log("other:",otherUser._id)
        console.log("current:", user._id)
        const dataObj = {
            to: user._id,
            from: otherUser._id
        }
        //socket.emit("authenticate",token)
        chatSocket.authenticate(token)
        const res = await fetch("http://localhost:5000/api/v1/chat", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataObj)
        })
    
        const chat = await res.json()
        
        //socket.emit("open chat",chat._id)
        chatSocket.openChat(chat._id)

        dispatch({
            type: actions.CHAT_OPEN,
            chat: chat,
            otherUser: otherUser,
            messages: chat.messages
        })
    
    }
    catch(err){
        dispatch({
            type:actions.CHAT_OPEN_ERROR,
            error:err
        })
    }

}

export const addMessage = (data) => dispatch=>{
    dispatch({
        type:actions.ADD_PRIVATE_MESSAGE,
        message:data.message,
        // chatID:data.chatID
    })
}

export const openBox = (val) => {
    return{
        type: actions.OPEN_CHATBOX,
        value: val
    }
}