import React, { useState, useEffect } from "react";

import ProductsItems from "../components/productsItems";
import EmailSend from "../components/emailSend";

function Shop() {

  const [productsCardItems, setProductsCardItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://e-commerce-gclo.onrender.com/api/v1/product/products/");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.products || !Array.isArray(data.products)) {
          throw new Error("Invalid products data format");
        }

       
        const sortedProducts = data.products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setProductsCardItems(sortedProducts); // Set the sorted products

      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message); 
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);



  return (
    <div className="px-4 mt-[61px] sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <img
        className="h-[392px] w-full object-cover"
        src="/src/assets/image/technology.jpg"
        alt="technology"
      />

      {/* Loading and Error Handling */}
      {loading && <div className="text-center mt-10">Loading...</div>}
      {error && <div className="text-center mt-10 text-red-500">Error: {error}</div>}
      { loading && !error && (
        <div className="text-center mt-10 font-poppins ">No products available.</div>
      )}

      {/* Product displaying */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {productsCardItems.map((item) => (
          <ProductsItems
            key={item._id}
            id={item._id}
            image={item.images.length > 0 ? item.images[0] : ""}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
      <EmailSend />
    </div>
  );
}

export default Shop;
