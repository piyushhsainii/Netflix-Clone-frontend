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
import { RESET_MOVIE } from '../constants/movie'
import { RESET_STATE_MOVIE } from '../constants/list'
import { RemoveFromListAction, createListAction, getAllListAction } from '../actions/listAction'
import toast from 'react-hot-toast'
  
  
  const Featuredshow = ({type}) => {
     const { id } = useParams();
     const [listID, setlistID] = useState('')
    const { list:mylist , loading:mylistloading } = useSelector((state)=>state.AllList)
    const mylistitem = mylist[0] &&  mylist.filter((item)=>item.title === "MyList")
    const { movie , loading } = useSelector((state)=>state.RandomMovie)
    const checkListItemExist = mylistitem && mylistitem.map((item)=>item.content)
    const checkItemExist = checkListItemExist && checkListItemExist[0].filter((item=>item === movie[0]?._id))

    const dispatch = useDispatch()
    const [open, setopen] = useState(false)

    const openDialogBox = ()=>{
      setopen((prev)=>!prev)
    }
    const removefromlistHandler = ()=>{
      dispatch(
        RemoveFromListAction( movie[0]._id , listID )  
        )
        
      }
  const { loading:removeloading , success:removelistsuccess } = useSelector((state)=>state.RemoveFromList)
  const { loading:MyListLoading ,success} = useSelector((state) => state.MyList)
  
    const addtoListhandler = ()=>{
      if(checkItemExist[0]===movie[0]._id){
        toast.error('Already Added')
      } else {
       try {
        dispatch(
          createListAction(movie[0]?._id,listID)
      ) 
       } catch (error) {
        console.log(error)
       }
      }
     
    }
    useEffect(()=>{
      setlistID( mylistitem && mylistitem[0].content.length < 30 ?  mylistitem[0]._id : null )     
      dispatch(getrandomMovie(type))
      
      if(removelistsuccess){
        toast.success('Removed from the List')
        dispatch({
          type:RESET_STATE_MOVIE
        })
      }
      if(success){
            toast.success('Added to List')
            dispatch({
              type:RESET_MOVIE
            })
          }
      dispatch(getAllListAction());

    },[ dispatch ,success ,removelistsuccess ])
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
              {checkItemExist&& checkItemExist[0]===movie[0]._id ? 
                <img
                onClick={()=>removefromlistHandler()}
                src="/add.png" alt="" 
                className='remove-from-list-icon'
                ></img> : (
                  <img
                  onClick={()=>addtoListhandler()}
                  src="/add.png" alt="" className='add-to-list-icon' /> 
                )
                }
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