import {FETCH_FAIL,FETCH_USERS} from "../actions/types"
const initialState={
    chat:null,
    chats:null,
    users:null,
    loading:false,
    error:null
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
        default:
            return state;
    }
}

export default chatReducer;