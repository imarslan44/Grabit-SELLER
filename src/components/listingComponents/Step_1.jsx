import React from 'react'


const Step_1 = ({ basicInfo, setBasicInfo }) => {


  const handleChange = (e) =>{

    const {name, value} = e.target;

    setBasicInfo({...basicInfo, [name]: value});


  }


  return (
    <div className=" flex-2  bg-white p-8 w-full  space-y-2 ">
      <h2 className="text-xl font-semibold text-gray-800">Step 1: Basic Info</h2>

      {/* Product Title */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Product Title
        </label>
        <input
          type="text"
          name="title"
          value={basicInfo.title || ""}
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
          value={basicInfo.description || ""}
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
          name="category"
          value={basicInfo.category || ""}
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
          value={basicInfo.subcategory || ""}
          onChange={handleChange}
          placeholder="Enter the subcategory this item belongs"
          className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:ring focus:ring-gray-700"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Remember both categories impact on search engigne. So enter wisely and avoid spelling mistakes 
        </p>

       
      </div>
    </div>
  );
};

export default Step_1;
