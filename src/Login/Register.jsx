import React, { Fragment, useEffect } from 'react'
import './register.css'
import { Button, Typography } from '@material-ui/core'
import { Link,  useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const Register = () => {
    const {isAuthenticated, loading} = useSelector((state)=>state.userRegister)
    const {isAuthenticated:isAuthenticated2, loading:loading2} = useSelector((state)=>state.loadUser)
    const navigate = useNavigate()

    useEffect(()=>{
        if(loading2===false){
            isAuthenticated2 ? navigate('/browse') : {}
          }
    },[isAuthenticated2, loading2])
      

  return (
   <Fragment>
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
            placeholder='Enter Name ' />
            </div>
            <div>

            <input type="text"
            placeholder='Enter Email ' />
            </div>
            <div>

            <input type="text"
            placeholder='Enter Password' />
            </div>
            <div>
            <Button
            className='sign-btn-signin-register'
            >
                Sign In
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
   </Fragment>
  )
}

export default Register