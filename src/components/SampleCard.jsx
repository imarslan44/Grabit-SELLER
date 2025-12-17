import React from 'react'
import { admin_assets } from '../assets/admin_assets/assets'
const SampleCard = ({newProduct}) => {
  return (
     <div className="flex-1 w-full bg-white h-full border-l border-gray-200 p-6 overflow-y-auto max-lg:hidden relative">
  {/* Title */}
  <h1 className="text-2xl text-gray-700 font-semibold font-serif mb-6">
    Product Sample View
  </h1>

  {/* Product Card */}
  <div className="group cursor-pointer rounded-lg overflow-hidden border border-gray-200 shadow-md bg-white hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 w-72 mx-auto mt-8">
    
    {/* Image */}
    <div className="overflow-hidden bg-gray-100 h-64 flex items-center justify-center">
      <img
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
        src={
          newProduct.image1
            ? URL.createObjectURL(newProduct.image1)
          : ""
        }
        alt={newProduct.name || "Product Image"}
      />
    </div>

    {/* Product Info */}
    <div className="p-4 text-center">
      <p className="text-gray-700 text-base font-medium">
        {newProduct.name ? newProduct.name : "Product Name"}
      </p>
      <p className="text-lg font-bold text-green-500 mt-1">
        {newProduct.price ? `$${newProduct.price}` : "Price $000"}
      </p>
    </div>
  </div>
</div>

  )
}

export default SampleCard