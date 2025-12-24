import React, { useState } from 'react'


const Step_1 = ({Seller, setSeller}) => {


const handleChange = (e)=>{
   const {name, value} = e.target;
   setSeller({
     ...Seller,
     [name]: value
   })
  } 


  return (
    
  //create 3 input fields in first step
    < >
        <input type="text" placeholder='Full name' name="name" value={Seller.name}
        onChange={handleChange}/>
        <input type="text" name="storeName" placeholder='Store Name / ShopName' value={Seller.storeName} 
        onChange={handleChange}/>
        <input type="text" placeholder='Phone number' name="phone" value={Seller.phone} maxLength={12} minLength={10}
        onChange={handleChange}/>
    </>

  )
}

export default Step_1