import React from 'react'

const Step1 = () => {
  return (
   <div className="w-full h-screen flex-1 bg-white p-6">
  {/* Title */}
  <h1 className="w-full text-xl font-light  text-gray-900 text-center uppercase mb-8 tracking-wider">
    Upload Product in 5 Steps
  </h1>

  {/* Step Heading */}
  <h2 className="text-xl font-semibold text-gray-800 text-center mt-6">
    STEP_1
  </h2>
  <h3 className=" font-medium text-gray-500 uppercase mb-4">
    Basic_Info
  </h3>

  {/* Content List */}
  <ul className="space-y-3 text-gray-700 leading-relaxed list-disc px-4 tracking-wider">
    <li>
      <span className="font-semibold text-gray-900">__Title</span> and 
      <span className="font-semibold text-gray-900"> _Description</span> tell customers more about your product. 
      Be as detailed as possible.
    </li>
    <li>
      <span className="font-semibold text-gray-800">__Category</span> and 
       <span className="font-semibold text-gray-800"> _Subcategory</span> directly affect 
      <span className="font-semibold text-gray-800"> SEO</span>, so choose both wisely.
    </li>
  </ul>
</div>

  )
}

export default Step1