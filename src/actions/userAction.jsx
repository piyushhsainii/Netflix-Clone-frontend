import React from 'react'
import { CLEAR_ERRORS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS }  from '../constants/user'
import axios from 'axios'

const config = {
    headers:{
        "Content-Type":"application/json",
        credentials:'include',
    },
    withCredentials:true
}
export const userAction = (email , password ) => async(dispatch) => {
    try {
        dispatch({
            type:LOGIN_REQUEST
        })

        const  { data } = await axios.post('http://localhost:5000/login',
        {email,password},
        config
        )
        dispatch({
            type:LOGIN_SUCCESS,
            payload:data

        })
    } catch (error) {
        dispatch({
            type:LOGIN_FAIL,
            payload:error.response.data
        })
    }
}
export const LoadUser = () => async(dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            credentials:'include',
        },
        withCredentials: true
    }

    try {
        dispatch({
            type:LOAD_USER_REQUEST
        })

        const  { data } = await axios.get('http://localhost:5000/getMyDetails',
        config
        )
        dispatch({
            type:LOAD_USER_SUCCESS,
            payload:data

        })
    } catch (error) {
        dispatch({
            type:LOAD_USER_FAIL,
            payload:error.response.data
        })
    }
}

export const clearErrors = () => (dispatch) => {
    dispatch({type:CLEAR_ERRORS});
}

export default userAction
