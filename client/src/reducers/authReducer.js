import { LOGGEDIN_VALUE, STORE_TOKEN, LOGOUT_USER } from '../actions/types'

const initialState = {
    //set your initial state
    loggedIn: false, 
    token: ''
}

export default ( state = initialState, action ) => {   
    switch(action.type){
        case LOGGEDIN_VALUE:
            return {
                ...state,
                loggedIn: true
            };
        case STORE_TOKEN:
            return{
                ...state,
                token: action.payload
            }
        case LOGOUT_USER:
            return{
                ...state,
                loggedIn: false,
                token: ''
            }
        default:
            return state
    }
}