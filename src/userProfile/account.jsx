import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../loader/Loader';
import '../Home/mylist.css'
import { LoadUser, updateUser } from '../actions/userAction';
import toast from 'react-hot-toast'
import { UPDATE_RESET_USER_FAIL } from '../constants/user';

const Account = () => {

    const searchRef = useRef(null);
    const NavRef = useRef(null);
    const dispatch = useDispatch()
    const signoutHandler = ()=>{
      dispatch(signOutUser())
    }
    
  const [isHovered, setIsHovered] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);
  
  const togglestate = () => { 
    setIsHovered((prev)=>!prev);
  };
  const handleImageClick = () => {
    setIsInputVisible((prev) => !prev);
  };
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, loading , user } = useSelector((state) => state.User)
  const { success } = useSelector((state) => state.updateUserInfo)
  const navigate = useNavigate()
  const [name, setname] = useState('')
  const [email, setEmail] = useState('')



  const updateUserHandler = ()=>{
    if(name==='' || email===''){
      toast.error('Fill all the required fields')
    }else {
      dispatch(updateUser({name, email}))
    }
  }

  useEffect(()=>{
   
    if (loading === false && isAuthenticated !== null) {
      navigate(!isAuthenticated ? '/' : (null));
    }

      const handleDocumentClick = (e) => {
        if (searchRef.current && !searchRef.current.contains(e.target)) {
          setIsInputVisible(false);
        }
      };
      const handleNavClick = (e) => {
        if (NavRef.current && !NavRef.current.contains(e.target)) {
          setIsHovered(false);
        }
      };
      if(success){
        toast.success('Update User Successfully')
        dispatch(
          {type:UPDATE_RESET_USER_FAIL}
        )
       dispatch(LoadUser())

      }
      const handleScroll = () => {
            const scrollThreshold = 175;
            
            if (window.scrollY > scrollThreshold) {
              setScrolled(true);
            } else {
              setScrolled(false);
            }
          };
          window.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
            document.removeEventListener('click', handleNavClick);
            window.removeEventListener('scroll', handleScroll);
          };
  },[isAuthenticated , success,dispatch  ])

  return (
    <Fragment>
         {
        loading ? 
        <Loader/> : 
          
          <Fragment>
            <div className={`navbar-browse ${scrolled ? 'addgradient' : ''}  `}>
        <div className='navbar-bar-buttons' >
          <div>
            <img src="netflix-logo-0.png" alt="" className='netflix-login-logo-browse' />
          </div>
          <div> <Link to='/browse' className='navbar-links' > Home</Link></div>
          <div> <Link to='/tvshows' className='navbar-links' > Tv Shows</Link></div>
          <div> <Link to='/movies' className='navbar-links' > Movies</Link></div>
          <div> <Link to='/mylist' className='navbar-links' > My List</Link></div>
        </div>

        <div className='navbar-element-browse' >

          <div className="search-box"
            ref={searchRef}
          >
            <input
              className={`input-box ${isInputVisible ? 'toggle' : ''}`}
              type="text" placeholder="Titles, people, genres" />
            <img className="img"
              onClick={handleImageClick}
              src="search.png" alt="" />
          </div>
          <div>
            <img
              className='notification-logo'
              src='notification2.png'
              onClick={()=>{
                toast.success('Nothing to show yet')
              }}
              ></img>
          </div>

          <div className='last-navbar-component' 
           ref={NavRef}
           >
            <img
              className='notification-logo'
              src='red.png'
              onClick={togglestate}
              ref={NavRef}
              ></img>
            <img
              className='notification-logo2'
              src="/down2.png" alt=""
              onClick={togglestate}
              ref={NavRef}
              />
          </div>
        </div>
      </div>
         {/* floating div */}
              <div
              className={`floating-box-navbar ${isHovered ? 'hovered': ''}  `} 
              >
                <ul              
                >                 
                  <li> <Link
                  to='/Profile'
                  >
                   <img src="./red.png" style={{width:"1.44vmax", paddingTop:"2px"}} alt="" />
                  { user?.name }
                  </Link> </li>
                  <li> <Link> <img src="./edit.png" style={{width:"1.5vmax", paddingTop:"2px", borderRadius:"50%"}} alt="" /> Manage Profiles </Link> </li> 
                  <li><Link> <img src="./red.png" style={{width:"1.44vmax", paddingTop:"2px"}} alt="" /> Account </Link> </li> 
                  <hr></hr>
                  <li className='signout-box'
                  onClick={()=>signoutHandler()}
                  > <Link
                    className='signout-text'
                  >  Sign Out  </Link> </li> 
                </ul>
              </div>
              <div></div>
              <div className="updateprofile-container">
                    <div className="update-profile-form">
                            <h3>Update User Info</h3>
                           <div>
                           <input type="text" 
                            placeholder='Enter Name'
                            value={name}
                            required
                            onChange={(e)=>setname(e.target.value)}
                            />
                           </div>
                            <div
                            type="text" 
                            >
                            <input type="text"
                            placeholder='Enter Email'
                            value={email}
                            required
                            onChange={(e)=>setEmail(e.target.value)}
                            />
                            </div>
                            <div>
                            <button
                            style={{cursor:"pointer"}}
                            onClick={()=>updateUserHandler()}
                            > UPDATE </button>
                            </div>
                    </div>
              </div>
              </Fragment>
         }
    </Fragment>
  )
}

export default Account