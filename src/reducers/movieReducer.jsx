import { CLEAR_ERRORS } from '../constants/list'
import { GET_RANDOM_MOVIE_REQUEST , GET_RANDOM_MOVIE_SUCCESS , GET_RANDOM_MOVIE_FAIL } from '../constants/movie'


export const getRandomMovieReducer = (state={movie:[]},action)=>{
    switch (action.type) {
        case GET_RANDOM_MOVIE_REQUEST:
            return {
                ...state,
                loading:true
            }
        case GET_RANDOM_MOVIE_SUCCESS:
            return {
                ...state,
                loading:false,
                movie:action.payload.movie
            }
        case GET_RANDOM_MOVIE_FAIL:
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