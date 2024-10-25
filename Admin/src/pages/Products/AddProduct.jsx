import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import axios from "axios";

function AddProduct() {
  const [productImage, setProductImage] = useState(null);
  const [productTitle, setProductTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Laptop");
  const [colors, setColors] = useState([]);
  const [stock, setStock] = useState("");
  const [colorInput, setColorInput] = useState("");

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file); // Store the file directly
    }
  };

  // Handle Color Addition
  const handleAddColor = () => {
    if (colorInput.trim()) {
      setColors((prevColors) => [...prevColors, colorInput.trim()]);
      setColorInput("");
    }
  };

  // Handle Product Submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const formData = new FormData();
    
    // Append product image if exists
    if (productImage) {
      formData.append("images", productImage); // Append the image directly
    }

    // Append other product details
    formData.append("name", productTitle);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("stock", stock);
    formData.append("colors", JSON.stringify(colors)); // Store colors as a JSON string

    // Make the API call
    try {
      const response = await axios.post(
        "https://e-commerce-gclo.onrender.com/api/v1/product/addProduct/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Product added:", response.data);
      // Optionally reset the form or show a success message
      resetForm();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Reset form fields after successful submission
  const resetForm = () => {
    setProductImage(null);
    setProductTitle("");
    setDescription("");
    setPrice("");
    setCategory("Laptop");
    setColors([]);
    setStock("");
    setColorInput("");
  };

  return (
    <div className="bg-gray-100">
      <div className="lg:ml-72 pt-8 pb-5 px-5 bg-gray-100">
        <div className="p-7 bg-gray-100 min-h-screen">
          <h1 className="text-2xl font-bold mb-6 font-poppins">Add Product</h1>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit}>
              <div className="flex">
                {/* Image Upload Section */}
                <div className="w-1/4 flex justify-center">
                  {productImage ? (
                    <img
                      src={URL.createObjectURL(productImage)}
                      alt="Uploaded"
                      className="w-24 h-24 object-cover rounded"
                    />
                  ) : (
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*" // Optional: Limit file types to images
                        onChange={handleImageUpload}
                      />
                      <FaUpload className="w-40 h-52" />
                     
                    </label>
                  )}
                </div>

                {/* Form Inputs */}
                <div className="w-3/4 ml-8">
                  <div className="mb-4 font-poppins">
                    <input
                      type="text"
                      className="w-full border-b-2 outline-none text-lg"
                      placeholder="Add Product Title"
                      value={productTitle}
                      onChange={(e) => setProductTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4 font-poppins">
                    <input
                      type="text"
                      className="w-full border-b-2 outline-none"
                      placeholder="Add description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Price */}
                    <div className="mb-4 font-poppins">
                      <label className="font-semibold mb-2 block">+ Add Price</label>
                      <input
                        type="number"
                        className="w-full border-b-2 outline-none"
                        placeholder="Add Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                    </div>

                    {/* Category */}
                    <div className="mb-4 font-poppins">
                      <label className="font-semibold mb-2 block">+ Add Category</label>
                      <select
                        className="w-full border-b-2 outline-none"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="Laptop">Laptop</option>
                        <option value="Phone">Phone</option>
                        <option value="Gadget">Gadget</option>
                        <option value="I pad">I pad</option>
                        {/* Add more options as needed */}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 font-poppins">
                    {/* Colors */}
                    <div className="mb-4">
                      <label className="font-semibold mb-2 block">Add Colors</label>
                      <input
                        type="text"
                        className="w-full border-b-2 outline-none"
                        placeholder="Enter color and press Enter"
                        value={colorInput}
                        onChange={(e) => setColorInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleAddColor();
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleAddColor}
                        className="mt-2 bg-black text-white px-4 py-2 rounded-md"
                      >
                        Add Color
                      </button>
                      <div className="flex space-x-2 mt-2">
                        {colors.map((color, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-200 rounded-md text-sm">
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Stock */}
                    <div className="mb-4">
                      <label className="font-semibold mb-2 block">Add Stock</label>
                      <input
                        type="number"
                        className="w-full border-b-2 outline-none"
                        placeholder="Enter stock quantity"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit" // Ensure type is "submit" for form submission
                    className="bg-black font-poppins text-white px-4 py-2 rounded-md mt-4"
                  >
                    Add Product
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
