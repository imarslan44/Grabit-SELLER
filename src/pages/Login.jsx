import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { SET_TOKEN } from '../context/seller.slice.js';
import {  useNavigate } from 'react-router-dom';
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
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    //login logic here
    if(!credentials.email || !credentials.password){
      alert("Please fill all the fields!");
      return;
    }
    try{

      const res = await fetch("http://localhost:5000/api/seller/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
      })
      const data = await res.json();
      console.log("Seller login response:", data);
      if(data.token){
        localStorage.setItem("sellerToken", data.token);
        alert("Login successful!");
        dispatch(SET_TOKEN(data.token));
        navigate("/add-product");
        // Optionally, redirect to dashboard page
      }else{
        alert(data.message || "Login failed. Please try again.");
      }
  } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again later.");
    }
  }



  return (
    //login page content
    <div className="flex w-full  justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="p-6 w-1/4 bg-white rounded-md shadow-md flex flex-col gap-4   ">

        <h1 className="text-lg text-gray-700 font-bold text-center">Login</h1>
        <input type="email" name="email" placeholder='Username' className=' rounded border-gray-600 p-2 '
        onChange={handleChange}/>
        <input type="password" name="password" placeholder='Password' className=' rounded border-gray-600 p-2 '
        onChange={handleChange}/>
        <button type="submit" className=' rounded border-gray-600 p-2 text-white bg-gray-800' >Login</button>
      </form>
      
    </div>
  )
}

export default Login