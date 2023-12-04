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
                loading:true,
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


// export const SignOut = (state={userLoggedInStatus:{}},action)=>{
//     switch (action.type) {
//         case SIGNOUT_USER_REQUEST:
//             return {
//                 ...state,
//                 loading:true
//             }
//         case SIGNOUT_USER_SUCCESS:
//             return {
//                 ...state,
//                 loading:false,
//                 userLoggedInStatus:action.payload.success
//             }
//         case SIGNOUT_USER_FAIL:               
//             return {
//                 ...state,
//                 loading:false,
//                 userLoggedInStatus:false
//             }
//         case SIGNOUT_USER_RESET :               
//             return {
//                 ...state,
//                 loading:false,
//                 userLoggedInStatus:false
//             }
//             case CLEAR_ERRORS:
//                 return{
//                     error:null
//                 }
//         default:
//             return state
//     }
// }