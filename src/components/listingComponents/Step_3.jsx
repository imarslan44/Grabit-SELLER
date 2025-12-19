import React, { useState } from "react";

const Step_3 = () => {
  const [dimensions, setDimensions] = useState({
    length: "",
    width: "",
    height: "",
    dimUnit: "cm", // shared unit for length/width/height
    weight: "",
    weightUnit: "g",
  });

  const [specs, setSpecs] = useState(["", "", ""]);
  const [activeCount, setActiveCount] = useState(1);

  // Helper: check if string has at least 2 words
  const hasTwoWords = (str) => str.trim().split(/\s+/).length >= 2;

  const handleDimensionChange = (field, value) => {
    setDimensions({ ...dimensions, [field]: value });
  };

  const handleSpecChange = (index, value) => {
    const updatedSpecs = [...specs];
    updatedSpecs[index] = value;
    setSpecs(updatedSpecs);

    if (index < specs.length - 1 && hasTwoWords(value)) {
      setActiveCount(Math.max(activeCount, index + 2));
    }
  };

  const addSpec = () => {
    const allFilled = specs.slice(0, activeCount).every((s) => hasTwoWords(s));
    if (!allFilled) {
      alert("Fill the available inputs first.");
      return;
    }
    setSpecs([...specs, ""]);
    setActiveCount(activeCount + 1);
  };

  const handleSubmit = () => {
    const isValid = specs.slice(0, activeCount).every((s) => hasTwoWords(s));
    if (!isValid) {
      alert("Please provide at least 2 words in each active specification.");
      return;
    }
    console.log("Submitted dimensions:", dimensions);
    console.log("Submitted specifications:", specs.slice(0, activeCount));
    // proceed to next step
  };

  return (
    <div className="bg-gray-50 min-h-screen p-10">
      <h2 className="text-3xl font-bold text-gray-900 tracking-tight border-b pb-4">
        Step 3: Specifications / Highlights
      </h2>

      {/* Dimensional Properties */}
      <div className="grid grid-cols-4 gap-4 mt-6 items-end">
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Length
          </label>
          <input
            type="number"
            value={dimensions.length}
            onChange={(e) => handleDimensionChange("length", e.target.value)}
            placeholder="e.g. 20"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Width
          </label>
          <input
            type="number"
            value={dimensions.width}
            onChange={(e) => handleDimensionChange("width", e.target.value)}
            placeholder="e.g. 10"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Height
          </label>
          <input
            type="number"
            value={dimensions.height}
            onChange={(e) => handleDimensionChange("height", e.target.value)}
            placeholder="e.g. 5"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Unit
          </label>
          <select
            value={dimensions.dimUnit}
            onChange={(e) => handleDimensionChange("dimUnit", e.target.value)}
            className="w-full px-2 py-2 border rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="cm">cm</option>
            <option value="inch">inch</option>
          </select>
        </div>
      </div>

      {/* Weight */}
      <div className="grid grid-cols-2 gap-4 mt-6 items-end">
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Weight
          </label>
          <input
            type="number"
            value={dimensions.weight}
            onChange={(e) => handleDimensionChange("weight", e.target.value)}
            placeholder="e.g. 500"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Unit
          </label>
          <select
            value={dimensions.weightUnit}
            onChange={(e) => handleDimensionChange("weightUnit", e.target.value)}
            className="w-full px-2 py-2 border rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="g">g</option>
            <option value="kg">kg</option>
          </select>
        </div>
      </div>

      {/* Specifications Section */}
      <div className="space-y-4 mt-8">
        {specs.map((spec, index) => (
          <div key={index} className="flex items-center gap-3">
            <input
              type="text"
              value={spec}
              onChange={(e) => handleSpecChange(index, e.target.value)}
              placeholder={
                index === 0
                  ? "e.g. 100% Cotton, 6GB RAM"
                  : "Add another specification"
              }
              className={`flex-1 px-3 py-2 border rounded-md focus:outline-none ${
                index < activeCount
                  ? "bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
              disabled={index >= activeCount}
              required={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Add Another Button */}
      <button
        type="button"
        onClick={addSpec}
        className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium transition"
      >
        + Add Another
      </button>

      {/* Next Button */}
      <div className="w-full flex gap-4 mt-8">
        <button
          onClick={handleSubmit}
          className="w-full py-3 text-md bg-emerald-600 hover:bg-emerald-700 rounded-md text-white font-semibold tracking-wide transition">
          Next
        </button>
      </div>
    </div>
  );
};

export default Step_3;

