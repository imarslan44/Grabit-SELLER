import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SET_TOKEN } from "../context/seller.slice.js";
import { NavLink, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config/env.js";
import { assets } from "../assets/assets.js";
const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      alert("Please fill all the fields!");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/seller/sign-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      const data = await res.json().catch(() => ({}));
       console.log(data)
       if (!res.ok) {
        const msg = data?.message || `Request failed (${res.status})`;
        console.error("Login failed:", msg, data);
        alert(msg);
        setLoading(false);
        return;
      }
  
      if (data.token) {
        localStorage.setItem("sellerToken", data.token);
        dispatch(SET_TOKEN(data.token));

            navigate("/");
       
      } else {
        console.error("Unexpected response:", data);
        alert(data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Network/error:", error);
      alert("Something went wrong. Check the console and network tab.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex  md:p-10">
   <div className="w-40 sm:w-60 h-20 sm:h-28  md:m-6 p-2 absolute">
      <img src={assets.logo} alt="Logo" className="w-full h-full object-cover"/>
   </div>
      {/* LEFT BRAND PANEL */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br  p-16 flex-col justify-center border-r border-gray-200">
        <h1 className="text-6xl font-bold uppercase mb-6">Sell Smarter with <span className="text-main ">BARKET</span></h1>
        <p className="text-lg text-gray-700">
          Manage products, track orders and grow your business —
          all in one powerful dashboard.
        </p>
      </div>

      {/* RIGHT LOGIN CARD */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white ">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-[90%] max-w-md p-10 rounded-md shadow border border-gray-200"
        >
          <h2 className="text-2xl text-gray-800 font-semibold mb-8 text-center">
            Seller Login
          </h2>

          <div className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-3 rounded-sm focus:ring-2 focus:ring-gray-600 outline-none"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-3 rounded-sm focus:ring-2 focus:ring-gray-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-gray-900 text-white py-3 rounded-sm font-medium cursor-pointer
             hover:bg-gray-700 transition"
          >
            Login
          </button>

          <p className="text-sm text-gray-500 text-center mt-6">
            Don’t have a seller account?{" "}
            <NavLink
              to="/register"
              className="text-gray-800 font-medium hover:underline"
            >
              Register now
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
