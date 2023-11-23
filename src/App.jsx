import { Fragment, useEffect, useState } from 'react'
import './App.css'
import Home from './Login/Home.jsx'
import Login from './Login/Login.jsx'
import { BrowserRouter as Router ,Route, Routes, Navigate  } from 'react-router-dom'
import Register from './Login/Register.jsx'
import toast, {Toaster} from 'react-hot-toast'
import Browser from './Home/Browse.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { LoadUser } from './actions/userAction.jsx'

function App() {

  const dispatch = useDispatch()
  const { isAuthenticated, loading } = useSelector((state)=>state.loadUser)

  useEffect((error)=>{

    if(error){
      toast.error(error)
    }
    
    dispatch(LoadUser())
  },[])

  return (
    <Fragment>
      <Router>
      <Routes>
      <Route path='/' element={ <Home /> }/>  
      <Route path='/login' element={ <Login /> }/>  
      <Route path='/signup' element={ <Register /> }/> 
      <Route path='/browse' element={ <Browser /> }/>   
      </Routes>
      <Toaster/>
      </Router>
    </Fragment>
  )
}

export default App
