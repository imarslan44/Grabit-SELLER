import React, { useState } from 'react'


const Step_1 = ({Seller, setSeller}) => {
   

  return (
    
  //create 3 input fields in first step
    < >
        <input type="text" placeholder='Full name'
        className='w-full p-2 border-2 border-gray-300 rounded'/>
        <input type="text" placeholder='Store Name / ShopName' 
        className='w-full p-2 border-2 border-gray-300 rounded'/>
        <input type="text" placeholder='Phone number' maxLength={12} minLength={10}
        className='w-full p-2 border-2 border-gray-300 rounded'/>



    </>



    
  )
}

export default Step_1