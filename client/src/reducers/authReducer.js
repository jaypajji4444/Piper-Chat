import { AUTH_FAIL,AUTH_LOGOUT,AUTH_START,AUTH_SUCCESS,REGISTER_SUCCESS,USER_LOADED, UPDATE_USER,UPDATE_FAIL,TAB_STATUS, FORGOT_PASS, RESET_PASS, TAB_SOCIAL} from '../actions/types'


const initialState = {
    loggedIn:false,
    token: null,
    error: null,
    loading: false,
    authRedirectPath: '/register',
    user:null,
    tabVal: 0,
    tabValSocial: 0,
    resetDone: false,
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
                authRedirectPath:"/register",
                user:null
            }
        case UPDATE_USER:
            return{
                ...state,
                authRedirectPath:'/chat',
                user:action.user,
                loading:false
            } 
        case UPDATE_FAIL:
            return{
                ...state,
                authRedirectPath:'/chat',
                loading:false,
                error:action.error
            }
        case TAB_STATUS:
            return{
                ...state,
                tabVal: action.tabVal
            }
        case TAB_SOCIAL:
            return{
                ...state,
                tabValSocial: action.tabValSocial
            }
        case FORGOT_PASS:
            return{
                ...state,
                authRedirectPath: "/login",
                loading:false
            }    
        case RESET_PASS:
            return{
                ...state,
                authRedirectPath: "login",
                loading: false,
                resetDone: true
            }

        default:
            return state
    }
}