import React, { useEffect, useRef, useState } from 'react'

import { admin_assets as assets } from '../assets/admin_assets/assets'
import SampleCard from '../components/SampleCard';
 import Step_1 from '../components/listingComponents/Step_1';
import Step_2 from '../components/listingComponents/Step_2';
import Step_3 from '../components/listingComponents/Step_3';
import Step_4 from '../components/listingComponents/Step_4';
import Step_5 from '../components/listingComponents/Step_5';


const Add = ({token}) => {

  // state to tell wich step to move
  const [step, setStep] = useState(1)

  const [productData, setProdcutData] = useState({
       category: "", 
       seubcategory: "",
       title: "",
       name: "",
       description: "",
       highlights: [],
       varients: [{
        color: "",
        sizes: [{
          size: "",
          price: null,
          stock: null,
        }],

        images: [],
        price: null,
        stock: 1,
       }],
       discount: null,
  })

//state for basic info used in step 1
  const [basicInfo, setBasicInfo] = useState({
    title: "",
    description: "",
    category: "",
    subcategory: "",
  })
//state for varients used in step 2
  const [variants, setVariants] = useState([
    { color: "", images: [], sizes: [] ,
      price: null,
      stock: null
    }
  ]);

//state for attributes and specifications used in step 3
const [activeCount, setActiveCount] = useState(1);
 const [attributes, setAttributes] = useState({
    dimensions: { 
        length: "",
        width: "",
        height: "",
        dimUnit: "cm", // shared unit for length/width/height
        weight: "",
        weightUnit: "g",
      },

      specs: ["", "", ""],
 })

//state for metadetails used in step 4
 const [metadetails, setMetaDetails] = useState({
    brand: "",
    discount: null,
    model: "", 
    warranty: "", 
 })

//state for delivery details used in step 5
const [deliveryDetails, setDeliveryDetails] = useState({
    COD: true,
    returnPolicy: "",//in days
    shippingTime: "",//in days
    deliveryAreas: [],//pincode array
})
  

  



  

  //function to move on next step
  const handleNext = ()=>{
  if(step < 5){
      setStep(step+1)
      
    }
  }

  const handleBack = ()=>{
    if(step > 1){
      setStep(step-1)
      
    }
  }

 

  return (
  <div className='Container flex  items-around bg-gray-100 w-[80%] h-screen  p-1 gap-2'>


{/* product listing goes here */}


<div className="w-full flex-2 overflow-y-auto flex flex-col bg-white rounded-md  justify-baseline-center items-baseline-center">

{ step === 1 && <Step_1 basicInfo={basicInfo}  setBasicInfo={setBasicInfo}/> }

{ step === 2 && <Step_2 variants={variants}  setVariants={setVariants}/>  }

{ step === 3 && <Step_3 attributes={attributes} setAttributes={setAttributes}
activeCount={activeCount} setActiveCount={setActiveCount}/>}

{ step === 4 &&  <Step_4 metadetails={metadetails} setMetaDetails={setMetaDetails} /> }

{ step === 5 &&  <Step_5 deliveryDetails={deliveryDetails} setDeliveryDetails={setDeliveryDetails}/>}

     <div className="flex py-1 px-6 gap-2">
      { step > 1 &&  <button onClick={handleBack} className="w-full  p-2 text-md  rounded-sm text-black bg-white font mt-2 mb-2 flex justify-center items-center cursor-pointer shadow-xs border border-white hover:border-gray-200"><ion-icon name="arrow-back-outline"></ion-icon> Back</button>
      }


          <button onClick={handleNext} className="w-full  p-2 text-md bg-black rounded-sm text-white mt-2 mb-2 flex justify-center items-center cursor-pointer">
            {step === 5 ? "Publish Product": "Next"}
            {step < 5 && <ion-icon name="arrow-forward-outline"></ion-icon>}
          </button>
     </div>
</div>

{/* guide component on right side */}
  <div className="w-full flex-1 pb-2 ">
    <SampleCard newProduct={productData}/>
  </div>
   
  </div>
  )
}


export default Add