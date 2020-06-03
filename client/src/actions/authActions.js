import { LOGGEDIN_VALUE } from './types';

// set loggedIn value to true
export const loginUser = () => {
    return {
        type: LOGGEDIN_VALUE
    }
}