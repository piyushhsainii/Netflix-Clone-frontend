import React, { Fragment, useEffect, useState } from 'react'
import './signin.css'
import { Button, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import Loader from '../loader/loader'
import { LoadUser, userAction } from '../actions/userAction'
import { CLEAR_ERRORS } from '../constants/user'
import axios from 'axios'
import { useNavigate  } from 'react-router-dom';

const Login = ({}) => {
    const { error,isAuthenticated, user, loading} = useSelector((state)=>state.userLogin)
    const {isAuthenticated:loaduser, loading:loaduserload} = useSelector((state)=>state.User)
    const dispatch = useDispatch()
    let navigate = useNavigate();

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')


    const signInHandler = async() =>{

        if (!email || !password) {
            toast.error('Please Fill all required fields', {
                style: { 
                    fontSize: '16px', // Set the desired font size
                }
            });
            return;
        }
        try {      
            dispatch(userAction(email , password ))

        } catch (error) {
            console.log(error.message)
        }

    }

    useEffect(()=>{
        if(error){
            toast.error(error.message)
            dispatch({type:
                CLEAR_ERRORS
            })
        }

        // if(loaduserload===false){
        //     loaduser ? navigate('/browse') : {}
        //   }

        // if(loading===false){
        //     isAuthenticated ? navigate('/browse') : {}
        //   }
      
        

        if(isAuthenticated===true){
            toast.success("Logged In Successfully")
            navigate('/browse')

            dispatch(LoadUser())

        }

    },[dispatch ,isAuthenticated, error, navigate , loaduser ,loaduserload ])

  return (
   <Fragment>
    {
        loading && 
        loading===true ? 
    <Loader/> : (
        <div className='background-overlay-signin' >
    <div className='login-container' >
    </div>

    <div className='navbar-signup' >
        <Link to='/' >
     <img src="netflix-logo-0.png" alt="" className='netflix-login-logo' />
        </Link>
    </div>
    <div className='signin-container' >    
        <div>
        <Typography className='sign-in-text' > Sign In</Typography>
        </div>

            <div>

            <input type="text"
            placeholder='Enter Email '
            onChange={(e)=>setemail(e.target.value)}
            required
            value={email}
            />
            </div>
            <div>

            <input type="text"
            placeholder='Enter Password' 
            onChange={(e)=>setpassword(e.target.value)}
            required
            value={password}

            
            />
            </div>
            <div>
            <Button
            className='sign-btn-signin'
            onClick={()=> signInHandler()}
            >
                Sign In
            </Button>
            </div>

            <div className="new-to-netflix-box">
                New to Netflix? <Link
                to='/signup'
                className='sign-up-text'
                >Sign Up Now </Link>
            </div>    
        </div>
        </div>
    )
    }
    
   </Fragment>
  )
}

export default Login