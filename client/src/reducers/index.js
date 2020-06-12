import { combineReducers } from 'redux';
import authReducer from './authReducer';
import chatReducer from "./chatReducer";
import alertReducer from "./alert";

export default combineReducers({
    auth : authReducer,
    chat : chatReducer,
    alert : alertReducer
})