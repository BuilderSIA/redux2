/* eslint-disable react-hooks/exhaustive-deps */

import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Navbar } from './components';
import Home from './Pages/Home';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { total } from './features/cartslice';




function App() {

  const dispatch = useDispatch();
  const {items} = useSelector((state)=>state.cart);

  useEffect(()=>{
    dispatch(total())
  },[items])


  return (
    <>
     <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>} />
     </Routes>
    </>
  )
}

export default App
