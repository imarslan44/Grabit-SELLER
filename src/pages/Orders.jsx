import React, { useState, useEffect } from "react";
import { BACKEND_URL } from "../config/env.js";

const Orders = () => {
  const [activeButton, setActiveButton] = useState("NEW");
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
      setOrders(data.orders || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/order/status/${orderId}`, {
        method: "PUT",
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
    <div>
      {/* Header + Nav */}
      <header className="flex gap-5 p-3 w-screen bg-gray-900 text-white">
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
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrders.length === 0 ? (
          <p className="text-gray-500">No {activeButton.toLowerCase()} orders.</p>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow rounded-lg overflow-hidden"
            >
              {/* Product Image */}
              <img
                src={order.product?.image || "/placeholder.png"}
                alt={order.product?.title || "Product"}
                className="w-full h-40 object-cover"
              />

              {/* Product Info */}
              <div className="p-4">
                <h2 className="font-semibold text-lg">
                  {order.product?.title || "Product Title"}
                </h2>
                <p className="text-gray-600">
                  {order.product?.description || "Product description..."}
                </p>
                <p className="text-green-600 font-bold mt-2">
                  ₹{order.product?.price || "0.00"}
                </p>

                {/* Status + Update */}
                <div className="mt-3 flex justify-between items-center">
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
                    <option value="NEW">New</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                    <option value="RETURNED">Returned</option>
                  </select>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
