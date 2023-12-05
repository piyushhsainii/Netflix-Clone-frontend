import axios from "axios"
import { CREATE_LIST_FAIL, CREATE_LIST_REQUEST, CREATE_LIST_SUCCESS, GET_LIST_FAIL, GET_LIST_REQUEST, GET_LIST_SUCCESS } from "../constants/list"

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

        const  { data } = await axios.get(`http://localhost:5000/getList?type=${type ? type :''}&genre=${genre ? genre : ''}`    
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

export default getListAction

export const createListAction = ( title='My List', type='MyList' , genre='MyList', content )=> async( dispatch )=>{
    try {
        dispatch({
            type: CREATE_LIST_REQUEST
        }) 

        const  { data } = await axios.get(`http://localhost:5000/createlist` , 
        {title, type , genre, content}, 
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
