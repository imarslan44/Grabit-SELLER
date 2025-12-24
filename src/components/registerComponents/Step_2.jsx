import React from 'react'


const Step_2 = ({Seller, setSeller}) => {

   const handleChange = (e)=>{
   const {name, value} = e.target;
   setSeller({
     ...Seller,
     [name]: value
   })
  } 

  return (
    <>
    <input required type="text" name="address" placeholder='Full Address' 
    value={Seller.address} onChange={handleChange} />
    <input type="text" name="pinCode" placeholder='Pin code' 
    value={Seller.pinCode} onChange={handleChange}/>
    <input type="email" name="email" placeholder='Email' 
    value={Seller.email} onChange={handleChange}/>
    <input type="password" name="password" placeholder='Password' 
    value={Seller.password} onChange={handleChange}/>
    </>
  )
}

export default Step_2