import React from 'react'
import {NavLink} from "react-router-dom"

const Sidebar = () => {
  return (
    <aside className="bg-white max-sm:w-[12vw] w-[18vw] h-screen  p-1 md:p-6 shadow-lg flex flex-col justify-between">
  {/* Logo / Name */}
  <div>
    <h1 className="font-bold text-xl sm:text-3xl text-black font-serif tracking-wide">
      <span className="text-lime-500">Gr</span> <span className='max-sm:hidden'>abIt</span>
    </h1>
  </div>

  {/* User Profile */}
  <div className="flex items-center justify-center gap-1 mt-6 p-2   rounded-lg hover:bg-gray-100 transition ">
    <img 
      src="https://png.pngtree.com/thumb_back/fw800/background/20221214/pngtree-business-man-at-the-office-looking-handsome-concept-photo-image_42283846.jpg" 
      alt="User" 
      className="w-10 h-10 rounded-full object-cover max-md:hidden border border-gray-300"
    />
    <ion-icon name="person-outline" className="md:hidden scale-150"></ion-icon>
    <h1 className="font-semibold sm:text-lg font-mono text-gray-600 leading-5 tracking-tight max-sm:hidden max-md:font-normal text-md">Hello Arslan</h1>
  </div>

  {/* Navigation */}
  <nav className="mt-10 flex-1">
    <h2 className="pl-2 text-sm font-serif font-semibold text-gray-500 uppercase tracking-wider mb-4 max-sm:hidden">
      Pages
    </h2>
    <ul className="md:space-y-3">
     
      <NavLink 
        to="/orders" 
        className={({isActive}) => 
          `block px-2 py-2 rounded-md transition ${
            isActive ? "bg-lime-500 text-xl text-white font-semibold" : "text-gray-700 hover:bg-gray-100"
          }`
        }>
         <ion-icon name="receipt-outline" className="md:hidden scale-150"></ion-icon> 
        <span className="max-md:hidden">Orders</span> 
      </NavLink>
       <NavLink 
        to="/" 
        className={({isActive}) => 
          `block  px-2 py-2 rounded-md transition ${
            isActive ? "bg-lime-500 text-white " : "text-gray-700 hover:bg-gray-100"
          }`
        } 
        end
        
      ><ion-icon name="cube-outline" className="md:hidden scale-150"></ion-icon>
        <span className='max-md:hidden'>Our_Products</span>
      </NavLink>
      <NavLink 
        to="/add-product" 
        className={({isActive}) => 
          `block px-2 py-2 rounded-md transition ${
            isActive ? "bg-lime-500 text-white " : "text-gray-700 hover:bg-gray-100"
          }`
        }
      >
      <ion-icon name="add-circle-outline" className="md:hidden scale-150"></ion-icon> 
        <span className="max-md:hidden">Listing</span>
      </NavLink>
       <NavLink 
        to="/insights" 
        className={({isActive}) => 
          `block px-2 py-2 rounded-md transition ${
            isActive ? "bg-lime-500 text-white " : "text-gray-700 hover:bg-gray-100"
          }`
        } 
        
      >
        <ion-icon name="stats-chart-outline" className="md:hidden scale-150"></ion-icon>
       <span className="max-md:hidden">Insights</span> 
      </NavLink>
      
       <NavLink 
        to="/login" 
        className={({isActive}) => 
          `flex items-baseline px-2 py-2  rounded-md transition ${
            isActive ? "bg-lime-500 text-white " : "text-gray-700 hover:bg-gray-100"
          }`
        } 
        
      >
        <ion-icon name="exit-outline" className="rotate-180 md:pb-2 md:px-2 scale-150 lg:scale-130"></ion-icon>
       <span className="max-md:hidden">Exit Login</span> 
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