import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ProductStock() {
  const [products, setProducts] = useState([]); // State to store products
  const [loading, setLoading] = useState(false); // State for loading
  const [error, setError] = useState(null); // State for errors
  const navigate = useNavigate(); // For navigating to edit page

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Start loading

      try {
        const response = await fetch("http://localhost:3001/api/v1/product/products");

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`);
        }

        const data = await response.json();
        setProducts(data.products || []); // Store the fetched products
      } catch (error) {
        setError(`Error fetching products: ${error.message}`);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProducts(); // Call the function
  }, []);

  // Handle product deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/product/deleteProduct/${id}`, {
          method: "DELETE",
          credentials: "include", // Include credentials if needed
        });

        if (!response.ok) {
          throw new Error(`Failed to delete product: ${response.statusText}`);
        }

        // Update the state to remove the deleted product
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
        alert("Product deleted successfully!"); // Optional: Show success message
      } catch (error) {
        setError(`Error deleting product: ${error.message}`);
      }
    }
  };

  return (
    <div className="md:ml-72 pt-8 pb-5">
      <div className="bg-white mt-10 mr-5">
        <p className="p-2 font-poppins text-xl ml-8 font-semibold">Product Stock</p>

        {/* Display loading or error state */}
        {loading && <div className="text-center mt-10">Loading...</div>}
        {error && <div className="text-center mt-10 text-red-500">{error}</div>}

        <div className="mb-10">
          {/* Table header */}
          <div className="flex flex-row flex-1 gap-2 justify-between mx-8 py-3 text-sm md:text-md font-poppins bg-gray-100 px-3 rounded-md">
            <div className="w-full md:w-1/7 text-center">Product Image</div>
            <div className="w-full md:w-1/7 text-center">Product Name</div>
            <div className="w-full md:w-1/7 text-center">Price</div>
            <div className="w-full md:w-1/7 text-center">Stock</div>
            <div className="w-full md:w-1/7 text-center">Available Colors</div>
            <div className="w-full md:w-1/7 text-center">Actions</div>
          </div>

          {/* Display the list of products */}
          {products.map((product) => (
            <div key={product._id} className="flex flex-row justify-between mx-8 py-3 gap-1 md:text-md text-sm font-poppins bg-white px-3 border-b">
              <div className="w-full md:w-1/7 flex items-center justify-center">
                {/* Product image with fallback if no image */}
                <img
                  src={product.images.length ? product.images[0] : '/path/to/fallback-image.jpg'}
                  alt={product.name}
                  className="w-16 h-16 object-cover mr-4"
                />
              </div>
              <div className="w-full md:w-1/7 text-center self-center">{product.name}</div>
              <div className="w-full md:w-1/7 text-center self-center">{product.price}</div>
              <div className="w-full md:w-1/7 text-center self-center">{product.stock}</div>
              <div className="w-full md:w-1/7 text-center self-center">
                {product.colors.length ? product.colors.join(", ") : "No colors available"}
              </div>
              <div className="w-full md:w-1/7 flex justify-center items-center self-center">
                {/* Edit Button */}
                <button
                  className="text-black px-1 py-1 rounded-md text-xl ml-2"
                  onClick={() => navigate(`/editproduct/${product._id}`)}
                >
                  <FaRegEdit />
                </button>

                {/* Delete Button */}
                <button
                  className="text-red-500 px-2 py-1 rounded-md text-xl"
                  onClick={() => handleDelete(product._id)} // Call handleDelete on click
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductStock;
