import React, { useState } from 'react';
import "./register.css";
import Step_1 from  '../components/registerComponents/Step_1.jsx';
import Step_2 from  '../components/registerComponents/Step_2.jsx';
import Step_3 from  '../components/registerComponents/Step_3.jsx';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SET_TOKEN } from '../context/seller.slice.js';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets.js';
// Simple loading spinner component
const Loading = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-50 bg-opacity-30 z-50">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4  border-main"></div>
  </div>
);

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
    const [error, seterror] = useState("") ;
       const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
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
          setLoading(true);
          seterror("");

        const res = await fetch("http://localhost:5000/api/seller/sign-up", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"},
           credentials: "include",
          body: JSON.stringify(Seller),
        })

        const data = await res.json();
        

        if(data.success){
          localStorage.setItem("sellerToken", data.token);
          dispatch(SET_TOKEN(data.token));
          setLoading(false);
          setShowSuccess(true);
          // Show popup for 1 second then navigate to seller dashboard (main products page)
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }else{
          seterror(data.message || "Registration failed. Please try again.");
          setLoading(false);
        }

      }catch(err){
        console.log("Error during seller registration:", err);
        seterror("An error occurred. Please try again.");
        setLoading(false);
      }
    }



  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row items-stretch justify-center bg-white p-5 md:p-10">
       <div className="w-40 sm:w-60 h-20 sm:h-28 top-10 left-3  md:m-6 p-2 absolute">
             <img src={assets.logo} alt="Logo" className="w-full h-full object-cover"/>
          </div>
      {/* Left Side: Professional Text */}
      <div className="hidden md:flex flex-col justify-center items-start  px-10 w-1/2 border-r border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to <span className='text-main font-extrabold '>BARKET</span> Seller Portal</h2>
        <ul className="space-y-3 text-lg text-gray-600">
          <li>✔️ Simple and transparent registration process</li>
          <li>✔️ Manage your products and orders in one place</li>
          <li>✔️ Access to helpful seller resources and support</li>
          <li>✔️ Secure platform for your business growth</li>
          <li>✔️ Flexible payment options for your convenience</li>
        </ul>
        <p className="mt-8 text-base text-gray-500">Start selling online with Grabit and manage your store with confidence. Our team is here to help you at every step.</p>
      </div>
      {/* Right Side: Registration Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-3">
        <form id="register" onSubmit={handleSubmit} className={`register-form ${StepCount == 2 ? 'max' : 'min'} flex flex-col bg-white p-4 md:p-8 max-sm:w-full space-y-4 border border-gray-200 rounded-xs shadow-sm`}>
          <h1 className="text-center uppercase font-semibold text-lg text-gray-700 pb-4">Register as Seller</h1>
          { StepCount === 1 &&  <Step_1 Seller={Seller} setSeller={setSeller}/> }
          { StepCount === 2 &&  <Step_2 Seller={Seller} setSeller={setSeller}/> }
          { StepCount === 3 &&  <Step_3 Seller={Seller} setSeller={setSeller}/> }
          {/* error message */}
          <div>
            <p className={`w-full text-sm  text-center ${error ? "text-red-500" : "text-gray-500"}`}>
              { !error ? "All the fields are required!" : error}
            </p>
          </div>
          <div className="flex justify-between w-full gap-1">
            { StepCount > 1 && <button onClick={prevStep} className="bg-gray-200 rounded p-2 flex-1 text-gray-800 cursor-pointer">Previous</button> }
            {StepCount === 3 ? (
              <button type="submit" disabled={loading} className={`rounded p-2 md:w-80 text-white flex-1 ${loading ? 'bg-lime-400 opacity-50 cursor-not-allowed' : 'bg-lime-500 cursor-pointer'}`}>
                {loading ? "Submitting..." : "Submit"}
              </button>
            ) : (
              <button type="button" onClick={nextStep} className="bg-gray-800 rounded p-2 text-white w-full  cursor-pointer">
                Next
              </button>
            )}
          </div>
          <Link to="/login" className="w-full text-center text-gray-500 h-6">Already registered? <span className="text-gray-800 hover:underline">Login</span></Link>
        </form>
        {loading && <Loading />}
      </div>

      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100/10 backdrop-blur-2xl bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 text-center ">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
            <p className="text-gray-600">Welcome to Grabit. Redirecting to your store...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Register