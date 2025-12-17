import React from 'react'
import AddProduct from "./pages/AddProduct"
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
const App = () => {
  return (
    <div className="w-screen bg-gray-100 flex ">
      <Sidebar/>
<Routes>
      <Route path="/" element={<>Insights</>}/>
      <Route path="/orders" element={<>Orders</>}/>
      <Route path="/listing" element={<AddProduct/>}/>    
</Routes>  
    </div>
  )
}

export default App