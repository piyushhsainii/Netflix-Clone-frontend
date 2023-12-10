import { Fragment, useEffect, useState } from 'react'
import './App.css'
import Home from './Login/Home.jsx'
import Login from './Login/Login.jsx'
import { BrowserRouter as Router ,Route, Routes, Navigate, useParams  } from 'react-router-dom'
import Register from './Login/Register.jsx'
import toast, {Toaster} from 'react-hot-toast'
import Browser from './Home/Browse.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { LoadUser } from './actions/userAction.jsx'
import TvShows from './Home/TvShows.jsx'
import Movies from './Home/Movies.jsx'
import Footer from './Home/Footer.jsx'
import MyList from './Home/MyList.jsx'
import Account from './userProfile/account.jsx'
import { createListAction, getAllListAction } from './actions/listAction.jsx'

function App() {

  const dispatch = useDispatch()
  const { isAuthenticated, loading } = useSelector((state)=>state.User)

  
  useEffect(()=>{
    const fetchData = async () => {
      try {
         dispatch(getAllListAction());
         dispatch(LoadUser());
      } catch (error) {
        toast.error(error.message);
      }
    };
  
    fetchData();
  },[])

  return (
    <Fragment>
      <Router>
      <Routes>
      <Route path='/' element={ <Home /> }/>  
      <Route path='/login' element={ <Login /> }/>  
      <Route path='/signup' element={ <Register /> }/> 
      <Route path='/browse' element={ <Browser /> }/>   
      <Route path='/browse/:id' element={ <Browser />}/>   
      <Route path='/tvshows' element={ <TvShows /> }/>   
      <Route path='/tvshow/:id' element={ <TvShows /> }/>   
      <Route path='/movies' element={ <Movies /> }/>   
      <Route path='/movie/:id' element={ <Movies /> }/>   
      <Route path='/MyList' element={ <MyList /> }/>   
      <Route path='/MyList/:id' element={ <MyList /> }/>   
      <Route path='/account' element={ <Account /> }/>   
      </Routes>
      <Toaster/>
      </Router>
     {isAuthenticated ? <Footer/> : null } 
    </Fragment>
  )
}

export default App
