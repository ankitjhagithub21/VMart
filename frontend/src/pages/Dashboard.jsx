import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddProduct from '../components/AddProduct'
import ProductList from '../components/ProductList'
import Sidebar from '../components/Sidebar'

const Dashboard = () => {
  return (
    <div className='h-screen w-full flex lg:flex-row flex-col  overflow-hidden'>
      <div className='lg:w-1/4 w-full'>
      <Sidebar/>
      </div>
     <div className='w-full lg:w-3/4 mt-24 px-5'>
     <Routes>
        <Route path='/' element={<ProductList/>}/>
        <Route path='/products' element={<ProductList/>}/>
        <Route path='/add-product' element={<AddProduct/>}/>
      </Routes>
     </div>
    </div>
  )
}

export default Dashboard
