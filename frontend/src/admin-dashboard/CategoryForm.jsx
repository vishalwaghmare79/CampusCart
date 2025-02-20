import React from "react";

function CategoryForm({ handleSubmit, value, setValue, buttonName, setImage }) {
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      {/* Category Name Input */}
      <input
        type="text"
        id="categoryName"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        placeholder="Enter Category Name"
        required
      />

      {/* Image Upload */}
      <input
        type="file"
        id="image"
        name="image"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="w-full p-2 border border-gray-300 rounded-lg cursor-pointer"
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold transition duration-300"
      >
        {buttonName}
      </button>
    </form>
  );
}

export default CategoryForm;
