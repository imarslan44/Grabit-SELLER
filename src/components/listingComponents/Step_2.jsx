import React, { useState } from "react";

const Step_2 = () => {
  const [colors, setColors] = useState([{ name: "", images: [] }]);
  const [sizesEnabled, setSizesEnabled] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const handleColorChange = (index, value) => {
    const updatedColors = [...colors];
    updatedColors[index].name = value;
    setColors(updatedColors);
  };

  const handleImageUpload = (index, slot, file) => {
    const updatedColors = [...colors];
    updatedColors[index].images[slot] = file;
    setColors(updatedColors);
  };

  const addColorOption = () => {
    setColors([...colors, { name: "", images: [] }]);
  };

  const removeColorOption = (index) => {
    const updatedColors = [...colors];
    updatedColors.splice(index, 1);
    setColors(updatedColors.length ? updatedColors : [{ name: "", images: [] }]);
  };

  const toggleSize = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const handleSubmit = () => {
    const isValid = colors.every((c) => c.images.filter(Boolean).length >= 2);
    if (!isValid) {
      alert("Please upload at least 2 images for each color.");
      return;
    }
    console.log("Submitted colors:", colors);
    console.log("Sizes enabled:", sizesEnabled);
    console.log("Selected sizes:", selectedSizes);
    // proceed to next step
  };

  return (
    <div className="bg-gray-50 min-h-screen p-10">
      <h2 className="text-3xl font-bold text-gray-900 tracking-tight border-b pb-4">
        Step 2: Variants & Colors
      </h2>

      {/* Sizes Section */}
      <div className="bg-white border rounded-xl shadow-sm p-6 mb-8">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <input
            type="checkbox"
            checked={sizesEnabled}
            onChange={(e) => setSizesEnabled(e.target.checked)}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          Sizes available for this product?
        </label>

        <div className="flex gap-3 mt-4">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <label
              key={size}
              className={`px-3 py-1 border rounded-md text-sm font-medium cursor-pointer transition ${
                selectedSizes.includes(size)
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-gray-100 text-gray-600 border-gray-300"
              } ${!sizesEnabled ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <input
                type="checkbox"
                value={size}
                checked={selectedSizes.includes(size)}
                onChange={() => toggleSize(size)}
                disabled={!sizesEnabled}
                className="hidden"
              />
              {size}
            </label>
          ))}
        </div>
      </div>

      {/* Colors Section */}
      <div className="space-y-8 mt-6">
        {colors.map((color, index) => (
          <div
            key={index}
            className="relative border rounded-xl shadow-sm p-6 space-y-6 bg-white hover:shadow-md transition"
          >
            {/* Delete Icon */}
            {colors.length > 1 && (
              <button
                type="button"
                onClick={() => removeColorOption(index)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
              >
                ✕
              </button>
            )}

            {/* Color Name */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Color Name
              </label>
              <input
                type="text"
                value={color.name}
                onChange={(e) => handleColorChange(index, e.target.value)}
                placeholder="e.g. Red, Black, Blue"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-400"
                required
              />
            </div>

            {/* Image Upload Skeletons (smaller size) */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Upload Images (min 2, max 4)
              </label>
              <div className="grid grid-cols-4 gap-3">
                {[...Array(4)].map((_, i) => (
                  <label
                    key={i}
                    className={`w-24 h-24 border-2 border-dashed rounded-md flex items-center justify-center cursor-pointer bg-gray-50 hover:border-indigo-500 transition ${
                      i < 2 && !color.images[i] ? "border-red-400" : ""
                    }`}
                  >
                    {color.images[i] ? (
                      <img
                        src={URL.createObjectURL(color.images[i])}
                        alt="preview"
                        className="w-full h-full object-cover rounded-md"
                      />
                    ) : (
                      <span
                        className={`text-xs ${
                          i < 2 ? "text-red-400 font-semibold" : "text-gray-400"
                        }`}
                      >
                        {i < 2 ? "Required" : "+ Add"}
                      </span>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      required={i < 2}
                      onChange={(e) =>
                        handleImageUpload(index, i, e.target.files[0])
                      }
                    />
                  </label>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Each color must have at least 2 images (front & back). You can upload up to 4.
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="w-full flex gap-4 mt-8">
        <button
          onClick={handleSubmit}
          className="w-full py-3 text-md bg-emerald-600 hover:bg-emerald-700 rounded-md text-white font-semibold tracking-wide transition"
        >
          Next
        </button>
        <button
          type="button"
          onClick={addColorOption}
          className="w-full py-3 text-md bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-semibold tracking-wide transition"
        >
          + Add Another Color
        </button>
      </div>
    </div>
  );
};

export default Step_2;



