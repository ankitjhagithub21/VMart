import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetchAuthUser from './hooks/useFetchAuthUser'
import Products from './components/Products'
import ProductDetails from './pages/ProductDetails'
import { useSelector } from 'react-redux'
import Dashboard from './pages/Dashboard'
import Cart from './pages/Cart'

const App = () => {
  useFetchAuthUser()
  const {user} = useSelector(state=>state.auth)
  return (
    <BrowserRouter>
      <ToastContainer
        autoClose={1500}
      />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={user ? <Home/> : <Login />} />
        <Route path='/register' element={user ? <Home/> : <Register />} />
        <Route path='/products' element={<Products />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/products/:productId' element={<ProductDetails />} />
        <Route path='/admin/*' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
