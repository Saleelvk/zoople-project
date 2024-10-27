import React, { useEffect, useState,useContext } from "react";
import ProductsItems from "../components/productsItems";
import { ShopContext } from "../components/ShopContext";

function Products() {
  const [productsCardItems, setProductsCardItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {url}=useContext(ShopContext)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching
      try {
        const response = await fetch(
          `${url}/api/v1/product/products/"
        );

        // Log the response status to see if there is an issue
        console.log("Response Status:", response);

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`);
        }

        const data = await response.json();
      
        setProductsCardItems(data.products || []); // Store the products in state
      } catch (error) {
      
        setError(`Error fetching products: ${error.message}`); // Set error message if fetch fails
      } finally {
        setLoading(false); // Set loading to false once fetch is complete
      }
    };

    fetchProducts();
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className="px-4 mt-[61px] sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mb-72">
      <img
        className="h-[392px] w-full object-cover"
        src="/src/assets/image/technology.jpg"
        alt="technology"
      />

      {/* Loading and Error Handling */}
      {loading && <div className="text-center mt-10">Loading...</div>}
      {error && <div className="text-center mt-10 text-red-500">{error}</div>}

      {/* Product displaying */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 mt-10">
        {productsCardItems.map((item) => (
          <ProductsItems
            key={item._id} // Use unique identifier as key
            id={item._id}
            image={item.images[0]}
            name={item.name}
            price={item.price}
            star={item.star}
          />
      
        ))}
      </div>
    </div>
  );
}

export default Products;
