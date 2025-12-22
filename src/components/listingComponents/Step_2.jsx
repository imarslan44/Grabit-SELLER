import React, { useState } from "react";

const Step_2 = ({variants, setVariants}) => {
  



  // Handle color name
  const handleColorChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };
  // Handle removing a size
const removeSize = (variantIndex, sizeIndex) => {
  const updated = [...variants];
  updated[variantIndex].sizes.splice(sizeIndex, 1);
  setVariants(updated);
};
  // Handle image upload
  const handleImageUpload = (index, slot, file) => {
    const updated = [...variants];
    updated[index].images[slot] = file;
    setVariants(updated);
  };

  
  // Handle size property (price, stock, discount)
  const handleSizeChange = (variantIndex, sizeIndex, field, value) => {
    const updated = [...variants];
    updated[variantIndex].sizes[sizeIndex][field] = value;
    setVariants(updated);
  };

  // Add new size to a variant
  const addSize = (variantIndex, sizeName) => {
    const updated = [...variants];
    updated[variantIndex].sizes.push({
      size: sizeName,
      price: "",
      discount: "",
      stock: ""
    });
    setVariants(updated);
  };

  // Add new color variant
  const addVariant = () => {
    setVariants([...variants, { color: "", images: [], sizes: [] }]);
  };


const removeVarient = (index)=>{
  // remove varient at index
  const updated = [...variants];
  updated.splice(index, 1);
  setVariants(updated);
  
}



  return (

    <div className="p-6 bg-gray-50 ">

      <h2 className="text-2xl font-bold mb-4">Variants</h2>

{/* map on each varient and show inputs fields for each */}
      {variants.map((variant, vIndex) => (
        <div key={vIndex} className="border rounded-lg p-4 pt-8 pr-10 mb-6 bg-white relative">

        { vIndex > 0 && <button onClick={()=>removeVarient(vIndex)} 
        className="absolute right-2 top-2  cursor-pointer"> 
            <abbr title="Delete this color Varient">
              <ion-icon name="close-outline" className="text-black w-6 h-6"></ion-icon>
            </abbr> 
          </button>
        }

          {/* Color */}
      <div className="flex gap-4 mb-4">
        <input
            type="text"
            value={variant.color}
            onChange={(e) => handleColorChange(vIndex, "color", e.target.value)}
            placeholder="Color name."
            className="mb-3 w-1/4 border px-3 py-2 rounded"
          />
        <input
           type="number"
           name="price"
           value={variant.price || ""}
           onChange={(e) => handleColorChange(vIndex, "price", e.target.value)}
           placeholder="Price in Rs."
           className={`w-1/4 mb-3 border px-3 py-2 rounded 
              ${variant.sizes.length > 0 ? "opacity-50 cursor-not-allowed" : ""}`}
  disabled={variant.sizes.length > 0}
/>

<input
  type="number"
  name="stock"
  value={variant.stock || ""}
  onChange={(e) => handleColorChange(vIndex, "stock", e.target.value)}
  placeholder="Stock qty."
  className={`w-1/4 mb-3 border px-3 py-2 rounded 
              ${variant.sizes.length > 0 ? "opacity-50 cursor-not-allowed" : ""}`}
  disabled={variant.sizes.length > 0}
/>

      </div>

          {/* Images */}
          {/* Images */}



<div className="flex gap-4 mb-3">
  {[...Array(4)].map((_, i) => (
    <label
      key={i}
      className="w-24 h-24 border-2 border-dashed rounded-md flex items-center justify-center cursor-pointer bg-gray-50 hover:border-indigo-500 transition"
    >
      {variant.images[i] ? (
        <img
          src={URL.createObjectURL(variant.images[i])}
          alt="preview"
          className="w-full h-full object-cover rounded-md"
        />
      ) : (
        <span className="text-sm text-gray-400">+ Add</span>
      )}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) =>
          handleImageUpload(vIndex, i, e.target.files[0])
        }
      />
    </label>
  ))}
</div>


          {/* Sizes */}
          {/* Sizes */}
<div className="space-y-2  ">
  {variant.sizes.map((size, sIndex) => (
    <div key={sIndex} className=" gap-2 flex items-center">

      <input 
      type="text"
      placeholder="Size"
      value={size.size}
      onChange={(e)=>handleSizeChange(vIndex, sIndex, "size", e.target.value)} className="border px-2 py-1 rounded  w-1/5" />

      <input 
        type="number"
        placeholder="Price"
        value={size.price}
        onChange={(e) =>
          handleSizeChange(vIndex, sIndex, "price", e.target.value)
        }
        className="border px-2 py-1 rounded  w-1/5"
      />
      <input
        type="number"
        placeholder="Stock"
        value={size.stock}
        min ="1"
        onChange={(e) =>
          handleSizeChange(vIndex, sIndex, "stock", e.target.value)
        }
        className="border px-2 py-1 rounded  w-1/5"
      />
      {/* Remove Icon */}
      <button
        type="button"
        onClick={() => removeSize(vIndex, sIndex)}
        className=" font-bold h-8 w-1/6 bg-red-300 hover:bg-red-500 cursor-pointer flex justify-center items-center rounded-xs "
      >
       <ion-icon name="close-outline" className="text-black w-full h-6 hover:text-white"></ion-icon>
      </button>
    </div>
  ))}
  <button
    type="button"
    onClick={() => addSize(vIndex, "S")}
    className="mt-2 px-3 py-1 bg-indigo-600 text-white rounded"
  >
    + Add Size
  </button>
</div>
        </div>
      ))}

      <button
        type="button"
        onClick={addVariant}
        className="px-4 py-2 bg-indigo-600 text-white rounded"
      >
        + Add Another Color Variant
      </button>
    </div>
 
  );
};

export default Step_2;
