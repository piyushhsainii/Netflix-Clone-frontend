import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import "./browse.css"
import toast from 'react-hot-toast'
import List2 from './List2';
import   getListAction  from '../actions/listAction'
import Loader from '../loader/Loader'
import Featuredshow from './featuredshow';
import { LoadUser, signOutUser } from '../actions/userAction'
import { RESET_MOVIE } from '../constants/movie';
import { RESET_STATE_MOVIE } from '../constants/list';
import axios from 'axios';

const TvShows = () => {

  const localserver = 'http://localhost:5000'
  const mainserver = 'https://netflix-clone-iaj6.onrender.com'

    const { isAuthenticated, loading } = useSelector((state) => state.User)
    const { list , loading:listloading } = useSelector((state)=>state.List)
  const { loading:MyListLoading ,success } = useSelector((state) => state.MyList)
  const { loading:removeloading , success:removelistsuccess } = useSelector((state)=>state.RemoveFromList)

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

    const type = 'Series'
    const config = {
      headers:{
          "Content-Type":"application/json",
          credentials:'include',
      },
      withCredentials:true
  }
    const Homelistitem = list[0] &&  list.filter((item)=>item.type === "Series")

    const [searchInput, setSearchInput] = useState('');
    const [filteredContent, setFilteredContent] = useState([]);
    
    const handleSearchInputChange = (e) => {
      setSearchInput(e.target.value);
      handleSearch();
    };
  
    const handleSearch = async () => {
      if (searchInput !== '') {
        
        const filtered = await Promise.all(
          Homelistitem.map(async (item) => {
            const movieDetailsPromises = item.content.map(async (movieId) => {
              const {data}= await axios.get(`${mainserver}/getMovie/${movieId}`,
            config);
              const movieDetails = data.movie
              
              if (movieDetails.Name.toLowerCase().includes(searchInput.toLowerCase())) {
                return movieId;
              }
      
              return null; // Return null for non-matching movies
            });
    
             const matchingMovieIds = (await Promise.all(movieDetailsPromises)).filter((id) => id !== null);
             return {
              ...item,
              content: matchingMovieIds,
            };
          })
        );
    
        const result = filtered.flat();
    
      setFilteredContent(result);
      }else {
        // If the search input is empty, reset the content to the original list
        setFilteredContent(Homelistitem);
      }
    };
    useEffect(() => {
        dispatch(getListAction(type))
        
        document.addEventListener('click', handleDocumentClick);
        document.addEventListener('click', handleNavClick);

        if (loading === false && isAuthenticated !== null) {
          navigate(!isAuthenticated ? '/' : (null));
        }
        
        if(success){
          toast.success('Added to List')
          dispatch({
            type:RESET_MOVIE 
          })
        }
        if(removelistsuccess){
          toast.success('Removed from the List')
          dispatch({
            type:RESET_STATE_MOVIE
          })
        }

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
        
    
      }, [isAuthenticated, loading , dispatch , success , removelistsuccess   ])

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
            type="text" placeholder="Titles, people, genres" 
            value={searchInput}
              onChange={handleSearchInputChange}
            />
          <img className="img"
            onClick={handleImageClick}
            src="search.png" alt="" />
        </div>
        <div>
          <img
            className='notification-logo'
            src='./notification2.png'
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
                <li><Link to='/account' > <img src="./red.png" style={{width:"1.44vmax", paddingTop:"2px"}} alt="" /> Account </Link> </li> 
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
            type={'series'}
            />       
              {     
                listloading ? 
                <Loader/>
                : 
                (
                  filteredContent.length > 0 ? (
                    <div>
                      {filteredContent  && filteredContent.map((item, index) => (
                        <List2 key={index} list={item} />
                      ))}
                    </div>
                  ) : (
                    <div>
                      {Homelistitem && Homelistitem.map((item, index) => (
                        <List2 key={index} list={item} />
                      ))}
                    </div>
                    )
                )
              }
            </div>

          </Fragment>
          

        }
  </Fragment>
  )
}

export default TvShows