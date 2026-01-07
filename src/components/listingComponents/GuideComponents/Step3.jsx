import React from 'react'

const Step3 = () => {
  return (
   <div className="w-full h-screen flex-1 bg-white p-6">
  {/* Title */}
  <h1 className="w-full text-xl font-light  text-gray-900 text-center uppercase mb-8 tracking-wider">
    Upload Product in 5 Steps
  </h1>

  {/* Step Heading */}
  <h2 className="text-xl font-semibold text-gray-800 text-center mt-6">
    STEP_3
  </h2>
  <h3 className=" font-medium text-gray-500 uppercase mb-4">
    DIMENTIONS & Specs
  </h3>

  {/* Content List */}
  <ul className="space-y-3 text-gray-700 leading-relaxed list-disc px-4 tracking-wider">
    <li>
      <span className="font-semibold text-gray-900">Dimentions</span> are 
      used for delivery purpose. Each of them is required.
    </li>
    <li>
      <span className="font-semibold text-gray-800">SPECIFICATION</span> are
       <span className="font-semibold text-gray-800"> Details</span> of your product. you can add as many as you want. like qualities quantities etc.
    </li>
  </ul>
</div>

  )
}

export default Step3