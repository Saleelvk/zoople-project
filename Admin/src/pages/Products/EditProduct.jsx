import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate

function EditProduct() {
  const { productId } = useParams();
  const navigate = useNavigate(); // Initialize navigate
  const [images, setImages] = useState([]);
  const [colors, setColors] = useState([]);
  const [newColor, setNewColor] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");

  // Fetch product details when the component mounts
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/v1/product/products/${productId}`
        );
        const product = response.data;

        // Set state with fetched data
        setProductName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setStock(product.stock);
        setCategory(product.category);
        setColors(product.colors); // Assuming colors are already an array
        setImages(product.images); // Assuming it's an array of URLs
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  // Handle image deletion
  const handleDeleteImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // Handle color addition
  const handleAddColor = () => {
    if (newColor.trim()) {
      setColors([...colors, newColor.trim()]);
      setNewColor("");
    }
  };

  // Handle color deletion
  const handleDeleteColor = (index) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const files = event.target.files;
    const newImages = Array.from(files).map((file) => ({
      src: URL.createObjectURL(file),
      file: file,
    }));
    setImages([...images, ...newImages]);
  };

  // Save changes
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      // Prepare form data to send to the server
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("stock", stock);
      formData.append("colors", JSON.stringify(colors));

      // Append existing images (assuming they are URLs)
      for (const image of images) {
        if (typeof image.src !== "undefined") {
          formData.append("existingImages", image.src); // For existing images
        }
      }

      // Append new images
      for (const image of images) {
        if (image.file) {
          formData.append("images", image.file);
        }
      }

      // Log formData to check contents
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      // Send the PUT request to update the product with the correct product ID
   
        const token = localStorage.getItem('token'); // Retrieve the token from local storage

        const response = await axios.put(
            `http://localhost:3001/api/v1/product/editproduct/${productId}`, // Correct usage of productId
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data", // Set the content type for form data
                    "Authorization": `Bearer ${token}`, // Include the token in the request header
                },
            }
        );
  

      // Log the successful response
      const { message, product } = response.data;
      console.log("Product updated successfully:", message);
      console.log("Updated product details:", product);
    } catch (error) {
      console.error("Error updating product:", error.response || error.message);
    }
  };

  // Handle product deletion
  const handleDeleteProduct = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
        await axios.delete(`http://localhost:3001/api/v1/product/deleteProduct/${productId}`);
        console.log("Product deleted successfully");
        navigate("/products"); // Change this to your desired route after deletion
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            console.error("Error deleting product:", error.response.data);
            console.error("Status code:", error.response.status);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("No response received:", error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Error setting up request:", error.message);
        }
    }
};


  return (
    <div className="lg:ml-72 pt-8 pb-5 px-5">
      <div className="px-10 py-5 font-poppins">
        <h1 className="text-2xl font-bold">Edit Product</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-6">
          {/* Left Section for Images */}
          <div>
            <div className="grid grid-cols-2 gap-5">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image.src || image}
                    alt={`product-${index}`}
                    className="rounded-lg w-40 h-40"
                  />
                  <button
                    onClick={() => handleDeleteImage(index)}
                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
                  >
                    <i className="fa fa-trash" />
                  </button>
                </div>
              ))}
            </div>
            {/* Upload Image Section */}
            <div className="flex justify-center mt-5">
              <label className="bg-gray-200 p-3 rounded-lg cursor-pointer">
                <i className="fa fa-upload text-2xl" />
                <input
                  type="file"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Right Section for Product Details */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Product Name</h2>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="border-b-2 w-full text-xl font-bold p-1 mb-4"
            />

            <p className="text-gray-500 mb-4">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded"
                rows={4}
              />
            </p>

            {/* Price Input */}
            <div className="flex items-center mb-4">
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border-b-2 w-full text-xl font-bold p-1"
                placeholder="Price"
              />
            </div>

            {/* Colors Section */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Choose Colors</h3>
              {colors.map((color, index) => (
                <div key={index} className="flex items-center justify-between mb-2">
                  <span>{color}</span>
                  <button
                    onClick={() => handleDeleteColor(index)}
                    className="text-red-600"
                  >
                    <i className="fa fa-trash" />
                  </button>
                </div>
              ))}
              {/* Add New Color */}
              <div className="flex items-center">
                <input
                  type="text"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  placeholder="Add Color"
                  className="border-b-2 flex-grow p-1"
                />
                <button onClick={handleAddColor} className="text-blue-600 ml-2">
                  + Add Color
                </button>
              </div>
            </div>

            {/* Stock and Category */}
            <div className="flex gap-6 mb-6">
              <div className="flex-grow">
                <label className="block text-sm font-semibold">Stock</label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="border-b-2 w-full p-1"
                  placeholder="Stock"
                />
              </div>
              <div className="flex-grow">
                <label className="block text-sm font-semibold">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="border-b-2 w-full p-1"
                >
                  <option value="">select category</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Phone">Phone</option>
                  <option value="Watch">Watch</option>
                  <option value="Headphone">Headphone</option>
                </select>
              </div>
            </div>

            {/* Buttons for Save and Delete */}
            <div className="flex gap-4">
              <button
                onClick={handleSaveChanges}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
              <button
                onClick={handleDeleteProduct}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
