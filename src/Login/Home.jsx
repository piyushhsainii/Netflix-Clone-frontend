import React, { Fragment, useEffect } from 'react'
import { Button, Typography } from '@material-ui/core'
import "./login.css"
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {

  const {isAuthenticated, loading} = useSelector((state)=>state.loadUser)
  const navigate = useNavigate()

  useEffect(()=>{
      if(loading===false){
        isAuthenticated ? navigate('/browse') : navigate('/')
        }
  },[isAuthenticated, loading])


  return (
    <Fragment>
    <div className='background-overlay' >
         <div className='login-container' >
         </div>

         <div className='navbar' >
            <img src="netflix-logo-0.png" alt="" className='netflix-login-logo' />
            <div className='navbar-element' >
            <select 
            className='select-btn' 
            name="" id=""> English
            <option value="">English</option>
             </select>    

                <Button
                className='sign-in'
                >
                   <Link
                   style={{color:"white", textDecoration:"none", padding:"0.3vmax 2vmax" }}
                   to='/login' > Sign In</Link> 
                </Button>
            </div>
            </div>
            <div className='body-content' >
              <div>
              <Typography
              className='body-h1-login'
              >
                Laughter. Tears. Thrills. Find it all on Netflix.
                </Typography>
              </div>
              <div>
              <Typography
              className='body-h3-login'
              >
                Endless entertainment starts at just ₹ 149. Cancel anytime.
                </Typography>
              </div>
              <div>
              <Typography
              className='body-h4-login'
              >
               Ready to watch? Enter your email to create or restart your membership
                </Typography>
              </div>
            <div className='login-div' >
               
                <Button> 
                    <Link
                 style={{color:"white", textDecoration:"none" , padding: "1.3vmax 4.4vmax "}}
                 to='/signup'
                >
                       GET STARTED  
                </Link>
                 </Button>
            </div>
            </div>
    
        </div>
    </Fragment>
  )
}

export default Home