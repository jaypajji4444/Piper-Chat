import {FETCH_FAIL,FETCH_USERS,CHAT_OPEN, CHAT_OPEN_ERROR, ADD_PRIVATE_MESSAGE, OPEN_CHATBOX} from "../actions/types"
const initialState={
    chat:null,
    messages:[],
    chats:null,
    users:null,
    loading:false,
    messages: [],
    error:null,
    displayBox: 0
}

const addPrivateMessage=(state,action)=>{
    //######## oLD @@@@@@
    // let oldChat=state.chat
    // if(oldChat._id===action.chatID){
    //     oldChat.messages.push(action.message)
    // }
    // return{
    //     ...state,
    //     chat:oldChat,
    //     error:false
    // }

    return {
        ...state,
        chat:{
            ...state.chat,
            messages:action.messages
        },
        messages:action.messages
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
                messages:action.messages,
                otherUser:action.otherUser,
                error:null,
                loading:false
            }
        case CHAT_OPEN_ERROR:
            return{
                ...state,
                chat:null,
                messages:null,
                otherUser:null,
                error:action.error,
                loading:false
            }
        case ADD_PRIVATE_MESSAGE:
            return{
                ...state,
                chat:{
                    ...state.chat,
                    
                },
                messages:action.messages

            }
        case OPEN_CHATBOX:
            return{
                ...state,
                displayBox: action.payload
            }
        default:
            return state;
    }
}

export default chatReducer;