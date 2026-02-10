import React from "react";

const Step_3 = ({attributes, setAttributes, activeCount, setActiveCount, handleNext, handleBack}) => {

   const {dimensions, specs} = attributes;
   

  

  // Helper: check if string has at least 2 words // changed to 1 name is still same
  const hasTwoWords = (str) => str.trim().split(/\s+/).length >= 1;
 
  
  const handleDimensionChange = (field, value) => {
    const updatedDimensions = {...dimensions};
    updatedDimensions[field] = value

    setAttributes((prev)=>{ 
      return {...prev, dimensions: updatedDimensions}
     });
  };

  const handleSpecChange = (index, value) => {
    const updatedSpecs = [...specs];
    updatedSpecs[index] = value;
    setAttributes((prev)=>{
      return {...prev, specs: updatedSpecs}
    });

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
    const updatedSpecs = [...specs, ""]

    setAttributes((prev)=>{
      return {...prev, specs : updatedSpecs}
    })
    setActiveCount(activeCount + 1);
  };

const removeSpec = (index) => {
  const updatedSpecs = [...specs];
  updatedSpecs.splice(index, 1);

   setAttributes((prev)=>{
      return {...prev, specs: updatedSpecs}
    });
}



  return (
    <form onSubmit={handleNext} className="bg-gray-50  px-8 ">
      <h2 className="text-2xl font-semibold text-gray-900 tracking-tight border-b pb-4">
       Specifications. 
      </h2>

      {/* Dimensional Properties */}
      <div className="grid grid-cols-4 gap-4 mt-6 items-end">
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Length
          </label>
          <input
            type="number"
            value={attributes.dimensions.length}
            onChange={(e) => handleDimensionChange("length", e.target.value)}
            placeholder="e.g. 20"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Width
          </label>
          <input
            type="number"
            value={attributes.dimensions.width}
            onChange={(e) => handleDimensionChange("width", e.target.value)}
            placeholder="e.g. 10"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Height
          </label>
          <input
            type="number"
            value={attributes.dimensions.height}
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
            value={attributes.dimensions.dimUnit}
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
            value={attributes.dimensions.weight}
            onChange={(e) => handleDimensionChange("weight", e.target.value)}
            placeholder="e.g. 500"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Unit
          </label>
          <select
            value={attributes.dimensions.weightUnit}
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
        {attributes.specs.map((spec, index) => (
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
            {index > 0 && <button onClick={()=>removeSpec(index)}>
            <ion-icon name="close-outline" className="text-black w-6 h-6 p-2 bg-white rounded-sm"></ion-icon>
            </button>}

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
      <div className="flex py-1  gap-2">
        <button type="button" onClick={handleBack} className="w-full  p-2 text-md  rounded-sm text-black bg-white font mt-2 mb-2 flex justify-center items-center cursor-pointer shadow-xs border border-white hover:border-gray-200"><ion-icon name="arrow-back-outline"></ion-icon> Back
        </button> 
          
        <button type="submit"  className="w-full  p-2 text-md bg-black rounded-sm text-white mt-2 mb-2 flex justify-center items-center cursor-pointer">
              Next <ion-icon name="arrow-forward-outline"></ion-icon>
        </button> 
      </div>
      
    </form>
  );
};

export default Step_3;

