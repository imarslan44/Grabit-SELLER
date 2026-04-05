import React, { useState, useEffect } from "react";
import { BACKEND_URL } from "../config/env.js";
import Loader from "../components/Loader.jsx";
import Notification from "../components/Notification.jsx";
import OrderCard from "../components/OrderCard.jsx";
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

  const activeButtonStyles = "bg-main text-white shadow";

  // Fetch Orders

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/order/seller`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: activeButton.toLowerCase() }), // Send status in request body
      });

      const data = await response.json();

      setOrders(data.orders || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

 

  useEffect(() => {
    setOrders([]);
    setLoading(true);
    fetchOrders();
  }, [activeButton]);

  const filteredOrders = orders.filter(
    (order) => order.status?.toUpperCase() === activeButton
  );

  

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
      <header className="flex gap-5 p-3 w-full overflow-x-auto bg-black text-white sticky top-0 z-95">

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
      <div className="p-4 md:p-6 columns-1 xl:columns-2 bg-gray-50 w-full gap-4 overflow-y-scroll h-full max-sm:pb-14 msx-sm:flex flex-col items-center relative">

        {loading ? (
            <Loader title={"Loading orders..."} styles={"absolute top-0 left-0"} />
          ) : (

        orders.length === 0 ? (
          <p className="text-gray-500">
            No {activeButton.toLowerCase()} orders.
          </p>
        ) : (
          orders.map((order) => (
        <OrderCard key={order._id} order={order} openAddress={openAddress} setOpenAddress={setOpenAddress} setOrders={setOrders} setNotification={setNotification} setShowNotification={setShowNotification}/>
          ))
        )
      )}
      </div>
    </div>
  );
};

export default Orders;