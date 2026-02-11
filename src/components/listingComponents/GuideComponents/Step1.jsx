import React from 'react'

const Step1 = () => {
  return (
   <div className="w-full h-screen flex-1 bg-white p-6">
  {/* Title */}
  <h1 className="w-full text-xl font-semibold   text-gray-700  uppercase mb-8 tracking-tight">
    Upload Product in Five Steps.
  </h1>

  {/* Step Heading */}
  
  <h3 className=" font-medium text-gray-500 uppercase mb-4">
    STEP_1:   Basic_Info
  </h3>

  {/* Content List */}
  <ul className="space-y-3 text-gray-700 leading-5.5 list-disc px-4 tracking-tight">
    <li>
      <span className="font-bold text-sm text-gray-900">__Title</span> and 
      <span className="font-bold text-sm text-smtext-gray-900"> _Description</span> tell's customers more about your product. 
      Be as detailed as possible.
    </li>
    <li>
      <span className="font-bold text-sm text-gray-800">__Category</span> and 
       <span className="font-bold text-sm text-gray-800"> _Subcategory</span> directly affect 
      <span className="font-bold text-sm text-gray-800"> SEO</span>, so choose both wisely.
    </li>
  </ul>
</div>

  )
}

export default Step1