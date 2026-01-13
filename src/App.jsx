import React, { useState } from 'react'
import Add from "./pages/AddProduct.jsx"
import Sidebar from './components/Sidebar.jsx'
import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register.jsx'
import ProtectedRoutes from './routes/ProtectedRoutes.jsx'
import Login from './pages/Login.jsx'
import Orders from './pages/Orders.jsx'
import Product from './pages/Product.jsx'
const App = () => {
  //log each component to catch error
  
  
  return (
    <section className="w-[100vw] h-[100vh] bg-gray-100 flex ">
    <Sidebar/>
    <Routes>
      
      {/* protect this with protected route */}

    <Route element={<ProtectedRoutes/>}>
          <Route path="/products" element={<Product/>}/>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/add-product" element={<Add/>}/>
          <Route path="/insights" element={<h1 className="text-2xl font-bold p-8">Insights comming soon...</h1>}/>
    </Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}/>  
    </Routes>  
    </section>
  )
}

export default App