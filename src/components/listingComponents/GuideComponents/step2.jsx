import React from 'react'

const Step2 = () => {
  return (
   <div className="w-full h-screen flex-1 bg-white p-6">
  {/* Title */}
  <h1 className="w-full text-xl font-semibold   text-gray-700  uppercase mb-8 tracking-tight">
    Upload Product in Five Steps.
  </h1>

  {/* Step Heading */}
  
  <h3 className=" font-medium text-gray-500 uppercase mb-4">
   STEP_2: VARIANTS.
  </h3>

  {/* Content List */}
  <ul className="space-y-3 text-gray-700 leading-5.7 list-disc px-4 tracking-tight">
    <li>
      __Each color variant should have its own <span className="font-semibold text-sm  text-gray-800"> price</span>  and
      <span className="font-semibold text-sm text-gray-800"> stock quantity</span>. Even if the price is same.
    </li>
    <li>
        If the product include sizes than <span className="font-semibold text-sm text-gray-800">price</span> and <span className="font-semibold text-sm text-gray-800">stock</span>  should be according to each size.
    </li>
    <li>
    At least one image is required for each color variant.
    </li>
    <li>first image of first variant will be the thumbnail of the product.</li>
  </ul>
</div>

  )
}

export default Step2