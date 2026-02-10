import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { SET_TOKEN } from '../context/seller.slice.js';
import {  NavLink, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../config/env.js';

const Login = () => {

  const [current, setCurrent] = useState("login");
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
     const url = `${BACKEND_URL}/api/seller/sign-in`
      const res = await fetch(url, {
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
        
        dispatch(SET_TOKEN(data.token));
        navigate("/");
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

   
 current === "login" &&   <div className="flex w-full  justify-end px-10 md:px-20 items-center h-screen bg-white">
      <form onSubmit={handleSubmit} className="p-6  bg-gray-50 rounded-xs shadow-sm flex flex-col gap-4 border-gray-100 border   ">
 
        <h1 className="text-2xl text-gray-700 font-bold  text-center">Login</h1>
        <input type="email" name="email" placeholder='Username' 
        className=' rounded-xs border border-gray-600 p-2 text-xl  '
        onChange={handleChange}/>
        <input type="password" name="password" placeholder='Password' className=' rounded-xs border border-gray-600 p-2 text-xl'
        onChange={handleChange}/>
        
        <p className="text-center w-full text-gray-500"><NavLink  to={"/register"} onClick={()=> setCurrent("register")}
        className="text-gray-600 font-serif underline">Register your bussiness!</NavLink></p>
        <button type="submit" className=' rounded-xs border-orange-400 p-2 text-white bg-gray-800' >Login</button>
      </form>
      
    </div>
    
   
  ) 
  
}

export default Login