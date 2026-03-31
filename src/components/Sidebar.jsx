import React from 'react'
import {NavLink} from "react-router-dom"
import { assets } from '../assets/assets'
const Sidebar = () => {
  return (
    <aside className="bg-white  max-sm:w-screen max-sm:absolute bottom-0 z-100 max-sm:h-12   w-[18vw] h-screen  sm:p-1 md:p-6 shadow-lg border-t border-gray-100 flex flex-col justify-between">
  {/* Logo / Name */}
  <div className="max-sm:hidden">
    <div className="w-40 h-20">
      <img src={assets.logo} alt="Logo" className="w-full h-full object-cover"/>
    </div>
  </div>

  {/* User Profile */}
  <div className="flex items-center justify-center gap-1 max-sm:hidden mt-6 p-2   rounded-lg hover:bg-gray-100 transition ">
    <img 
      src="/" 
      alt="User" 
      className="w-10 h-10 rounded-full object-cover hidden border border-gray-300"
    />
    <ion-icon name="person-outline" className="hidden scale-150"></ion-icon>
    <h1 className="font-semibold sm:text-lg font-mono text-gray-600 leading-5 tracking-tight hidden max-md:font-normal text-md">{"Hii Seller"}</h1>
  </div>

  {/* Navigation */}
  <nav className="sm:mt-10 flex-1">
    <h2 className="pl-2 text-sm font-serif font-semibold text-gray-500 uppercase tracking-wider mb-4 max-sm:hidden">
      Pages
    </h2>
    <ul className="md:space-y-3 max-sm:flex justify-around items-center p-1">
     
      <NavLink 
        to="/orders" 
        className={({isActive}) => 
          `block px-2 py-1 md:py-3 rounded-md transition ${
            isActive ? "bg-main  text-white" : "text-gray-700 hover:bg-gray-100"
          }`
        }>
         <ion-icon name="receipt-outline" className="md:hidden scale-150"></ion-icon> 
        <span className="max-md:hidden">Orders</span> 
      </NavLink>
       <NavLink 
        to="/" 
        className={({isActive}) => 
          `block  px-2 py-1 md:py-3 rounded-md transition ${
            isActive ? "bg-main  text-white " : "text-gray-700 hover:bg-gray-100"
          }`
        } 
        end
        
      ><ion-icon name="cube-outline" className="md:hidden scale-150"></ion-icon>
        <span className='max-md:hidden'>Our_Products</span>
      </NavLink>
      <NavLink 
        to="/add-product" 
        className={({isActive}) => 
          `block px-2 py-1 md:py-3 rounded-md transition ${
            isActive ? "bg-main text-white " : "text-gray-700 hover:bg-gray-100"
          }`
        }
      >
      <ion-icon name="add-circle-outline" className="md:hidden scale-150"></ion-icon> 
        <span className="max-md:hidden">Listing</span>
      </NavLink>
       <NavLink 
        to="/insights" 
        className={({isActive}) => 
          `block px-2 py-1 md:py-3 rounded-md transition ${
            isActive ? "bg-main text-white " : "text-gray-700 hover:bg-gray-100"
          }`
        } 
        
      >
        <ion-icon name="stats-chart-outline" className="md:hidden scale-150"></ion-icon>
       <span className="max-md:hidden">Insights</span> 
      </NavLink>
      
       <NavLink 
        to="/login" 
        className={({isActive}) => 
          `flex items-baseline px-2 py-1 md:py-3  rounded-md transition ${
            isActive ? "bg-main text-white " : "text-gray-700 hover:bg-gray-100"
          }`
        } 
        
      >
        <ion-icon name="exit-outline" className="rotate-180 md:pb-2 md:px-2 scale-150 lg:scale-130"></ion-icon>
       <span className="max-md:hidden">Logout</span> 
      </NavLink>
    </ul>
  </nav>

  {/* Footer */}
  <div className="text-center text-xs max-sm:hidden text-gray-400 mt-6">
    © 2025 GrabIt
  </div>
</aside>

  )
}

export default Sidebar