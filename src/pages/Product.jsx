import React, { useState,useEffect } from 'react'
import { BACKEND_URL } from '../config/env'

const Product = () => {
const [producList, setProductList] = useState([])
const [popUp, setpopUp] = useState(false)

const fetchProducts = async ()=>{
    try{
    const url = `${BACKEND_URL}/api/product/seller`;
    const response = await fetch(url, {credentials: 'include'});
   
    const data = await response.json();
    console.log(data); //cast error 
    console.log(response)
    
    setProductList(data.products || []);

}catch(error){

console.log("error:", error)
}

}

useEffect(() => {
  fetchProducts()
}, [])

  return (
    <section className='w-full h-screen flex flex-col bg-green-200/10'>

        <header className="w-full p-3 ">
            <h1 className="text-xl font-bold font-serif text-gray-800">Our_Products.</h1> 
            {/* rendered successfully */}
        </header>
        <ul className=" w-full  h-full flex-1 p-5  overflow-auto flex gap-3 flex-wrap bg-gray-100">
           {
            producList.length > 0  && producList.map((item, index)=>(

                <li key={item._id} className="p-2 bg-white shadow-sm  rounded-sm flex gap-2    text-gray-800 overflow-hidden relative w-[48%]">

                    <button className="absolute top-2 right-2 cursor-pointer" onClick={()=>setpopUp(!popUp)}><ion-icon  name="ellipsis-vertical"></ion-icon></button>
                    
                    {/*update popUp  */}
                 { popUp &&  <div className=" bg-white flex flex-col  w-30 h-20  rounded-xs shadow absolute z-100 pt-6 top-3 right-6 ">
                    <button onClick={()=>setpopUp(false)}
                        className="text-lg absolute top-1 right-2 cursor-pointer">
                        <ion-icon name="close-outline" ></ion-icon>
                    </button>
                        <button 
                        className="font-semibold  w-full h-1/2 bg-white hover:bg-red-300 text-start px-2 border-b border-gray-300 cursor-pointer">DELETE</button>
                        {/* Disabled */}
                        <button className="font-semibold  w-full h-1/2 bg-white text-start px-2 text-gray-500">UPDATE</button>

                    </div> }

                    {/* image section */}
                     <div className="w-30 h-30 overflow-hidden rounded-sm">
                        <img src={item.variants[0].images[0]} alt="item image" className="w-full h-full object-center object-cover" />
                     </div>
                    <div className="w-full flex-1">
                        <h3 className="font-bold text-xl  ">{item.title}</h3>
                        <p className="font-extralight text-xs pb-1 w-8/10 h-16 tracking-wide">{item.description}</p>
                    <div className="flex  gap-4">
                         {/* Price */}
                     <p className=" text-md ">PRICE: <span className="text-lime-600 ">₹{item.variants[0]?.sizes[0]?.price || item.variants[0]?.price || 0}</span></p>
                        {/* stocks */}
                       <p className="text-md">
                        STOCK QTY: <span className="text-lime-500">
                       {item.variants
                        .flatMap(v => v?.sizes ? v.sizes.map(s => s?.stock || 0) : [v?.stocks || 0])
                        .reduce((a, b) => a + b, 0)}
                       </span>
                       </p>
                    </div>
                    </div>
                </li>

            )) 
           }
        </ul>

    </section>
  )
}

export default Product