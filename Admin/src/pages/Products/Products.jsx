import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 


function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
console.log(products)
  // Fetch product data from the backend
  useEffect(() => {
    
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3001/api/v1/product/products");
        const data = await response.json(); // Parse the JSON response directly
        console.log("Fetched products:", data);
    
        // Sort the products based on the 'createdAt' field (newest first)
        const sortedProducts = data.products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
        setProducts(sortedProducts); // Set the sorted products
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    

    fetchProducts();
  }, []);

  const handleViewMore = () => {
    navigate('/products-stock');
  };

  const AddProduct = () => {
    navigate('/AddProduct');
  };

  const addCart = (e) => {
    e.preventDefault();
    // Logic for adding item to cart
  };

  return (
    <div className="md:ml-72 pt-8 pb-5 font-poppins">
      <p className="text-2xl font-semibold mb-5">Products</p>
      <div className="bg-black text-white rounded-xl">
        <div>
          <img src="" alt="" />
        </div>
        <div className="flex-col flex gap-5 px-10 py-20">
          <p className="text-white">September 12, 2024</p>
          <p className="text-3xl font-semibold leading-10">
            Enjoy free home <br /> delivery this summer
          </p>
          <p className="text-gray-400">New collections with offers</p>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 my-6 md:mx-0 mx-5">
          {products.map((item, index) => (
            <div key={index} className="relative cursor-pointer h-[370px]">
              <Link className="text-gray-700">
                <div className="overflow-hidden flex flex-col items-center relative bg-gray-200 pb-4 h-[270px]">
                  <img
                    className="w-[220px] h-full object-contain"
                    src={item.images[0]}
                    alt={item.name}
                  />
         
                  <Link to={`/editproduct/${[item._id]}`}
                    className="absolute bottom-1 bg-gray-600 text-white py-2 px-4 mb-1 rounded-md"
                    >
                    Edit Product
                  </Link>
               
                </div>
                <div className="absolute top-2 left-2">
                  <p className="bg-white px-1 font-semibold">New</p>
                  <p className="bg-green-400 px-1 text-sm text-white font-semibold mt-1">
                    - 50%
                  </p>
                </div>
                <div className="pl-3 mt-2">
                  <p className="pt-1 font-semibold text-black">{item.name}</p>
                  <p className="font-bold inline text-md pl-1 pt-1 text-black">
                  {item.price}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      <div className="md:px-16 md:py-11 px-8 py-5 flex bg-gray-100 rounded-xl shadow-md fixed md:right-10 right-3 bottom-10">
        <button onClick={AddProduct} className="text-xl">
          Add New Product <span className="md:text-xl text-md">+</span>
        </button>
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={handleViewMore}
          className="bg-black text-white py-2 px-6 rounded-full font-poppins hover:bg-gray-700 mb-5"
        >
          View More
        </button>
      </div>
    </div>
  );
}

export default Products;
