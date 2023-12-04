import axios from "axios"
import { GET_MOVIE_FAIL, GET_MOVIE_REQUEST, 
    GET_MOVIE_SUCCESS,
    GET_RANDOM_MOVIE_REQUEST,
    GET_RANDOM_MOVIE_SUCCESS,
    GET_RANDOM_MOVIE_FAIL,
} from '../constants/movie'

const config = {
    headers:{
        "Content-Type":"application/json",
        credentials:'include',
    },
    withCredentials:true
}

const getMovie = ({id})=> async( dispatch )=>{
    try { 
        dispatch({
            type:GET_MOVIE_REQUEST
        })

        const  { data } = await axios.get(`http://localhost:5000/getMovie/${id}`    
        ,config)

        dispatch({
            type:GET_MOVIE_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:GET_MOVIE_FAIL,
            payload:error
        })
    }
}

export default getMovie


export const getrandomMovie = (type='')=> async( dispatch )=>{
    try { 
        dispatch({ 
            type:GET_RANDOM_MOVIE_REQUEST
        })

        const  { data } = await axios.get(`http://localhost:5000/randomMovie?type=${type? type : ''}`    
        ,config)

        dispatch({
            type:GET_RANDOM_MOVIE_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:GET_RANDOM_MOVIE_FAIL,
            payload:error
        })
    }
}




