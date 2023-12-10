import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import  getMovie  from '../actions/MovieAction'
import { Link , Navigate, useNavigate, useParams  } from 'react-router-dom';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button

} from "@material-ui/core"
import { RemoveFromListAction, createListAction, getAllListAction } from '../actions/listAction';
import toast from 'react-hot-toast'
import Loader from '../loader/Loader';
import { RESET_STATE_MOVIE } from '../constants/list';
import { RESET_MOVIE } from '../constants/movie';


const ListItem = ({item={}}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams();
  const [movie, setmovie] = useState([]) 
  const [movieDetails, setmovieDetails] = useState() 
  const [open, setopen] = useState(false)

  const submitReviewToggle = (e)=>{
    // e.preventDefault()
    setopen((prev)=>!prev)
  }
  const [listID, setlistID] = useState('')
  const { list:mylist , loading:mylistloading } = useSelector((state)=>state.AllList)
  const { loading:removeloading , success:removelistsuccess } = useSelector((state)=>state.RemoveFromList)
   const mylistitem = mylist[0] &&  mylist.filter((item)=>item.title === "MyList")

   const removefromlistHandler = ()=>{
    dispatch(
      RemoveFromListAction( id , listID )
    )
   }

  const config = {
    headers:{
        "Content-Type":"application/json",
        credentials:'include',
    },
    withCredentials:true
}
const { loading:MyListLoading ,success} = useSelector((state) => state.MyList)

// TOAST ON ADDING TO MYLIST


const checkListItemExist = mylistitem && mylistitem.map((item)=>item.content)
const checkItemExist = checkListItemExist && checkListItemExist[0].filter((item=>item === id))

const addtoListhandler = (event)=>{
  event.preventDefault(); 
    if(checkItemExist[0]===id){
      toast.error('Already Added')
    } else {
      dispatch(
        createListAction(id,listID)
    ) 
    }
  }
  const localserver = 'http://localhost:5000'
  const mainserver = 'https://netflix-clone-iaj6.onrender.com'
  
  useEffect(()=>{
    const getmovie = async()=>{

      const  { data } = await axios.get(`${mainserver}/getMovie/${item}`    
      ,config)
      setmovie(data)
    }
    getmovie()

    if(id){
      const getMovieDetails = async()=>{

        const  { data } = await axios.get(`http://localhost:5000/getMovie/${id}`,
        config)
        setmovieDetails(data)
      }
     getMovieDetails()   
    }
    setlistID( mylistitem && mylistitem[0] ?  mylistitem[0]._id : (null) )

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
    dispatch(getAllListAction());

    },[item,id , dispatch ])
  return ( 
    <Fragment> 
      {
        mylistloading ? 
        <Loader/> :
        (
        <div>
            <Link
      onClick={submitReviewToggle}
      to={`/tvshow/${item}`}
      className='link-card'
      >
      <img className="card"  src={movie.movie && movie.movie.ImgSm} />
      </Link> 
          <Dialog
                aria-labelledby="simple-dialog-title"
                open={open}
                className="dialogBox"
                onClose={submitReviewToggle}
            >

            <DialogContent>
                <div>
                <div onClick={submitReviewToggle}
                    className='close-action-button'
                    >       
                    X           
                    </div> 
                </div>
             {
               movieDetails && movieDetails.movie._id === id ?
               (  <div
                className='hi'
                > 
              <div dangerouslySetInnerHTML={{ __html: movieDetails.movie.trailer }} />

              <div
              className='movie-dialog-box-desc'
              >
                {checkItemExist[0]===id ? 
                <img
                onClick={removefromlistHandler}
                src="/add.png" alt="" 
                className='remove-from-list-icon'
                ></img> : (
                  <img
                  onClick={addtoListhandler}
                  src="/add.png" alt="" className='add-to-list-icon' /> 
                )
                }

              <div>
              {movieDetails.movie.Name}
                </div>
                <div>
                {movieDetails.movie.Desc}
                </div>
                <div>
                 <span
                 style={{color:"rgb(148 163 184)"}}
                 > Genres: </span> {movieDetails.movie.genre}
                </div>
              </div>
              </div> )
              : null
             }
                
             
            </DialogContent>

                </Dialog>
        </div>
        )
      }
    </Fragment>
  ) 
}

export default ListItem