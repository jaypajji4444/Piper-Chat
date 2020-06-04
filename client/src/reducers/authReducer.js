import { AUTH_FAIL,AUTH_LOGOUT,AUTH_START,AUTH_SUCCESS,REGISTER_SUCCESS } from '../actions/types'

const initialState = {
    loggedIn:false,
    token: null,
    error: null,
    loading: false,
    authRedirectPath: '/register'
}

export default ( state = initialState, action ) => {   
    switch(action.type){
        case AUTH_START:
            return {
                ...state,
                loading:true,
                error:null
            };
        case AUTH_SUCCESS:
            return{
                ...state,
                token: action.token,
                loading:false,
                error:null,
                loggedIn:true,
                authRedirectPath:"/chat"
            }
        case AUTH_FAIL:
            return{
                ...state,
                loading:false,
                error:action.error,
                loggedIn:false,
                authRedirectPath:"/register"
            
            }
        case REGISTER_SUCCESS:
            return{
                ...state,
                loading:false,
                authRedirectPath:"/login"
            }
        case AUTH_LOGOUT:
            return{
                ...state,
                loggedIn: false,
                token: null,
                loggedIn:false,
                authRedirectPath:"/register"
            }

        default:
            return state
    }
}