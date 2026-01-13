import React from 'react'
import {NavLink} from "react-router-dom"

const Sidebar = () => {
  return (
    <aside className="bg-white w-[18vw] h-screen p-6 shadow-lg flex flex-col justify-between">
  {/* Logo / Name */}
  <div>
    <h1 className="font-bold text-3xl text-black font-serif tracking-wide">
      <span className="text-lime-500">G</span>rabIt
    </h1>
  </div>

  {/* User Profile */}
  <div className="flex items-center justify-center gap-1 mt-6 p-2   rounded-lg hover:bg-gray-100 transition ">
    <img 
      src="https://png.pngtree.com/thumb_back/fw800/background/20221214/pngtree-business-man-at-the-office-looking-handsome-concept-photo-image_42283846.jpg" 
      alt="User" 
      className="w-8 h-8 rounded-full object-cover border border-gray-300"
    />
    <h1 className="font-semibold text-lg font-mono text-gray-700 leading-5 tracking-tight">Hello Arslan</h1>
  </div>

  {/* Navigation */}
  <nav className="mt-10 flex-1">
    <h2 className="pl-2 text-sm font-serif font-semibold text-gray-500 uppercase tracking-wider mb-4">
      Pages
    </h2>
    <ul className="space-y-3">
     
      <NavLink 
        to="/orders" 
        className={({isActive}) => 
          `block px-4 py-2 rounded-md transition ${
            isActive ? "bg-lime-500 text-white font-semibold" : "text-gray-700 hover:bg-gray-100"
          }`
        }>
          
        Orders
      </NavLink>
       <NavLink 
        to="/products" 
        className={({isActive}) => 
          `block px-4 py-2 rounded-md transition ${
            isActive ? "bg-lime-500 text-white font-semibold" : "text-gray-700 hover:bg-gray-100"
          }`
        } 
        end
        
      >
        Our_Products
      </NavLink>
      <NavLink 
        to="/add-product" 
        className={({isActive}) => 
          `block px-4 py-2 rounded-md transition ${
            isActive ? "bg-lime-500 text-white font-semibold" : "text-gray-700 hover:bg-gray-100"
          }`
        }
      >
        Listing
      </NavLink>
       <NavLink 
        to="/insights" 
        className={({isActive}) => 
          `block px-4 py-2 rounded-md transition ${
            isActive ? "bg-lime-500 text-white font-semibold" : "text-gray-700 hover:bg-gray-100"
          }`
        } 
        
      >
        Insights
      </NavLink>
    </ul>
  </nav>

  {/* Footer */}
  <div className="text-center text-xs text-gray-400 mt-6">
    © 2025 GrabIt
  </div>
</aside>

  )
}

export default Sidebar