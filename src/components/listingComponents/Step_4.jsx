import React from "react";

const Step_4 = ({ metadetails, setMetaDetails, handleNext, handleBack}) => {


  const handleChange = (field, value) => {
    setMetaDetails({ ...metadetails, [field]: value });
  };

  return (
    <form onSubmit={handleNext} className="p-6 bg-gray-50 rounded-md ">
      <h2 className="text-2xl font-bold mb-4">Step 4: Meta Details</h2>

      {/* Brand */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Brand Name</label>
        <input
          type="text"
          value={metadetails.brand}
          onChange={(e) => handleChange("brand", e.target.value)}
          placeholder="Enter brand name"
          className="w-full border px-3 py-2 rounded"
          required
          
        />
      </div>

      {/* Discount */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Discount (%)</label>
        <input
          type="number"
          value={metadetails.discount || ""}
          onChange={(e) => handleChange("discount", e.target.value)}
          placeholder="Enter discount percentage"
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      {/* Model */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Model / Product Name</label>
        <input
          type="text"
          value={metadetails.model}
          onChange={(e) => handleChange("model", e.target.value)}
          placeholder="Enter exact model/product name"
          className="w-full border px-3 py-2 rounded"
          
        />
      </div>

      {/* Warranty */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Warranty</label>
        <select
          value={metadetails.warranty}
          onChange={(e) => handleChange("warranty", e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Select warranty</option>
          <option value="6 months">6 Months</option>
          <option value="12 months">12 Months</option>
          <option value="24 months">24 Months</option>
          <option value="1 year">1 Year</option>
          <option value="2 years">2 Years</option>
        </select>
      </div>

      <div className="flex py-1 px-6 gap-2">
        <button type="button" onClick={handleBack} className="w-full  p-2 text-md  rounded-sm text-black bg-white font mt-2 mb-2 flex justify-center items-center cursor-pointer shadow-xs border border-white hover:border-gray-200">
          <ion-icon name="arrow-back-outline"></ion-icon> Back
        </button>
          
        <button type="submit"  className="w-full  p-2 text-md bg-black rounded-sm text-white mt-2 mb-2 flex justify-center items-center cursor-pointer">
              Next <ion-icon name="arrow-forward-outline"></ion-icon>
        </button> 
      </div>

    </form>
  );
};

export default Step_4;
