import React, { useState } from 'react';
import "./register.css";
import Step_1 from  '../components/registerComponents/Step_1.jsx';
import Step_2 from  '../components/registerComponents/Step_2.jsx';
import Step_3 from  '../components/registerComponents/Step_3.jsx';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SET_TOKEN } from '../context/seller.slice.js';

const Register = () => {
     const [Seller, setSeller] = useState({
    name: "",
    storeName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    pinCode: "",
    PAN: "",
    AccountNumber: "",
    IFSC: "",
  });
    const [StepCount, setStepCount] = useState(1);
    const [error, seterror] = useState("")

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const nextStep = (e)=>{
      e.preventDefault();
      StepCount < 3 && setStepCount(StepCount + 1);
    }

    const prevStep = (e)=>{
      e.preventDefault();
      StepCount > 1 && setStepCount(StepCount - 1);
    }

    const handleSubmit = async (e) =>{
      e.preventDefault();
        // final submission logic here
        if(!Seller.name || !Seller.storeName || !Seller.email || !Seller.password || !Seller.phone || !Seller.address || !Seller.pinCode || !Seller.PAN || !Seller.AccountNumber || !Seller.IFSC){
          seterror("Please fill all the fields!");
          return;
        }
        try{

        const res = await fetch("http://localhost:5000/api/seller/sign-up", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            credentials: "include",
          },
          body: JSON.stringify(Seller),
        })

        const data = await res.json();
        console.log("Seller registration response:", data);

        if(data.success){
          localStorage.setItem("sellerToken", data.token);
          alert("r successful! Please log in.");
          dispatch(SET_TOKEN(data.token));
         
          
          // Optionally, redirect to login page
        }else{
          seterror(data.message || "Registration failed. Please try again.");
        }

      }catch(err){
        console.log("Error during seller registration:", err);
      }
    }


  return (
    <div className="w-full  flex flex-col items-center justify-center  bg-white  p-3">

      <form onSubmit={handleSubmit} className={`register-form ${StepCount == 2 ? 'max' : 'min'} flex flex-col bg-white p-4 md:p-8 max-sm:w-full space-y-4 border border-gray-200 rounded-xs shadow-sm`}>
        <h1 className="text-center uppercase font-semibold text-lg text-gray-700 pb-4">Register as Seller</h1>

        { StepCount === 1 &&  <Step_1 Seller={Seller} setSeller={setSeller}/> }
        { StepCount === 2 &&  <Step_2 Seller={Seller} setSeller={setSeller}/> }
        { StepCount === 3 &&  <Step_3 Seller={Seller} setSeller={setSeller}/> }

        {/* error message */}
        <div>
          <p className='w-full text-sm text-gray-500 text-center'>
            { !error ? "All the fields are required!" : error}
          </p>
        </div>

        <div className="flex justify-between w-full gap-1">
          { StepCount > 1 && <button onClick={prevStep} className="bg-gray-200 rounded p-2 flex-1 text-gray-800 cursor-pointer">Previous</button> }

          {StepCount === 3 ? (
  <button type="submit" className="bg-lime-500 rounded p-2 md:w-80 text-white flex-1 cursor-pointer">
    Submit
  </button>
) : (
  <button type="button" onClick={nextStep} className="bg-gray-800 rounded p-2 text-white w-60  cursor-pointer">
    Next
  </button>
)}
        </div>
      </form>
    </div>
   )
  }

export default Register