import React, { useState } from 'react';
import Step_1 from  '../components/registerComponents/Step_1.jsx';
// const sellerSchema = new mongoose.Schema({
   
//   name: {type: String, required: true},
//   storeName: {type: String, required: true},
//   email: {type: String, required: true, unique: true},
//   password: {type: String, required: true, select: false, minLength: 8}, 
//   phone: {type: String, required: true, unique: true},
//   address: {type: String, required: true},
//   verified: {type: Boolean, default: false},
//   PAN: {type: String, required: true, unique: true},
//   AccountNumber: {type: String, required: true, unique: true},
//   IFSC: {type: String, required: true},

// },{timestamps: true});

const Register = () => {
    const [Seller, setSeller] = useState({
    name: "",
    storeName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    PAN: "",
    AccountNumber: "",
    IFSC: "",
    })

  return (
<div className="w-full flex flex-col items-center justify-center mt-10">
    <form className="flex flex-col bg-white p-8 w-1/3 space-y-4 border border-gray-300 rounded-md shadow-md">
    <h1 className="text-center uppercase font-semibold text-lg text-gray-700 pb-4">Register as Seller</h1>
        <Step_1 Seller={Seller} setSeller={setSeller}/>
        <button className="bg-gray-800 rounded p-2 text-white cursor-pointer">Next</button>
    </form>
</div>
  )
}

export default Register