import React, {useState} from "react";
import { BACKEND_URL } from "../config/env.js";

const OrderCard = ({ order, openAddress, setOpenAddress, setOrders, setNotification, setShowNotification }) => {
  
  
// order structure: 
//{
// address:{firstName: 'arslan', lastName: 'Ahmed', phone: '07051047915', street: 'lass saroor', city: 'Kishtwar', …}
// amount
// : 
// null
// createdAt
// : 
// "2026-03-11T11:38:00.638Z"
// paymentStatus
// : 
// "failed"
// paymentType
// : 
// "razorpay"
// price
// : 
// 999
// productId
// : 
// "6975bc5a96fef76f794e3fba"
// productImage
// : 
// "https://res.cloudinary.com/ddaid56zh/image/upload/v1769323208/products/ktkev817ldnlcumcik4i.jpg"
// productTitle
// : 
// "👟 AeroFlex Runner – Comfort Meets Performance"
// quantity
// : 
// 1
// returnPolicy
// : 
// null
// sellerId
// : 
// "694ab8033c183c6ec7cc140b"
// size
// : 
// null
// sizeIndex
// : 
// 0
// status
// : 
// "PLACED"
// updatedAt
// : 
// "2026-04-02T06:46:37.749Z"
// userId
// : 
// {_id: '694035c569a3f85378a77d94', name: 'Arslan Ahmed', email: 'imarslan@gmail.com'}
// variantIndex
// : 
// 0
// __v
// : 
// 0
// _id
// : 
// "69b15418e0b723fc4c324cbe"
console.log("Rendering OrderCard for order:", order);

//destructure order data
  let {
    variant,
    price,
    title,
    size,
    createdAt,
    amount,
    shippingFee,
    returnPolicy,
    address,
    paymentStatus,
    status,


  
}= order;
  
  
    // Update Order Status
    const updateOrderStatus = async (orderId, newStatus) => {
      try {
        
        const response = await fetch(
          `${BACKEND_URL}/api/order/status/${orderId}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ status: newStatus }),
          }
        );
  
        const data = await response.json();
  
        if (data.success) {
          setOrders((prev) =>
            prev.map((order) =>
              order._id === orderId ? { ...order, status: newStatus } : order
            )
          );
  
          setNotification({
            type: "✅Success",
            message: `Order ${newStatus} successfully.`,
            duration: 3000,
          });
  
          setShowNotification(true);
  
          setTimeout(() => setShowNotification(false), 3000);
        }
      } catch (err) {
        console.error("Error updating order:", err);
      }
    };

   

           

            return (
              <div
               key={order._id}
               className="bg-white border border-gray-200 rounded-sm shadow-sm hover:shadow-md transition p-3 flex flex-col gap-3 mb-4 break-inside-avoid  relative"
>

                {/* TOP SECTION */}
                <div className="flex gap-3">

                  {/* IMAGE */}
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={variant?.images[0] || "/placeholder.png"}
                      alt={order?.title}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  {/* PRODUCT INFO */}
                  <div className="flex-1">

                    <h2 className="text-sm md:text-base font-medium line-clamp-2 pt-4">
                      {title}
                    </h2>
                   
                    <span className="bg-gray-100 px-2 py-1 rounded">Date:<span className="text-gray-800">{new Date(createdAt).toLocaleDateString()}</span></span>
                   

                    <div className="flex flex-wrap gap-2 mt-2 text-xs">

                      <span className="bg-gray-100 px-2 py-1 rounded">
                        COLOR: {variant.color}
                      </span>

                      {size && (
                        <span className="bg-gray-100 px-2 py-1 rounded">
                          SIZE: {size}
                        </span>
                      )}

                      <span className="bg-gray-100 px-2 py-1 rounded">
                        QTY: {order.quantity}
                      </span>

                      <span
                        className={`px-2 py-1 rounded ${
                         paymentStatus === "pending"
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        PAYMENT: {paymentStatus}
                      </span>

                      <span className="bg-gray-100 px-2 py-1 rounded">
                        AMOUNT (price + {shippingFee} shipping): ₹{String(amount)} 
                      </span>
                    </div>
                  </div>

                  {/* PRICE + STATUS */}
                  <div className="flex flex-col justify-between items-end">

                    <span
                      className={`text-xs px-2 py-1 rounded font-semibold capitalize absolute top-1 right-1 z-10 
                      ${
                        status === "PLACED"
                          ? "bg-blue-100 text-blue-700"
                          : ""
                      }
                      ${
                        status === "SHIPPED"
                          ? "bg-indigo-100 text-indigo-700"
                          : ""
                      }
                      ${
                        status === "OUT_FOR_DELIVERY"
                          ? "bg-purple-100 text-purple-700"
                          : ""
                      }
                      ${
                        status === "DELIVERED"
                          ? "bg-green-100 text-green-700"
                          : ""
                      }
                      ${
                        status === "CANCELLED"
                          ? "bg-red-100 text-red-700"
                          : ""
                      }
                      ${
                       status === "RETURNED"
                          ? "bg-orange-100 text-orange-700"
                          : ""
                      }`}
                    >
                      {status}
                    </span>

                    <p className="text-sm font-semibold text-green-600 pt-5" >
                      ₹{price}
                    </p>
                  </div>
                </div>

                {/* STATUS UPDATE */}
                <div className="flex justify-between items-center">

                  <div className="text-xs text-gray-600">
                    Update Status:
                  </div>

                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateOrderStatus(order._id, e.target.value)
                    }
                    className="text-xs border-2 border-gray-400 text-gray-600 rounded-xs px-2 py-1 bg-white"
                  >
                    <option value="PLACED">Placed</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                    <option value="RETURNED">Returned</option>
                  </select>
                </div>

                {/* ADDRESS */}
                <div className="border-t pt-2">

                  <button
                    onClick={() =>
                      setOpenAddress(
                        openAddress === order._id ? null : order._id
                      )
                    }
                    className="text-xs text-blue-600 hover:underline cursor-pointer"
                  >
                    {openAddress === order._id
                      ? "Hide Address"
                      : "Show Address"}
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openAddress === order._id
                        ? "max-h-40 mt-2"
                        : "max-h-0"
                    }`}
                  >

                    <div className="bg-gray-100 p-2 rounded text-xs grid grid-cols-2 md:grid-cols-3 gap-2">

                      <div>
                        <p className="font-semibold">Name</p>
                        <p>
                          {address.firstName}{" "}
                          {address.lastName}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold">Phone</p>
                        <p>{order.address?.phone}</p>
                      </div>

                      <div>
                        <p className="font-semibold">City</p>
                        <p>{order.address.city}</p>
                      </div>

                      <div>
                        <p className="font-semibold">Street</p>
                        <p>{order.address.street}</p>
                      </div>

                      

                      {order.address.landMark && (
                        <div>
                          <p className="font-semibold">Landmark</p>
                          <p>{order.address.landMark}</p>
                        </div>
                      )}
                      <div>
                        <p className="font-semibold">Pin</p>
                        <p>{order.address?.pinCode}</p>
                      </div>
                      

                    </div>
                  </div>
                </div>

              </div>
            );
};

export default OrderCard