import React, { useState, useEffect } from "react";
import { BACKEND_URL } from "../config/env.js";
import Loader from "../components/Loader.jsx";
import Notification from "../components/Notification.jsx";

const Orders = () => {

  const [activeButton, setActiveButton] = useState("PLACED");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAddress, setOpenAddress] = useState(null);

  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({
    type: "",
    message: "",
    duration: 0,
  });

  const navButtonStyles =
    "font-medium text-xs md:text-sm uppercase cursor-pointer px-3 py-1 rounded whitespace-nowrap";

  const activeButtonStyles = "bg-lime-500 text-white shadow";

  // Fetch Orders
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/order/seller`, {
        credentials: "include",
      });

      const data = await response.json();

      setOrders(data.orderData || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

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

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(
    (order) => order.status?.toUpperCase() === activeButton
  );

  if (loading) return <Loader />;

  return (
    <div className="w-full h-screen overflow-x-hidden overflow-y-scroll relative">

      {showNotification && (
        <Notification
          type={notification.type}
          message={notification.message}
          duration={notification.duration}
        />
      )}

      {/* HEADER */}
      <header className="flex gap-5 p-3 w-full overflow-x-auto bg-gray-900 text-white sticky top-0 z-10">

        <h1 className="text-xl font-semibold">Orders</h1>

        <nav className="flex px-3 gap-3">
          {[
            "PLACED",
            "SHIPPED",
            "DELIVERED",
            "CANCELLED",
            "OUT_FOR_DELIVERY",
            "RETURNED",
          ].map((status) => (
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

      {/* ORDERS LIST */}
      <div className="p-4 md:p-6 columns-1 lg:columns-2 bg-gray-50 w-full gap-4 overflow-y-scroll ">

        {filteredOrders.length === 0 ? (
          <p className="text-gray-500">
            No {activeButton.toLowerCase()} orders.
          </p>
        ) : (
          filteredOrders.map((order) => {

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
                    className="text-xs border rounded px-2 py-1 bg-white"
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
                        <p className="font-semibold">City</p>
                        <p>{order.address.city}</p>
                      </div>

                      <div>
                        <p className="font-semibold">Street</p>
                        <p>{order.address.street}</p>
                      </div>

                      <div>
                        <p className="font-semibold">Pin</p>
                        <p>{order.address.pinCode}</p>
                      </div>

                      {order.address.landMark && (
                        <div>
                          <p className="font-semibold">Landmark</p>
                          <p>{order.address.landMark}</p>
                        </div>
                      )}

                    </div>
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Orders;