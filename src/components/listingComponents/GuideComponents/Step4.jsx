import React from 'react'

const Step4 = () => {
  return (
   <div className="w-full h-screen flex-1 bg-white p-6">
  {/* Title */}
  <h1 className="w-full text-xl font-light  text-gray-900 text-center uppercase mb-8 tracking-wider">
    Upload Product in 5 Steps
  </h1>

  {/* Step Heading */}
  <h2 className="text-xl font-semibold text-gray-800 text-center mt-6">
    STEP_4
  </h2>
  <h3 className=" font-medium text-gray-500 uppercase mb-4">
   META_DETAILS : 
  </h3>

  {/* Content List */}
  <ul className="space-y-3 text-gray-700 leading-relaxed list-disc px-4 tracking-wider">
    <li>
      <span className="font-semibold text-gray-900">BRAND NAAME</span> and 
      <span className="font-semibold text-gray-900"> MODLE/NAME</span> are used for SEO. Also used to builds trust to customer.
    </li>
    <li>
      <span className="font-semibold text-gray-800">DISCOUNT</span> will set
       <span className="font-semibold text-gray-800"> price </span> before discount it will not decrease the price you entered.
    </li>
  </ul>
</div>

  )
}

export default Step4