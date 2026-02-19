import React, { useState } from "react";

const Step_5 = ({ deliveryDetails, setDeliveryDetails, handleSubmit, handleBack }) => {
  const [pincodeInput, setPincodeInput] = useState("");

  const handleChange = (field, value) => {
    setDeliveryDetails({ ...deliveryDetails, [field]: value });
  };

  const addPincode = () => {
    if (pincodeInput && !deliveryDetails.deliveryAreas.includes(pincodeInput)) {
      setDeliveryDetails({
        ...deliveryDetails,
        deliveryAreas: [...deliveryDetails.deliveryAreas, pincodeInput],
      });
      setPincodeInput("");
    }
  };

  const removePincode = (index) => {
    const updated = [...deliveryDetails.deliveryAreas];
    updated.splice(index, 1);
    setDeliveryDetails({ ...deliveryDetails, deliveryAreas: updated });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-gray-50 rounded-md h-screen">
      <h2 className="text-2xl font-bold mb-4">Delivery Details</h2>

      {/* COD */}
      <div className="mb-4 flex items-center  justify-start gap-2 bg-gray-200 rounded-sm ">
        <label className="font-medium  p-3 rounded-xs  w-1/3 text-nowrap flex gap-2.5">Cash on Delivery (COD)
            <input
          type="checkbox"
          checked={deliveryDetails.COD}
          onChange={(e) => handleChange("COD", e.target.checked)}
        />
        </label>
      
      </div>

      {/* Return Policy */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Return Policy (days)</label>
        <input
          type="number"
          value={deliveryDetails.returnPolicy}
          onChange={(e) => handleChange("returnPolicy", e.target.value)}
          placeholder="Enter return policy in days"
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      {/* Shipping Time */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Shipping Time (days)</label>
        <input
          type="number"
          value={deliveryDetails.shippingTime}
          onChange={(e) => handleChange("shippingTime", e.target.value)}
          placeholder="Enter shipping time in days"
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      {/* Delivery Areas */}
      <div className="mb-4 max-h-45 ">
        <label className="block mb-2 font-medium">Delivery Areas (Pincodes)</label>
        <div className="flex gap-2 mb-2 ">
          <input
            type="text"
            value={pincodeInput}
            onChange={(e) => setPincodeInput(e.target.value)}
            placeholder="Enter pincode"
            className="border px-3 py-2 rounded flex-1"
            required={deliveryDetails.deliveryAreas.length === 0}
          />
          <button
            type="button"
            onClick={addPincode}
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            + Add
          </button>
        </div>
        <ul className="space-y-1 max-h-30  overflow-auto">
          {
            deliveryDetails.deliveryAreas.length === 0 &&  (
              <p>No pincode added Yet!</p>
            )
          }

          {deliveryDetails.deliveryAreas.map((pincode, index) => (
            <li
              key={index}
              className="flex justify-between items-center border px-2 py-1 rounded"
            >
              <span>{pincode}</span>
              <button
                type="button"
                onClick={() => removePincode(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </li>
          ))}

        
        </ul>
      </div>
        <div className="flex py-1  gap-2">
        <button type="button" onClick={handleBack} className="w-full  p-2 text-md  rounded-sm text-black bg-white font mt-2 mb-2 flex justify-center items-center cursor-pointer shadow-xs border border-white hover:border-gray-200"><ion-icon name="arrow-back-outline"></ion-icon> Back
        </button>
          
        <button type="submit"  className="w-full  p-2 text-md bg-black rounded-sm text-white mt-2 mb-2 flex justify-center items-center cursor-pointer">
              Publish <ion-icon name="arrow-up-outline"></ion-icon>
        </button> 
      </div>
    </form>
  );
};

export default Step_5;
