import React, { useState } from 'react'
import Add from "./pages/AddProduct.jsx"
import Sidebar from './components/Sidebar.jsx'
import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register.jsx'
import ProtectedRoutes from './routes/ProtectedRoutes.jsx'
import Login from './pages/Login.jsx'
import Orders from './pages/Orders.jsx'

const App = () => {
  //log each component to catch error
  
  
  return (
    <section className="w-[100vw] bg-gray-100 flex ">
    <Sidebar/>
    <Routes>
      
      {/* protect this with protected route */}

    <Route element={<ProtectedRoutes/>}>
          <Route path="/" element={<>Insights</>}/>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/add-product" element={<Add/>}/>
    </Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}/>  
    </Routes>  
    </section>
  )
}

export default App