import React, { useState } from "react";

const Step_4 = () => {
  // Example: 3 colors × 4 sizes
  const variants = [
    { color: "Red", size: "S" },
    { color: "Red", size: "M" },
    { color: "Red", size: "L" },
    { color: "Red", size: "XL" },
    { color: "Blue", size: "S" },
    { color: "Blue", size: "M" },
    { color: "Blue", size: "L" },
    { color: "Blue", size: "XL" },
    { color: "Green", size: "S" },
    { color: "Green", size: "M" },
    { color: "Green", size: "L" },
    { color: "Green", size: "XL" },
  ];

  const [samePrice, setSamePrice] = useState(false);

  const [pricingData, setPricingData] = useState(
    variants.map((v) => ({
      color: v.color,
      size: v.size,
      price: "",
      discount: "",
      stock: "",
    }))
  );

  const [globalPricing, setGlobalPricing] = useState({
    price: "",
    discount: "",
    stock: "",
  });

  const handleChange = (index, field, value) => {
    const updated = [...pricingData];
    updated[index][field] = value;
    setPricingData(updated);
  };

  const handleGlobalChange = (field, value) => {
    setGlobalPricing({ ...globalPricing, [field]: value });
  };

  const handleSubmit = () => {
    let finalData = pricingData;

    if (samePrice) {
      // apply global values to all variants
      finalData = pricingData.map((item) => ({
        ...item,
        price: globalPricing.price,
        discount: globalPricing.discount,
        stock: globalPricing.stock,
      }));
    }

    const isValid = finalData.every((item) => item.price && item.stock);
    if (!isValid) {
      alert("Please fill price and stock for all variants.");
      return;
    }

    console.log("Final product data:", finalData);
    // proceed to save / publish product
  };

  return (
    <div className="bg-gray-50 min-h-screen p-10">
      <h2 className="text-3xl font-bold text-gray-900 tracking-tight border-b pb-4">
        Step 4: Pricing & Stock
      </h2>

      {/* Same Price Checkbox */}
      <div className="mb-6 flex items-center gap-2">
        <input
          type="checkbox"
          checked={samePrice}
          onChange={(e) => setSamePrice(e.target.checked)}
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
        <label className="text-sm font-semibold text-gray-700 py-2">
           Set same price for all variants
        </label>
      </div>

      {/* Global Inputs if samePrice is true */}
      {samePrice && (
        <div className="border rounded-xl shadow-sm p-6 bg-white space-y-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Global Pricing</h3>
          <div className="grid grid-cols-3 gap-4">
            {/* Price */}
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">
                Price (₹)
              </label>
              <input
                type="number"
                value={globalPricing.price}
                onChange={(e) => handleGlobalChange("price", e.target.value)}
                placeholder="e.g. 999"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Discount */}
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">
                Discount (%)
              </label>
              <input
                type="number"
                value={globalPricing.discount}
                onChange={(e) => handleGlobalChange("discount", e.target.value)}
                placeholder="e.g. 10"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">
                Stock Quantity
              </label>
              <input
                type="number"
                value={globalPricing.stock}
                onChange={(e) => handleGlobalChange("stock", e.target.value)}
                placeholder="e.g. 50"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>
        </div>
      )}

      {/* Variant Inputs if samePrice is false */}
      {!samePrice && (
        <div className="space-y-6 mt-6">
          {pricingData.map((item, index) => (
            <div
              key={index}
              className="border rounded-xl shadow-sm p-6 bg-white space-y-4 hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {item.color} - {item.size}
              </h3>

              <div className="grid grid-cols-3 gap-4">
                {/* Price */}
                <div>
                  <label className="block mb-1 text-sm font-semibold text-gray-700">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) =>
                      handleChange(index, "price", e.target.value)
                    }
                    placeholder="e.g. 999"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                {/* Discount */}
                <div>
                  <label className="block mb-1 text-sm font-semibold text-gray-700">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    value={item.discount}
                    onChange={(e) =>
                      handleChange(index, "discount", e.target.value)
                    }
                    placeholder="e.g. 10"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Stock */}
                <div>
                  <label className="block mb-1 text-sm font-semibold text-gray-700">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={item.stock}
                    onChange={(e) =>
                      handleChange(index, "stock", e.target.value)
                    }
                    placeholder="e.g. 50"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Final Action Buttons */}
      <div className="w-full flex gap-4 mt-8">
        <button
          onClick={handleSubmit}
          className="w-full py-3 text-md bg-emerald-600 hover:bg-emerald-700 rounded-md text-white font-semibold tracking-wide transition"
        >
          Publish Product
        </button>
      </div>
    </div>
  );
};

export default Step_4;
