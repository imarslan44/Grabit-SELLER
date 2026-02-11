import React from 'react'

const Step3 = () => {
  return (
   <div className="w-full h-screen flex-1 bg-white p-6">
  {/* Title */}
  <h1 className="w-full text-xl font-semibold   text-gray-700  uppercase mb-8 tracking-tight">
    Upload Product in five Steps
  </h1>

  {/* Step Heading */}
  
  <h3 className=" font-medium text-gray-500 uppercase mb-4">
   Step_3: DIMENTIONS & Specs.
  </h3>

  {/* Content List */}
  <ul className="space-y-3 text-gray-700 leading-5.7 list-disc px-4 tracking-tight">
    <li>
      <span className="font-semibold text-sm text-gray-800">Dimentions</span> are 
      used for delivery purpose. Each of them is required.
    </li>
    <li>
      <span className="font-semibold text-sm text-gray-800">SPECIFICATION</span> are
       <span className="font-semibold text-sm text-gray-800"> Details</span> of your product. you can add as many as you want. like qualities quantities etc.
    </li>
  </ul>
</div>

  )
}

export default Step3