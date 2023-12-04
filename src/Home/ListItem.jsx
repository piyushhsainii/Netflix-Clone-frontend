import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import  getMovie  from '../actions/MovieAction'
import { Link , Navigate, useNavigate, useParams  } from 'react-router-dom';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button

} from "@material-ui/core"


const ListItem = ({item={}}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams();
  const [movie, setmovie] = useState([]) 
  const [movieDetails, setmovieDetails] = useState() 
  const [open, setopen] = useState(false)

  const submitReviewToggle = ()=>{
    setopen((prev)=>!prev)
  }



  const config = {
    headers:{
        "Content-Type":"application/json",
        credentials:'include',
    },
    withCredentials:true
}

console.log(movieDetails, 'I am id');


console.log(id, 'I am movie');
  useEffect(()=>{
    const getmovie = async()=>{

      const  { data } = await axios.get(`http://localhost:5000/getMovie/${item}`    
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

    },[item,id])
  return (
    <Fragment> 
      <Link
      onClick={submitReviewToggle}
      to={`/browse/${item}`}
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
                  {/* <DialogTitle> Submit Review </DialogTitle> */}
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
    </Fragment>
  ) 
}


export default ListItem