import React from 'react'


const Step_1 = ({ newProduct, handleChange }) => {
  return (
    <div className=" flex-2  bg-white p-8 w-full h-full space-y-4 ">
      <h2 className="text-xl font-semibold text-gray-800">Step 1: Basic Info</h2>

      {/* Product Title */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Product Title
        </label>
        <input
          type="text"
          name="name"
          value={newProduct.name || ""}
          onChange={handleChange}
          placeholder="Enter product title"
          className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:ring focus:ring-gray-700"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={newProduct.description || ""}
          onChange={handleChange}
          placeholder="Write product description"
          rows={4}
          className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:ring focus:ring-gray-700"
          required
        />
      </div>

      {/* Brand */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Category
        </label>
        <input
          type="text"
          name="brand"
          value={newProduct.brand || ""}
          onChange={handleChange}
          placeholder="Enter the category this item belongs"
          className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:ring focus:ring-gray-700"
        />
      </div>

      {/* Vendor Store (Text Input instead of Select) */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Subcaegory
        </label>
        <input
          type="text"
          name="subcategory"
          value={newProduct.vendorStore || ""}
          onChange={handleChange}
          placeholder="Enter the subcategory this item belongs"
          className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:ring focus:ring-gray-700"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Remember both categories impact on search engigne. So enter wisely and avoid spelling mistakes 
        </p>

        <button className="w-full  p-2 text-md bg-black rounded-sm text-white mt-2 mb-2">
          Next
        </button>
      </div>
    </div>
  );
};

export default Step_1;
