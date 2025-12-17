import React, { useEffect, useState } from 'react'

import { admin_assets as assets } from '../assets/admin_assets/assets'
import SampleCard from '../components/SampleCard';
 

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

  
    <form
      onChange={handleChange}
      onSubmit={handleSubmit}
      className="flex flex-col w-full flex-[1.5] p-6  max-w-2xl mx-auto bg-white rounded-md shadow-md  gap-6 h-screen overflow-scroll "
    >
      {/* Image Upload */}
      <div>
        <p className="mb-3 text-lg font-semibold text-gray-700">Upload Images</p>
        <div className="flex flex-wrap gap-4 justify-between">
          {["image1", "image2", "image3", "image4"].map((img, idx) => (
            <label
              key={img}
              htmlFor={img}
              className="flex flex-col items-center cursor-pointer flex-1 min-w-[70px] max-w-[90px]"
            >
              <img
                className="w-20 h-20 object-cover rounded border border-gray-200 bg-gray-50"
                src={
                  newProduct[img]
                    ? URL.createObjectURL(newProduct[img])
                    : assets.upload_area
                }
                alt=""
              />
              <input
                type="file"
                name={img}
                id={img}
                className="hidden"
                required={idx < 2}
                accept="image/*"
              />
              <span className="text-xs text-gray-500 mt-1">
                {`Image ${idx + 1}`}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div className="w-full">
        <label className="block mb-2 font-semibold text-gray-700">
          Product Name
        </label>
        <input
          name="name"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      {/* Product Description */}
      <div className="w-full">
        <label className="block mb-2 font-semibold text-gray-700">
          Product Description
        </label>
        <textarea
          name="description"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Write content here"
          rows={3}
          required
        />
      </div>

      {/* Category, Subcategory, Price */}
      <div className="w-full flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block mb-2 font-semibold text-gray-700">
            Category
          </label>
          <select
            name="category"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block mb-2 font-semibold text-gray-700">
            Sub Category
          </label>
          <select
            name="subCategory"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block mb-2 font-semibold text-gray-700">
            Price
          </label>
          <input
            name="price"
            type="number"
            min="0"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="199"
            required
          />
        </div>
      </div>

      {/* Product Size */}
      <div>
        <label className="block mb-2 font-semibold text-gray-700">
          Product Size
        </label>
        <div className="flex flex-wrap gap-2">
          {["S", "M", "L", "XL"].map((size) => (
            <label
              key={size}
              className={`border px-4 py-1 rounded cursor-pointer transition ${
                newProduct.sizes.includes(size)
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-300"
              }`}
            >
              <input
                name="size"
                type="checkbox"
                value={size}
                className="hidden"
              />
              {size}
            </label>
          ))}
        </div>
      </div>

      {/* Best Seller */}
      <div className="flex items-center gap-2">
        <input
          name="bestSeller"
          type="checkbox"
          id="bestSeller"
          className="accent-black w-4 h-4"
        />
        <label htmlFor="bestSeller" className="text-gray-700">
          Add to Best Seller
        </label>
      </div>

      {/* Submit Button */}
<button
        type="submit"
        className="w-full bg-black text-white px-4 py-3 rounded-md text-lg font-semibold hover:bg-gray-900 transition">
        Add Product
        
     </button>
    </form>
{/* live products view*/}
   <SampleCard newProduct={newProduct}/>
  </div>
  )
}

export default Add