import  {CLEAR_ERRORS, GET_LIST_FAIL, GET_LIST_REQUEST, GET_LIST_SUCCESS} from '../constants/list'

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