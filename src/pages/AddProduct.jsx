import React, { useEffect, useState } from 'react'

import { admin_assets as assets } from '../assets/admin_assets/assets'
import SampleCard from '../components/SampleCard';
 import Step_1 from '../components/listingComponents/Step_1';
import Step_2 from '../components/listingComponents/Step_2';
import Step_3 from '../components/listingComponents/Step_3';
import Step_4 from '../components/listingComponents/Step_4';
const Add = ({token}) => {

 const [newProduct, setNewProduct] = useState({
  name : '',
  description: "",
  price: "",
  category: "Men",
  subCategory: "Topwear",
  sizes: [],
  bestSeller: false,

  image1 : "",
  image2 : "",
  image3 : "",
  image4 : ""

 });

 

  const handleChange = (e)=>{
    const {name, value} = e.target;
    // If the name is "bestSeller", handle it as a boolean
    if(name === "bestSeller") {
      setNewProduct((prev) => ({
        ...prev,   
        bestSeller: e.target.checked
      }))
      return;
    }

if(name === "size") {
  handleSizes(e);
  return;
}
if(name.startsWith("image")) {
  handleImages(e);
  return;
}
   setNewProduct((prev)=>{
   return { ...prev, [name]: value }
   })
  }

  const handleSizes = (e) => {
     const {value, checked } = e.target;
   

     // Update the sizes array based on checkbox state
     // If checked, add the size; if unchecked, remove it
 setNewProduct((prev) => {   
        if (checked) {
          return { ...prev, sizes: [...prev.sizes, value] };
        }
        return { ...prev, sizes: prev.sizes.filter(size => size !== value) };

  })
}

const handleImages = (e)=> {
  const {name, value} = e.target;
  const file = e.target.files[0];
  setNewProduct((prev)=>{
    return { ...prev, [name]: file };
  })


}

const handleSubmit = async(e) => {
  e.preventDefault();
   try{
    const formData = new FormData();
    
    for (const key in newProduct) {
   
      if (newProduct.hasOwnProperty(key)) {
        formData.append(key, newProduct[key]);
      }
    }
   for (let pair of formData.entries()) {
  
}

    const response = await fetch("http://localhost:4400/api/product/add", {
      headers: {token},
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      toast.success("Product added successfully!");
    }

   } catch(err){
   console.error("Error adding product:", err);
   }
   
  
}

useEffect(() => {
  // Reset the form when the component mounts
  
},[newProduct]);
  

  return (
  <div className='Container flex  items-around bg-gray-100 w-[80%] h-screen  p-1 gap-2'>


{/* product listing goes here */}
<div className="w-full flex-2 overflow-y-auto ">

<Step_4 newProduct={newProduct} handleChange={handleChange}/>
</div>


{/* live products view*/}
<div className="w-full flex-1 pb-2 ">
  <SampleCard newProduct={newProduct}/>
</div>
   
  </div>
  )
}

export default Add