import React from 'react'
// Simple Loader component with 3 bouncing dots animation




const Loader = ({ title, titleClass, styles }) => {
  return (
<div className={`w-full h-full  flex flex-col items-center justify-center z-50 ${styles}`}>
      
   <div className="flex space-x-2">
    <div class="loading-wave">
       <div class="loading-bar"></div>
       <div class="loading-bar"></div>
       <div class="loading-bar"></div>
       <div class="loading-bar"></div>
    </div>
   </div>
   <h1 className={`text-center text-xl  font-bold  ${titleClass}`}>{title}</h1>
</div>
  )
}



export default Loader
