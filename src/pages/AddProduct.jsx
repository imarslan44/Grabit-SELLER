import React, { useEffect, useRef, useState } from 'react'

import { admin_assets as assets } from '../assets/admin_assets/assets'
import SampleCard from '../components/SampleCard';
 import Step_1 from '../components/listingComponents/Step_1';
import Step_2 from '../components/listingComponents/Step_2';
import Step_3 from '../components/listingComponents/Step_3';
import Step_4 from '../components/listingComponents/Step_4';
import Step_5 from '../components/listingComponents/Step_5';
import Step1 from '../components/listingComponents/GuideComponents/Step1';
import Step2 from '../components/listingComponents/GuideComponents/step2';
import Step3 from '../components/listingComponents/GuideComponents/Step3';
import Step4 from '../components/listingComponents/GuideComponents/step4';
import Step5 from '../components/listingComponents/GuideComponents/Step5';

const Add = ({token}) => {

  const [Loading, setLoading] = useState(false)
  // state to tell wich step to move
  const [step, setStep] = useState(1)
  const [productImages, setProductImages] = useState([]);


 //prepare form data to send to backend
 const prepareFormData = (formData) => {
  // Append basic info
  formData.append("title", basicInfo.title);
  formData.append("description", basicInfo.description);
  formData.append("category", basicInfo.category);
  formData.append("subcategory", basicInfo.subcategory);
  // Append variants
  const variants = prepareVariantsForSubmission(preVariants);
  formData.append("variants", JSON.stringify(variants));
  // Append attributes
  formData.append("attributes", JSON.stringify(attributes));
  // Append meta details
  formData.append("brand", metadetails.brand);
  formData.append("model", metadetails.model);
  formData.append("warranty", metadetails.warranty);
  formData.append("discount", metadetails.discount);
  // Append delivery details
  formData.append("delivery", JSON.stringify(deliveryDetails));
  // Append images

  productImages.forEach((image, index) => {
    formData.append("images", image);
  });
}


const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  prepareFormData(formData);

  try {
    setLoading(true)
    const response = await fetch('http://localhost:5000/api/product/add', {
      method: 'POST',
      headers: {  
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: formData
    });
    console.log("response",response)
    const data = await response.json(); 
    console.log("Response from server:", data);
    if(data.success) {
      setLoading(false);
      return alert("Product uploaded successfully")
    }
    
  } catch (error) {
    console.error("Error submitting form:", error);
  }
}



  

//state for basic info used in step 1
  const [basicInfo, setBasicInfo] = useState({
    title: "",
    description: "",
    category: "",
    subcategory: "",
  })

//state for varients used in step 2
  const [preVariants, setpreVariants] = useState([
    { color: "",
      images: [],
      sizes: [] ,
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


  //convert all files in varient to null before sending to backend
  const prepareVariantsForSubmission = (variants) => {
    return variants.map(variant => {
      const updatedVariant = { ...variant };
      updatedVariant.images = variant.images.map(() => null);
      return updatedVariant;
    });
  }

 
if(Loading) return (<h1>Uploading...</h1>
)
  return (
  <div className='Container flex  items-around bg-gray-100 w-[80%] h-screen  p-1 gap-2'>


{/* product listing goes here */}


<div  className="w-full flex-2  flex flex-col bg-white rounded-md  justify-baseline-center items-baseline-center relative">

{ step === 1 && <Step_1 handleNext={handleNext} basicInfo={basicInfo}  setBasicInfo={setBasicInfo}/> }

{ step === 2 && <Step_2 handleBack={handleBack} handleNext={handleNext} variants={preVariants}  setVariants={setpreVariants} productImages={productImages} setProductImages={setProductImages} />}

{ step === 3 && <Step_3 handleBack={handleBack} handleNext={handleNext} attributes={attributes} setAttributes={setAttributes}
activeCount={activeCount} setActiveCount={setActiveCount}/>}

{ step === 4 &&  <Step_4 handleBack={handleBack} handleNext={handleNext} metadetails={metadetails} setMetaDetails={setMetaDetails} /> }

{ step === 5 &&  <Step_5 handleBack={handleBack} handleSubmit={handleSubmit} deliveryDetails={deliveryDetails} setDeliveryDetails={setDeliveryDetails}/>}
    
</div>

{/* guide component on right side */}
  <div className="w-full flex-1 pb-2 ">
       
    {step === 1 && <Step1/>}
    {step === 2 && <Step2/>}
    {step === 3 && <Step3/>}
    {step === 4 && <Step4/>}
    {step === 5 && <Step5/>}

  </div>
   
  </div>
  )
}


export default Add