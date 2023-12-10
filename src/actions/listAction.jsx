import axios from "axios"
import { CREATE_LIST_FAIL, CREATE_LIST_REQUEST, CREATE_LIST_SUCCESS, GET_ALL_LIST_FAIL, GET_ALL_LIST_REQUEST, GET_ALL_LIST_SUCCESS, GET_LIST_FAIL, GET_LIST_REQUEST, GET_LIST_SUCCESS, REMOVE_FROM_LIST_FAIL, REMOVE_FROM_LIST_REQUEST, REMOVE_FROM_LIST_SUCCESS } from "../constants/list"

const localserver = 'http://localhost:5000'
const mainserver = 'https://netflix-clone-iaj6.onrender.com'


const config = {
    headers:{
        "Content-Type":"application/json",
        credentials:'include',
    },
    withCredentials:true
}

const getListAction = ( type = '', genre = ''  )=> async( dispatch )=>{
    try {
        dispatch({
            type:GET_LIST_REQUEST
        }) 

        const  { data } = await axios.get(`${mainserver}/getList?type=${type ? type :''}&genre=${genre ? genre : ''}`    
        ,config)

        dispatch({
            type:GET_LIST_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:GET_LIST_FAIL,
            payload:error
        })
    }
}
export const getAllListAction = ( type = '', genre = ''  )=> async( dispatch )=>{
    try {
        dispatch({
            type:GET_ALL_LIST_REQUEST
        }) 

        const  { data } = await axios.get(`${mainserver}/getList?type=${type ? type :''}&genre=${genre ? genre : ''}`    
        ,config)

        dispatch({
            type:GET_ALL_LIST_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:GET_ALL_LIST_FAIL,
            payload:error
        })
    }
}

export default getListAction

export const createListAction = (content , id , title='My List', type='MyList' , genre='MyList',  )=> async( dispatch )=>{
    try {
        dispatch({
            type: CREATE_LIST_REQUEST
        }) 

        const  { data } = await axios.put(`${mainserver}/CreateandUpdateMyList` , 
        {title, type , genre, content , id}, 
        config)

        dispatch({
            type:CREATE_LIST_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:CREATE_LIST_FAIL,
            payload:error
        })
    }
}

export const RemoveFromListAction = (content , id )=> async( dispatch )=>{
    try {
        dispatch({
            type: REMOVE_FROM_LIST_REQUEST
        }) 
        
        const  { data } = await axios.put(`${mainserver}/deleteElementMyList` , 
        {content , id}, 
        config)

        dispatch({
            type:REMOVE_FROM_LIST_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:REMOVE_FROM_LIST_FAIL,
            payload:error
        })
    }
}
