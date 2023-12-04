import React, { Fragment, useEffect, useState } from 'react'
import './featureshow.css'
import { useDispatch, useSelector } from 'react-redux'
import { getrandomMovie } from '../actions/MovieAction'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button
  
  } from "@material-ui/core"
  
  


const Featuredshow = ({type}) => {
    const dispatch = useDispatch()
    const { movie , loading } = useSelector((state)=>state.RandomMovie)
    const [open, setopen] = useState(false)

    const openDialogBox = ()=>{
      setopen((prev)=>!prev)
    }

    useEffect(()=>{
        dispatch(getrandomMovie(type))
    },[])
  return (  
    <Fragment>
        <div
        className='featured-show-container'
        style={{}}
        >
            <img
            className='featured-url'
            src={movie[0]?.Img} alt="" />  
            <div> 
            <img          
            className='movie-img-title'
            src={movie[0]?.ImgTitle} alt="" />   
            <div>
            <p>
            {movie[0]?.Desc}
            </p>
            <button
            className='play-btn'
            onClick={openDialogBox}
            >
                <img 
                className='play-button-img'
                src={'./play.png'} alt="" />
                Play
            </button>
            <button
            onClick={openDialogBox}
            className='more-info'
            > 
                <img 
                className='play-button-img-2'
                src={'./info.png'} alt="" />
                More Info
            </button>
            </div>
            </div>
        </div>
        <Dialog
                aria-labelledby="simple-dialog-title"
                open={open}
                className="dialogBox"
                onClose={openDialogBox}
            >
                  {/* <DialogTitle> Submit Review </DialogTitle> */}
            <DialogContent>
                <div>
                <div onClick={openDialogBox}
                    className='close-action-button'
                    >       
                    X           
                    </div>
                </div>
             {
              movie[0] && 
               <div
              className='hi'
              > 
              <div dangerouslySetInnerHTML={{ __html: movie[0].trailer }} />

              <div
              className='movie-dialog-box-desc'
              >
              <div>
              {movie[0].Name}
                </div>
                <div>
                {movie[0].Desc}
                </div>
                <div>
                 <span
                 style={{color:"rgb(148 163 184)"}}
                 > Genres: </span> {movie[0].genre}
                </div>
              </div>
              </div>           
            }                   
             
            </DialogContent>

                </Dialog>
    </Fragment>
  )
}

export default Featuredshow