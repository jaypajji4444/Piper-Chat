import {FETCH_FAIL,FETCH_USERS,CHAT_OPEN, CHAT_OPEN_ERROR, ADD_PRIVATE_MESSAGE, OPEN_CHATBOX} from "../actions/types"
const initialState={
    chat:null,
    chats:null,
    users:null,
    loading:false,
    error:null,
    displayBox: 0
}

const addPrivateMessage=(state,action)=>{

    let oldChat=state.chat
    if(oldChat._id===action.chatID){
        oldChat.messages.push(action.message)
    }
    return{
        ...state,
        chat:oldChat,
        error:false
    }

}

const chatReducer = (state=initialState,action)=>{
    switch (action.type) {
        case FETCH_USERS:
            return{
                ...state,
                loading:false,
                error:null,
                users:action.users
            }
        case FETCH_FAIL:
            return{
                ...state,
                loading:false,
                error:action.error,
                users:null
            }
        case CHAT_OPEN:
            return{
                ...state,
                chat:action.chat,
                otherUser:action.otherUser,
                error:null,
                loading:false
            }
        case CHAT_OPEN_ERROR:
            return{
                ...state,
                chat:null,
                otherUser:null,
                error:action.error,
                loading:false
            }
        case OPEN_CHATBOX:
            return{
                ...state,
                displayBox: action.value
            }
        case ADD_PRIVATE_MESSAGE:addPrivateMessage(state,action)
        default:
            return state;
    }
}

export default chatReducer;