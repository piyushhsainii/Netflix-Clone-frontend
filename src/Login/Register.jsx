import React, { Fragment, useEffect, useState } from 'react'
import './register.css'
import { Button, Typography } from '@material-ui/core'
import { Link,  useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {  LoadUser, registerUser} from '../actions/userAction' 
import Loader from '../loader/Loader'
import toast from 'react-hot-toast'
import { CLEAR_ERRORS } from '../constants/list'

const Register = () => {
    const {isAuthenticated, loading, error} = useSelector((state)=>state.signUp)
    const {isAuthenticated:isAuthenticated2, loading:loading2} = useSelector((state)=>state.User)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [name, setname] = useState()
    const [email, setemail] = useState()
    const [password, setpassword] = useState()

    useEffect(()=>{
        // if(loading2===false){
        //     isAuthenticated2 ? navigate('/browse') : {}
        //   }
        //   if(loading===false){
        //       toast.success('User registered successfully')
        //       isAuthenticated ? navigate('/browse') : {}
        //   }
          if(isAuthenticated===true){
            toast.success("Logged In Successfully")
            navigate('/browse')

            dispatch(LoadUser())

        }
          if(error){
            toast.error(error.response.data.message)
            dispatch({type:
                CLEAR_ERRORS
            })
          }
    },[isAuthenticated2, loading2,loading , isAuthenticated, dispatch,error])

      
    const registerHandler = ()=>{
        try {
            dispatch(registerUser(name,email,password))
        } catch (error) {
            toast.error(error)
        }
    }

  return (
   <Fragment>
        { loading ? 
        <Loader/> : 
        <div className='background-overlay-signin-register' >
        <div className='login-container' >
        </div>
    
        <div className='navbar-signup-register' >
            <Link to='/' >
         <img src="netflix-logo-0.png" alt="" className='netflix-login-logo-register' />
            </Link>
        </div>
        <div className='signin-container-register' >
           
            <div>
            <Typography className='sign-in-text' > Sign Up</Typography>
            </div>
                <div>
    
                <input type="text"
                placeholder='Enter Name '
                value={name}
                onChange={(e)=>setname(e.target.value)}
                />         
                </div>
                <div>
                <input type="text"
                placeholder='Enter Email ' 
                onChange={(e)=>setemail(e.target.value)}
                value={email}
                />
                </div>
                <div>
                <input type="text"
                placeholder='Enter Password'
                onChange={(e)=>setpassword(e.target.value)}
                value={password}
                />
                </div>
                <div>
                <Button
                className='sign-btn-signin-register'
                onClick={()=>registerHandler()}
                >
                    Sign Up
                </Button>
                </div>
                <div className="new-to-netflix-box-register">
                    Already a User? <Link
                    to='/login'
                    className='sign-up-text-register'
                    >Sign In  </Link>
                </div>
           
        </div>
        </div>    
    }
   </Fragment>
  )
}

export default Register