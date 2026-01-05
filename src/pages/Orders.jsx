import React, { useState, useEffect } from "react";
import { BACKEND_URL } from "../config/env.js";

const Orders = () => {

  const [activeButton, setActiveButton] = useState("PLACED");
  const [orders, setOrders] = useState([]);

  const navButtonStyles = "font-medium uppercase cursor-pointer px-3 py-1 rounded";
  const activeButtonStyles = "bg-lime-500 text-white";

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/order/seller`, {
        credentials: "include",
      });

      const data = await response.json();
      console.log(data)
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

  return (
    <div className="w-[82%] relative">
      {/* Header + Nav */}
      <header className="flex gap-5 p-3 w-full bg-gray-900 text-white absolute top-0">
        <h1 className="text-xl font-semibold">Orders</h1>
        <nav className="flex px-3 gap-3">
          {["PLACED", "SHIPPED", "DELIVERED", "CANCELLED"].map((status) => (
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

      return      (
      <div key={order._id}
            className="bg-white border border-gray-200 shadow rounded-xs overflow-hidden grid grid-cols-8 grid-rows-3 w-full flex-1 h-40 ">
              {/* Product Image */}
              <div className="p-1  col-start-1 col-span-2 row-span-2">
              <img
                src={currentVariant?.images[0] || "/placeholder.png"}
                alt={order.product?.title || "Product"}
                className=" w-full h-full object-cover rounded-xs"
              />
              </div>

              {/* Product Info */}
              <div className="p-2 col-start-3 col-span-full row-span-2">
                <h2 className="font-semibold text-lg">
                  {order.product?.title || "Product Title"}
                </h2>
                <p className="text-gray-600">
                  {order.product?.description || "Product description..."}
                </p>
                <p className="text-green-600 font-bold mt-2">
                  ₹{price || "0.00"}
                </p>
              </div>

                {/* Status + Update */}
                <div className="mt-3 flex justify-between items-center col-start-1 col-span-full p-3">
                  <span className="text-sm text-gray-700">
                    Status: {order.status}
                  </span>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateOrderStatus(order._id, e.target.value)
                    }
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="PLACED">Placed</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                    <option value="RETURNED">Returned</option>
                  </select>
                </div>

            </div>)
})
)}
      </div>
    </div>
      );
};

export default Orders;
