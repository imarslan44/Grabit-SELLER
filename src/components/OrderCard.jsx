import React, {useState} from "react";
import { BACKEND_URL } from "../config/env.js";

const OrderCard = ({ order, openAddress, setOpenAddress, setOrders, setNotification, setShowNotification }) => {

  let {
    _id,
    createdAt,
    status,
    paymentStatus,
    paymentType,
    quantity,
    amount,
    productTitle,
    productImage,
    address,
    returnPolicy,
    updatedAt,
  } = order;
  
  
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
            type: "Success",
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

   const currentVariant =
              order.product.variants[order?.variantIndex];

            const price =
              currentVariant.sizes[order.sizeIndex]?.price ||
              currentVariant.price ||
              "Free";

            const currentSize =
              currentVariant?.sizes?.[order?.sizeIndex];

            return (
              <div
               key={order._id}
               className="bg-white border border-gray-200 rounded-sm shadow-sm hover:shadow-md transition p-3 flex flex-col gap-3 mb-4 break-inside-avoid"
>

                {/* TOP SECTION */}
                <div className="flex gap-3">

                  {/* IMAGE */}
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={currentVariant?.images[0] || "/placeholder.png"}
                      alt={order.product?.title}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  {/* PRODUCT INFO */}
                  <div className="flex-1">

                    <h2 className="text-sm md:text-base font-medium line-clamp-2">
                      {order.product?.title}
                    </h2>
                    
                    <span className="bg-gray-100 px-2 py-1 rounded">Ordered On: <span className="text-gray-800">{new Date(createdAt).toLocaleDateString()}</span></span>

                    <div className="flex flex-wrap gap-2 mt-2 text-xs">

                      <span className="bg-gray-100 px-2 py-1 rounded">
                        COLOR: {currentVariant.color}
                      </span>

                      {currentSize && (
                        <span className="bg-gray-100 px-2 py-1 rounded">
                          SIZE: {currentSize.size}
                        </span>
                      )}

                      <span className="bg-gray-100 px-2 py-1 rounded">
                        QTY: {order.quantity}
                      </span>

                      <span
                        className={`px-2 py-1 rounded ${
                          order.paymentStatus === "pending"
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        PAYMENT: {order.paymentStatus}
                      </span>

                      <span className="bg-gray-100 px-2 py-1 rounded">
                        AMOUNT: ₹{order.amount}
                      </span>
                    </div>
                  </div>

                  {/* PRICE + STATUS */}
                  <div className="flex flex-col justify-between items-end">

                    <span
                      className={`text-xs px-2 py-1 rounded font-semibold capitalize
                      ${
                        order.status === "PLACED"
                          ? "bg-blue-100 text-blue-700"
                          : ""
                      }
                      ${
                        order.status === "SHIPPED"
                          ? "bg-indigo-100 text-indigo-700"
                          : ""
                      }
                      ${
                        order.status === "OUT_FOR_DELIVERY"
                          ? "bg-purple-100 text-purple-700"
                          : ""
                      }
                      ${
                        order.status === "DELIVERED"
                          ? "bg-green-100 text-green-700"
                          : ""
                      }
                      ${
                        order.status === "CANCELLED"
                          ? "bg-red-100 text-red-700"
                          : ""
                      }
                      ${
                        order.status === "RETURNED"
                          ? "bg-orange-100 text-orange-700"
                          : ""
                      }`}
                    >
                      {order.status}
                    </span>

                    <p className="text-sm font-semibold text-green-600">
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
                          {order.address.firstName}{" "}
                          {order.address.lastName}
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