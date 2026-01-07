import React from 'react'

const Step2 = () => {
  return (
   <div className="w-full h-screen flex-1 bg-white p-6">
  {/* Title */}
  <h1 className="w-full text-xl font-light  text-gray-900 text-center uppercase tracking-wider">
    Upload Product in 5 Steps
  </h1>

  {/* Step Heading */}
  <h2 className="text-xl font-semibold text-gray-800 text-center my-4 mt-6 ">
    STEP_2
  </h2>
  <h3 className=" font-medium text-gray-500 uppercase mb-4 ">
    VARIANTS :
  </h3>

  {/* Content List */}
  <ul className="space-y-3 text-gray-700 leading-relaxed list-disc px-4 tracking-wider ">
    <li>
      __Each color variant should have its own <span className="font-semibold text-gray-900"> price</span>  and
      <span className="font-semibold text-gray-900"> stock quantity</span>. Even if the price is same.
    </li>
    <li>
        If the product include sizes than <span className="font-semibold text-gray-900">price</span> and <span className="font-semibold text-gray-900">stock</span>  should be according to each size.
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