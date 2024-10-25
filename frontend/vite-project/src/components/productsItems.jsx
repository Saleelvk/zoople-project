import React, { useContext } from "react";
import { ShopContext } from "./ShopContext";
import { Link } from "react-router-dom";
import star from '../assets/image/communication/outline/Rating Group.jpg';

function ProductsItems({ id, price, name, image }) {
  const { currency, addToCart } = useContext(ShopContext);

  // Handle adding item to cart
  const handleAddToCart = () => {
    const quantity = 1; // Default to adding 1 item
    addToCart({ _id: id, name, price, image, quantity }); // Update local cart state
  };
  
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-xl relative h-[420px] flex flex-col">
      <Link to={`/Product/${id}`} className="block flex-grow">
        <div className="overflow-hidden bg-gray-100 rounded-t-lg h-[270px] flex justify-center items-center">
          <img
            className="w-[220px] h-full object-contain transition-transform duration-300 ease-in-out transform hover:scale-110"
            src={image}
            alt={name}
          />
        </div>
      </Link>

      <div className="p-3 flex-grow flex flex-col justify-between">
        <div>
          <img src={star} alt="star rating" className="w-16 mb-1" />
          <h2 className="text-lg font-semibold text-black font-poppins">{name}</h2>
          <p className="text-md mb-24  font-bold text-black font-poppins">
            {currency}{price}
          </p>
        </div>
       
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          handleAddToCart();
        }}
        className="absolute bottom-4 left-4 right-4 bg-black text-white py-2 rounded-lg font-poppins transition-colors hover:bg-gray-800"
      >
        ADD TO CART
      </button>

      <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-md shadow-md text-xs font-bold">
        <p className="text-black font-poppins">New</p>
      </div>

      <div className="absolute top-10 left-3 bg-green-500 font-poppins text-white px-1 py-1 rounded-md shadow-md text-xs font-bold">
        - 50%
      </div>
    </div>
  );
}

export default ProductsItems;
