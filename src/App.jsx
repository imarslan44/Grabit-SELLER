import React, { useState } from 'react'
import AddProduct from "./pages/AddProduct"
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'

const App = () => {
  const [login, setlogin] = useState(false)
  return (
    <div className="w-screen bg-gray-100 flex ">
    <Sidebar/>
    <Routes>
      <Route path="/" element={<>Insights</>}/>
      <Route path="/orders" element={<>Orders</>}/>
      <Route path="/listing" element={login === true ? <AddProduct/> : <Register/> }/>    
    </Routes>  
    </div>
  )
}

export default App