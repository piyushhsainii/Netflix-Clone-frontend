import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import "./browse.css"
import toast from 'react-hot-toast'

const Home = () => {

  const { isAuthenticated, loading } = useSelector((state) => state.loadUser)
  const navigate = useNavigate()
  const [image, setImage] = useState('./red.png')
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [open, setopen] = useState(false)

  const searchRef = useRef(null);
  const NavRef = useRef(null);

  const handleImageClick = () => {
    setIsInputVisible((prev) => !prev);
  };

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



  useEffect(() => {
    if (loading === false) {
      isAuthenticated ? navigate('/browse') : navigate('/')
    }
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('click', handleNavClick);


    return () => {
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('click', handleNavClick);
    };
  }, [isAuthenticated, loading])

  return (
    <Fragment>
      <div className='navbar-browse'
             >
        <div className='navbar-bar-buttons' >
          <div>
            <img src="netflix-logo-0.png" alt="" className='netflix-login-logo-browse' />
          </div>
          <div>Home</div>
          <div>Tv Shows</div>
          <div>Movies</div>
          <div>My List</div>
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
              src='notification.png'
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
              src="/down.png" alt=""
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
                  <li className='signout-box' > <Link>  Sign Out  </Link> </li> 
                </ul>
              </div>
              

    </Fragment>
  )
}

export default Home