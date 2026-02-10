import React, { useState, useEffect } from "react";
import { BACKEND_URL } from "../config/env.js";
import Loader from "../components/Loader.jsx";

const Orders = () => {

  const [activeButton, setActiveButton] = useState("PLACED");
  const [orders, setOrders] = useState([]);
  const [Loading, setLoading] = useState(true)

  const navButtonStyles = "font-medium uppercase cursor-pointer px-3 py-1 rounded";
  const activeButtonStyles = "bg-lime-500 text-white";

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/order/seller`, {
        credentials: "include",
      });

      const data = await response.json();
       setLoading(false)
      setOrders(data.orderData|| []);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/order/status/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      console.log(data)
      if (data.success) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (err) {
      console.error("Error updating order:", err);
    }
  };


  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter orders by active tab
  const filteredOrders = orders.filter(
    (order) => order.status?.toUpperCase() === activeButton
  );

  if(Loading) return (<Loader/>)
  return (
    <div className="w-full relative">
      {/* Header + Nav */}
      <header className="flex gap-5 p-3 w-full rounded overflow-x-auto bg-gray-900 text-white absolute top-0 z-100">
        <h1 className="text-xl font-semibold">Orders</h1>
        <nav className="flex px-3 gap-3">
          {["PLACED", "SHIPPED", "DELIVERED", "CANCELLED", "OUT_FOR_DELIVERY", "RETURNED"].map((status) => (
            <button
              key={status}
              onClick={() => setActiveButton(status)}
              className={`${navButtonStyles} ${
                activeButton === status ? activeButtonStyles : ""
              }`}
            >
              {status}
            </button>
          ))}
        </nav>
      </header>

      {/* Orders List */}
      <div className="p-5  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 overflow-y-scroll w-full  max-h-screen pt-18 cursor-pointer">
        {filteredOrders.length === 0 ? (
          <p className="text-gray-500">No {activeButton.toLowerCase()} orders.</p>
        ) : (
          filteredOrders.map((order) => {
          const currentVariant =  order.product.variants[order?.variantIndex];
          const price = currentVariant.sizes[order.sizeIndex]?.price || currentVariant.price || "Free";
          const currentSize = currentVariant?.sizes?.[order?.sizeIndex]

      return      (
      <div key={order._id}
            className="bg-white border border-gray-200 shadow rounded-xs overflow-hidden grid grid-cols-8 grid-rows-3 w-full flex-1 h-40 relative">
              {/* Product Image */}
              <div className="p-1  col-start-1 col-span-2 row-span-2 ">
              <img
                src={currentVariant?.images[0] || "/placeholder.png"}
                alt={order.product?.title || "Product"}
                className=" w-full h-full object-cover rounded-xs"
              />
              </div>

              {/* Product Info */}
              <div className="p-2 col-start-3 col-span-full row-span-2 mt-4">
                <h2 className="font-semibold text-lg">
                  {order.product?.title || "Product Title"}
                </h2>

                <ul className="flex ">
                <li className="flex flex-col bg-gray-100 p-2 border-gray-300  border-r">
                 <span className="font-bold text-sm">COLOR.</span>
                 <span className="text-gray-600 capitalize leading-4 text-sm">{currentVariant.color}</span>
              </li>
              { currentSize && <li className="flex flex-col bg-gray-100 p-1 border-gray-300 ">
                 <span className="font-bold text-sm">SIZE.</span>
                 <span className="text-gray-600 capitalize leading-4 text-sm">{currentSize?.size}</span>
              </li> }
               <li className="flex flex-col bg-gray-100 p-2 border-r border-gray-300 ">
                 <span className="font-bold text-sm">QTY.</span>
                 <span className="text-gray-600 capitalize leading-4 text-sm">{order.quantity}</span>
              </li>
               <li className="flex flex-col bg-gray-100 p-2 border-r border-gray-300 ">
                 <span className="font-bold text-sm">PAYMENT.</span>
                 <span className={`text-gray-600 capitalize leading-4 text-sm ${order.paymentStatus === "pending" ? "text-red-500" : ""}`}>{order.paymentStatus}</span>
              </li>
               <li className="flex flex-col bg-gray-100 p-2 border-gray-300 ">
                 <span className="font-bold text-sm">AMOUNT.</span>
                 <span className="text-gray-600 capitalize leading-4 text-sm">
                 ₹{`${order.amount}`}</span>
              </li>


              <li>

              </li>
                </ul>
  
                
              </div>

                {/* Status + Update */}
                <div className="mt-3 flex justify-between items-center col-start-3 col-span-full p-3">
                <p className="flex items-center gap-2 text-gray-700 text-sm">Price: 
                  <span className="text-green-600 font-bold  ">
                   ₹{price || "0.00"}
                </span>
                </p>

                  <span className="text-sm text-gray-700">
                    Status: {order.status}
                  </span>
                  
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateOrderStatus(order._id, e.target.value)
                    }
                    className="border border-gray-400 text-gray-500 rounded  p-1 text-xs absolute top-1 right-2"
                  >
                    <option value="PLACED">Placed</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                    <option value="RETURNED">Returned</option>
                  </select>
                </div>

                {/* ADDRESS DETAILS */}
          <div className=" w-full h-full absolute bg-gray-100/80 backdrop-blur-sm -bottom-full hover:bottom-0 transition-all duration-400">
            <h3 className=" font-semibold text-gray-500 w-25 bg-gray-100/90  relative  -top-7 rounded-t-sm p-1 Hover:w-full text-sm  " >ADDRESS...</h3>
            <ul className="flex gap-x-2 gap-y-1 flex-wrap z-100 relative -top-4 p-2">
              <li className="flex flex-col bg-white p-1  rounded-xs">
                 <span className="font-bold text-sm">NAME.</span>
                 <span className="text-gray-600 capitalize leading-4 text-sm">{order.address.firstName} {order.address.lastName},</span>
              </li>
              <li className="flex flex-col bg-white p-2 rounded-xs">
                 <span className="font-bold text-sm">CITY.</span>
                 <span className="text-gray-600 capitalize leading-4 text-sm">{order.address.city},</span>
              </li>  
              <li className="flex flex-col bg-white p-2 rounded-xs" >
                 <span className="font-bold text-sm">STREET.</span>
                <span className="text-gray-600 capitalize leading-4 text-sm">{order.address.street},</span>
              </li>  
              <li className="flex flex-col bg-white p-2 rounded-xs">
                <span className="font-bold text-sm">PIN CODE.</span>
                <span className="text-gray-600 capitalize leading-4 text-sm">{order.address.pinCode},</span>
              </li>  
              <li className="flex flex-col bg-white p-2 rounded-xs">
                <span className="font-bold text-sm">LandMark.</span>
               <span className="text-gray-600 capitalize leading-4 text-sm">{order.address.landMark},</span>
              </li>  
            </ul>
          </div>

            </div>)
            // ADDRESS DETAILS END
})
)}
      </div>
    </div>
      );
};

export default Orders;
