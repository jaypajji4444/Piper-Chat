import { AUTH_FAIL,AUTH_LOGOUT,AUTH_START,AUTH_SUCCESS,REGISTER_SUCCESS,USER_LOADED, UPDATE_USER} from '../actions/types'


const initialState = {
    loggedIn:false,
    token: null,
    error: null,
    loading: false,
    authRedirectPath: '/register',
    user:null
}

export default ( state = initialState, action ) => {   
    switch(action.type){
        case USER_LOADED:
            return{
                ...state,
                loading:false,
                loggedIn:true,
                user:action.user
            }
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
                authRedirectPath:"/register",
            
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
                authRedirectPath:"/register",
                user:null
            }
        case UPDATE_USER:
            return{
                ...state,
                authRedirectPath:'/chat'
            }    

        default:
            return state
    }
}