import { CLEAR_ERRORS, 
    LOGIN_FAIL,
     LOGIN_REQUEST, 
     LOGIN_SUCCESS,
     LOAD_USER_REQUEST,
     LOAD_USER_SUCCESS,
     LOAD_USER_FAIL,
    
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