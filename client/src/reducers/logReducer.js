import { DEFAULT_VALUE } from '../actions/types'

const initialState = {
    //set your initial state
    value: null
}

export default ( state = initialState, action ) => {   
    switch(action.type){
        case DEFAULT_VALUE:
            return {
                ...state,
                value : "default"
            }
        default:
            return state
    }
}