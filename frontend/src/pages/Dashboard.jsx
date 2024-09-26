import React from 'react'
import Sidebar from '../components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import AddProduct from '../components/AddProduct'
import ProductList from '../components/ProductList'

const Dashboard = () => {
  return (
    <div className='relative p-5'>
      <Sidebar/>
      <Routes>
        <Route path='/' element={<ProductList/>}/>
        <Route path='/products' element={<ProductList/>}/>
        <Route path='/add-product' element={<AddProduct/>}/>
      </Routes>
    </div>
  )
}

export default Dashboard
