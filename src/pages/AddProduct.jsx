import React, { useEffect, useRef, useState } from 'react'

import { admin_assets as assets } from '../assets/admin_assets/assets'
import SampleCard from '../components/SampleCard';
 import Step_1 from '../components/listingComponents/Step_1';
import Step_2 from '../components/listingComponents/Step_2';
import Step_3 from '../components/listingComponents/Step_3';
import Step_4 from '../components/listingComponents/Step_4';
import VariantsComponent from '../components/listingComponents/varients';


const Add = ({token}) => {
  // state to tell wich step to move
  const [step, setStep] = useState(1)
  const Countsteps = useRef(1);

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

  

  //function to move on next step
  const handleNext = ()=>{
  if(Countsteps.current < 4){
      Countsteps.current++
      setStep(Countsteps.current)
      console.log(Countsteps.current)
    }
  }

  const handleBack = ()=>{
    if(Countsteps.current > 1){
      Countsteps.current--
      setStep(Countsteps.current)
      console.log(Countsteps.current)
    }
  }

 

  return (
  <div className='Container flex  items-around bg-gray-100 w-[80%] h-screen  p-1 gap-2'>


{/* product listing goes here */}


<div className="w-full flex-2 overflow-y-auto ">

{ step === 1 && <Step_1 newProduct={productData}  setNewProduct={setProdcutData}/>
              

}

{ step === 2 && <VariantsComponent newProduct={productData} setNewProduct={setProdcutData}/> 
               
}
{ step === 3 && <Step_3/>
               
}
{ step === 4 &&  <Step_4/>
               
}

     <div className="flex py-1 px-6 gap-2">
         <button onClick={handleBack} className="w-full  p-2 text-md  rounded-sm text-black bg-white font mt-2 mb-2 flex justify-center items-center"><ion-icon name="arrow-back-outline"></ion-icon> Back</button>
          <button onClick={handleNext} className="w-full  p-2 text-md bg-black rounded-sm text-white mt-2 mb-2">Next</button>
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