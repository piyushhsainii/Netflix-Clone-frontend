import { CLEAR_ERRORS, 
    LOGIN_FAIL,
     LOGIN_REQUEST, 
     LOGIN_SUCCESS,
     LOAD_USER_REQUEST,
     LOAD_USER_SUCCESS,
     LOAD_USER_FAIL,
     SIGNUP_REQUEST,
     SIGNUP_SUCCESS,
     SIGNUP_FAIL,
     SIGNOUT_USER_REQUEST,
     SIGNOUT_USER_SUCCESS,
     SIGNOUT_USER_FAIL,
     SIGNOUT_USER_RESET,
     UPDATE_USER_REQUEST,
     UPDATE_USER_SUCCESS,
     UPDATE_USER_FAIL,
     UPDATE_RESET_USER_FAIL,
    
    }from '../constants/user'


const UserLoginReducer = (state={user:{}},action)=>{
    switch (action.type) {
        case LOGIN_REQUEST:
            return{
                ...state,
                loading:true,
                isAuthenticated:false
            }
        case LOGIN_SUCCESS:
            return{
                ...state,
                loading:false,
                isAuthenticated:true,
                user:action.payload.user
            }
       
        case LOGIN_FAIL:
            return{
                ...state,
                loading:false,
                isAuthenticated:false,
                error:action.payload
            }


        case CLEAR_ERRORS:
            return {
                error:null
            }
        default: 
            return state
    }
}
export const LoadUser = (state={user:{}},action)=>{
    switch (action.type) {
        case LOAD_USER_REQUEST:
        case SIGNOUT_USER_REQUEST:
            return{
                ...state,
                loading:true,
                isAuthenticated:false
            }
        case LOAD_USER_SUCCESS:
            return{
                ...state,
                loading:false,
                isAuthenticated:true,
                user:action.payload.user
            }

        case SIGNOUT_USER_SUCCESS:
            return{
                loading:false,
                isAuthenticated:false,
                user:null
            }
    
        case SIGNOUT_USER_FAIL:
            return {
                loading:false,
                isAuthenticated:false,
                error:action.payload
            }

        case LOAD_USER_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload,
                isAuthenticated:false

            }
        case CLEAR_ERRORS:
            return {
                error:null
            }
        default: 
            return state
    }
}

export default UserLoginReducer


export const signUpReducer = (state={user:{}}, action)=>{
    switch (action.type) {
        case SIGNUP_REQUEST:
            return {
                ...state,
                loading:true
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                loading:false,
                isAuthenticated:true,
                user:action.payload.user
            }
        case SIGNUP_FAIL:
            return {
                ...state,
                loading:false,
                isAuthenticated:false,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return{
                error:null
            }
    
        default:
        return state;
    }
}


export const updateUser = (state={},action)=> {
    switch (action.type) {
        case UPDATE_USER_REQUEST:
            return {
                ...state,
                loading:true
            }
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading:false,
                success:action.payload.success
            }
        case UPDATE_USER_FAIL:
            return {
                ...state,
                loading:false,
                success:false
            }
        case UPDATE_RESET_USER_FAIL:
            return {
                ...state,
                loading:false,
                success:false
            }
    
        default:
            return state
    }
}