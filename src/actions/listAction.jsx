import axios from "axios"
import { GET_LIST_FAIL, GET_LIST_REQUEST, GET_LIST_SUCCESS } from "../constants/list"

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