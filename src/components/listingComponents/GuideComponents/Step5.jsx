import React from 'react'

const Step5 = () => {
  return (
   <div className="w-full h-screen flex-1 bg-white p-6">
  {/* Title */}
  <h1 className="w-full text-xl font-semibold   text-gray-700  uppercase mb-8 tracking-tight">
    Upload Product in Five Steps.
  </h1>

  {/* Step Heading */}
  
  <h3 className=" font-medium text-gray-500 uppercase mb-4">
   STEP_5: Delivery & Area
  </h3>

  {/* Content List */}
  <ul className="space-y-3 text-gray-700 leading-5.7 list-disc px-4 tracking-tight">
    <li>Pleas Tick the if you want cash on delivery available for this product.
    </li>
    <li>
      Return and Shipment should be less than  or equal to 7 days
    </li>
    <li>
        Click on the <span className="p-1 rounded-xs mx-1 bg-blue-200"> +Add </span>  button to add pin codes in the list. you can have multiple pincodes (deliveryAreas).
        only add the Pin code (Areas) you can reach.
    </li>
  </ul>
</div>

  )
}

export default Step5