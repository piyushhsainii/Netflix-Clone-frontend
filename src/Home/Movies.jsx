import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import "./browse.css"
import toast from 'react-hot-toast'
import List3 from './List3';
import   getListAction  from '../actions/listAction'
import Loader from '../loader/Loader'
import Featuredshow from './featuredshow';
import { LoadUser, signOutUser } from '../actions/userAction'


    const Movies = () => {
    const { isAuthenticated, loading } = useSelector((state) => state.User)
    const { list , loading:listloading } = useSelector((state)=>state.List)
  
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [image, setImage] = useState('./red.png')
    const [isInputVisible, setIsInputVisible] = useState(false);
    const [open, setopen] = useState(false)
    const [scrolled, setScrolled] = useState(false);
  
    const searchRef = useRef(null);
    const NavRef = useRef(null);
  
    const handleImageClick = () => {
      setIsInputVisible((prev) => !prev);
    };
  
    const signoutHandler = ()=>{
      dispatch(signOutUser())
    }
  
    const handleDocumentClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsInputVisible(false);
      }
    };
  
    const [isHovered, setIsHovered] = useState(false);
    
    const togglestate = () => {
      setIsHovered((prev)=>!prev);
    };
  
    const handleNavClick = (e) => {
      if (NavRef.current && !NavRef.current.contains(e.target)) {
        setIsHovered(false);
      }
    };

    const type = 'Movie'

    useEffect(() => {
        // dispatch(getListAction())
        dispatch(getListAction(type))
    
        // if (loading === false) {
        //   isAuthenticated ? navigate('/browse') : navigate('/')
        // }
      
        
        document.addEventListener('click', handleDocumentClick);
        document.addEventListener('click', handleNavClick);
    
        const handleScroll = () => {
          const scrollThreshold = 175;
          
          if (window.scrollY > scrollThreshold) {
            setScrolled(true);
          } else {
            setScrolled(false);
          }
        };
        // Add event listener for the scroll event
        window.addEventListener('scroll', handleScroll);
    
    
        return () => {
          document.removeEventListener('click', handleDocumentClick);
          document.removeEventListener('click', handleNavClick);
          window.removeEventListener('scroll', handleScroll);
        };
        
    
      }, [isAuthenticated, loading , dispatch    ])


  return (
    <Fragment>
    {
      loading ? 
      <Loader/> : 
        
        <Fragment>
          <div className={`navbar-browse ${scrolled ? 'addgradient' : ''}  `}
    >
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
                Profile 2
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
            <div>

            <Featuredshow
            type={'movie'}  
            />       

              {
            list[0] && list.map((item)=>(
              <List3 list={item} />
            ))
          }
            </div>

          </Fragment>
          

        }
  </Fragment>
  )
}

export default Movies