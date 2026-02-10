import React, { useState,useEffect } from 'react'
import { BACKEND_URL } from '../config/env'
import Loader from '../components/Loader'
import Notification from '../components/Notification'


const Product = () => {
const [producList, setProductList] = useState([])
const [popUp, setpopUp] = useState(false)
const [Loading, setLoading] = useState(true)
const [ProductId, setProductId] = useState("");
const [openDeleteModal, setOpenDeleteModal] = useState(false)
//States to manage Notifications/alerts
const [showNotification, setShowNotification] = useState(false)
const [notification, setNotification] = useState({
    message: "",
    type: "",
    duration: 0,
});


//fetch sellers products
const fetchProducts = async ()=>{
    try{
    const url = `${BACKEND_URL}/api/product/seller`;
    const response = await fetch(url, {credentials: 'include'});
   
    const data = await response.json();
    setLoading(false)
    setProductList(data.products || []);

}catch(error){

console.log("error:", error)
}

}

//delete product
const deleteProduct = async ()=>{
 try{
    const URL = `${BACKEND_URL}/api/product/${ProductId}`
    const res = await fetch(URL, {
        method: "DELETE",
        headers: {"Content-Type" : "application/json"},
        credentials: "include",
        })

        
    const deletedProduct = await res.json();

  console.log(deletedProduct.message)
    if(!deleteProduct.success) {
        setOpenDeleteModal(false);
        setNotification({type: "Error", message : deletedProduct.message, duration: 2500});
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 2500);
    }
  

 }catch(err){
    console.log(err)
 }
}

useEffect(() => {
  fetchProducts();
}, [])

if(Loading) return (<div className='w-full bg-violet-50 h-screen'>
    <Loader/> </div>)

  return (
    <section className=' relative w-full min-h-screen  flex flex-col bg-violet-50'>
        {/* Notification */}
    { showNotification && <Notification type={notification.type} message={notification.message} duration={notification.duration}/>}   

{/* Delete Modal */}
{ openDeleteModal && 
  <div className="w-full h-full bg-violet-100/50 backdrop-blur-sm absolute z-100 top-0 left-0 flex justify-center items-center ">

   <div className="p-10 rounded bg-white shadow flex flex-col">
        <p className="p-2 text-center text-lg pb-10">Do you really want to delete this product. <br />

            Remember deleted product can not be recovered
        </p>
        <div className='flex justify-around px-10'>
        <button onClick={deleteProduct}
         className="text-gray-100 p-1 px-4 rounded-sm  black bg-red-500 cursor-pointer">Delete</button>
         <button onClick={()=>setOpenDeleteModal(false)}
          className="p-1 px-4  rounded-sm  black bg-gray-200 cursor-pointer">Cancel</button>
        </div>

    </div>
  </div>
}
        <header className="w-full p-3 ">
            <h1 className="text-xl font-bold font-serif text-gray-800">Our_Products.</h1> 
            {/* rendered successfully */}
        </header>

        
        <ul className=" w-full  h-full flex-1 p-5  overflow-auto flex gap-3 flex-wrap ">
           {
            producList.length > 0  && producList.map((item, index)=>(

                <li key={item._id} className="p-2 bg-white shadow-sm   rounded-sm flex gap-3 min-h-60 max-h-70   text-gray-800 overflow-hidden relative w-full">

                    <button className="absolute top-2 right-2 cursor-pointer" onClick={()=>{
                        console.log(item._id)
                        setProductId(item._id)
                        setpopUp(!popUp);

                        }}>
                        <ion-icon  name="ellipsis-vertical"></ion-icon>
                    </button>
                    
                    {/*update popUp  */}
                 { popUp &&  <div  className={` bg-white flex flex-col  w-30 h-20  rounded-xs shadow absolute z-100 pt-6 top-3 right-6 ${ProductId === item._id ? "" : "hidden"}`}>

                    <button onClick={()=>setpopUp(false)}
                        className="text-lg absolute top-1 right-2 cursor-pointer">
                        <ion-icon name="close-outline" ></ion-icon>
                    </button>
                        <button onClick={()=>{setOpenDeleteModal(true)
                            setpopUp(false)}
                        }
                        className="font-semibold  w-full h-1/2 bg-white hover:bg-red-300 text-start px-2 border-b border-gray-300 cursor-pointer" >DELETE</button>
                        {/* Disabled */}
                        <button className="font-semibold  w-full h-1/2 bg-white text-start px-2 text-gray-500" >UPDATE</button>

                    </div> }

                    {/* image section */}
                     <div className="w-32 h-30 overflow-hidden rounded-sm">
                        <img src={item.variants[0].images[0]} alt="item image" className="w-full h-full object-center object-cover" />
                     </div>
                    <div className="w-full flex-1">
                        <h3 className="font-bold text-xl  ">{item.title}</h3>
                        <p className="font-extralight text-xs pb-1 w-8/10 h-16 tracking-wide">{item.description}</p>
                    <div className="flex absolute w-full bottom-0 py-3 bg-white  gap-10 left-3">
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