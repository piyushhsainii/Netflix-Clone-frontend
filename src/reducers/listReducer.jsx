import  {CLEAR_ERRORS, CREATE_LIST_FAIL, CREATE_LIST_REQUEST, CREATE_LIST_SUCCESS, DELETE_LIST_FAIL, DELETE_LIST_REQUEST, DELETE_LIST_SUCCESS, GET_ALL_LIST_FAIL, GET_ALL_LIST_REQUEST, GET_ALL_LIST_SUCCESS, GET_LIST_FAIL, GET_LIST_REQUEST, GET_LIST_SUCCESS, REMOVE_FROM_LIST_FAIL, REMOVE_FROM_LIST_REQUEST, REMOVE_FROM_LIST_SUCCESS, RESET_STATE_MOVIE} from '../constants/list'
import { RESET_MOVIE } from '../constants/movie'

export const getListReducer = (state={list:{}},action)=>{
    switch (action.type) {
        case GET_LIST_REQUEST:
            return {
                ...state,
                loading:true
            }
        case GET_LIST_SUCCESS:

            return {
                ...state,
                loading:false,
                list:action.payload.list
            }
        case GET_LIST_FAIL:
            return {
                ...state,
                loading:false,
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
export const getListReducer2 = (state={list:{}},action)=>{
    switch (action.type) {
        case GET_ALL_LIST_REQUEST:
            return {
                ...state,
                loading:true
            }
        case GET_ALL_LIST_SUCCESS:

            return {
                ...state,
                loading:false,
                list:action.payload.list
            }
        case GET_ALL_LIST_FAIL:
            return {
                ...state,
                loading:false,
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
export const createListReducer = (state={list:{}},action)=>{
    switch (action.type) {
        case CREATE_LIST_REQUEST:
        case DELETE_LIST_REQUEST:
            return {
                ...state,
                loading:true
            }
        case CREATE_LIST_SUCCESS:
        case DELETE_LIST_SUCCESS:
            return {
                ...state,
                loading:false,
                list:action.payload.list,
                success:action.payload.success
            }
        case CREATE_LIST_FAIL:
        case DELETE_LIST_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload,
                success:false
            }
        case CLEAR_ERRORS:
            return {
                error:null
            }
        case RESET_MOVIE:
            return {
            ...state,
            loading:false,
            success:false
        }
        default:
       return state
    }
}
export const DeleteListElementReducer = (state={},action)=>{
    switch (action.type) {
        case REMOVE_FROM_LIST_REQUEST:
            return {
                ...state,
                loading:true
            }
        case REMOVE_FROM_LIST_SUCCESS:
            return {
                ...state,
                loading:false,
                success:action.payload.success,
            }
        case REMOVE_FROM_LIST_FAIL:
            return {
                ...state,
                loading:false,
                success:false,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return {
                error:null
            }
        case RESET_STATE_MOVIE :
            return {
            ...state,
            loading:false,
            success:false
        }
        default:
       return state
    }
}
