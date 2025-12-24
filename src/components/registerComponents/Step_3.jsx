import React from 'react'

const Step_3 = ({Seller, setSeller}) => {


  const handleChange = (e)=>{
   const {name, value} = e.target;
   setSeller({
     ...Seller,
     [name]: value
   })
  } 

  return (
    <>
   <input type="text" name="PAN" placeholder='PAN number' value={Seller.PAN}  
    onChange={handleChange}/>
   <input type="text"  name="AccountNumber" placeholder='Account number' value={Seller.AccountNumber}   
    onChange={handleChange}/>
   <input type="text" name="IFSC" placeholder='IFSC code' value={Seller.IFSC}
    onChange={handleChange}/>
    </>
  )
}

export default Step_3