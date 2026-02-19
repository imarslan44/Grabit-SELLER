import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SET_TOKEN } from "../context/seller.slice.js";
import { NavLink, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config/env.js";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

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

    try {
      const res = await fetch(`${BACKEND_URL}/api/seller/sign-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("sellerToken", data.token);
        dispatch(SET_TOKEN(data.token));
        navigate("/");
      } else {
        alert(data.message || "Login failed.");
      }
    } catch (error) {
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen w-screen flex">

      {/* LEFT BRAND PANEL */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-lime-500 via-lime-700 to-green-700 text-white p-16 flex-col justify-center">
        <h1 className="text-4xl font-bold mb-6">Sell Smarter with Grabit</h1>
        <p className="text-lg text-gray-200">
          Manage products, track orders and grow your business —
          all in one powerful dashboard.
        </p>
      </div>

      {/* RIGHT LOGIN CARD */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-[90%] max-w-md p-10 rounded-2xl shadow-xl"
        >
          <h2 className="text-2xl font-semibold mb-8 text-center">
            Seller Login
          </h2>

          <div className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-lime-600 outline-none"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-lime-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-lime-600 text-white py-3 rounded-lg font-medium hover:bg-green-500 transition"
          >
            Login
          </button>

          <p className="text-sm text-gray-500 text-center mt-6">
            Don’t have a seller account?{" "}
            <NavLink
              to="/register"
              className="text-green-600 font-medium hover:underline"
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
