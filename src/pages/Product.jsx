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

               <li
  key={item._id}
  className="bg-white w-full xl:w-[48%] rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col sm:flex-row gap-4 relative"
>

  {/* 3 DOT MENU */}
  <div className="absolute top-3 right-3">
    <button
      onClick={() => {
        setProductId(item._id);
        setpopUp(!popUp);
      }}
      className="text-gray-500 hover:text-gray-800"
    >
      <ion-icon name="ellipsis-vertical"></ion-icon>
    </button>

    {popUp && ProductId === item._id && (
      <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg border text-sm z-50">
        <button
          onClick={() => {
            setOpenDeleteModal(true);
            setpopUp(false);
          }}
          className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600"
        >
          Delete
        </button>

        <button
          className="w-full text-left px-4 py-2 hover:bg-gray-50"
        >
          Update
        </button>
      </div>
    )}
  </div>

  {/* IMAGE */}
  <div className="w-full sm:w-32 h-40 sm:h-32 rounded-lg overflow-hidden flex-shrink-0">
    <img
      src={item.variants[0].images[0]}
      alt="product"
      className="w-full h-full object-cover"
    />
  </div>

  {/* CONTENT */}
  <div className="flex flex-col justify-between flex-1">

    {/* Title + Description */}
    <div>
      <h3 className="text-lg font-semibold text-gray-800">
        {item.title}
      </h3>

      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
        {item.description}
      </p>
    </div>

    {/* Bottom Stats */}
    <div className="flex flex-wrap items-center justify-between mt-4 gap-3">

      {/* PRICE */}
      <div className="text-sm">
        <span className="text-gray-500">Price</span>
        <p className="text-green-600 font-semibold text-lg">
          ₹
          {item.variants[0]?.sizes?.[0]?.price ||
            item.variants[0]?.price ||
            0}
        </p>
      </div>

      {/* STOCK */}
      <div className="text-sm">
        <span className="text-gray-500">Stock</span>
        <p className="font-semibold text-gray-800">
          {item.variants
            .flatMap((v) =>
              v?.sizes?.length > 0
                ? v.sizes.map((s) => s?.stock || 0)
                : [v?.stock || 0]
            )
            .reduce((a, b) => a + b, 0)}
        </p>
      </div>

      {/* STATUS BADGE */}
      <div>
        {item.variants
          .flatMap((v) =>
            v?.sizes?.length > 0
              ? v.sizes.map((s) => s?.stock || 0)
              : [v?.stock || 0]
          )
          .reduce((a, b) => a + b, 0) > 0 ? (
          <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
            In Stock
          </span>
        ) : (
          <span className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full">
            Out of Stock
          </span>
        )}
      </div>

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