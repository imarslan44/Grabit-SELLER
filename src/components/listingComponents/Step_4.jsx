import React from "react";

const Step_4 = ({ metadetails, setMetaDetails }) => {


  const handleChange = (field, value) => {
    setMetaDetails({ ...metadetails, [field]: value });
  };

  return (
    <div className="p-6 bg-gray-50 rounded-md ">
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
    </div>
  );
};

export default Step_4;
