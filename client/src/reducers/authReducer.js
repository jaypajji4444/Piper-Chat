import { LOGGEDIN_VALUE } from '../actions/types'

const initialState = {
    //set your initial state
    loggedIn: false, 
    authToken: ''
}

export default ( state = initialState, action ) => {   
    switch(action.type){
        case LOGGEDIN_VALUE:
            return {
                ...state,
                loggedIn: true
            };
        default:
            return state
    }
}