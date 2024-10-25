import React, { useContext } from "react";
import { ShopContext } from "./ShopContext";

const ItemsAdding = () => {
  const { cartItems, setCartItems } = useContext(ShopContext);

  const updateCartQuantityInBackend = async (itemId, quantityChange) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://e-commerce-gclo.onrender.com/api/v1/cart/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: itemId,
          quantity: quantityChange, // This is the quantity change (+1 or -1)
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update cart');
      }
    } catch (error) {
      console.error('Error updating cart quantity:', error);
    }
  };

  // Increase item quantity and update backend
  const increItem = async (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item._id === itemId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
    await updateCartQuantityInBackend(itemId, 1); // Increment by 1
  };

  // Decrease item quantity and update backend
  const DecreItem = async (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item._id === itemId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    );
    await updateCartQuantityInBackend(itemId, -1); // Decrement by 1
  };



  const removeItem = async (itemId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/cart/${itemId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }

      // Update local cart state
      setCartItems((prevItems) =>
        prevItems.filter((item) => item._id !== itemId)
      );
    } catch (error) {
      console.log("Error removing item from cart:", error);
    }
  };

  return (
    <div className="w-full flex flex-col">
      {cartItems.map((item) => (
        <div
          key={item._id}
          className="flex flex-row sm:flex-row justify-between items-center w-full p-4  border-b border-gray-300"
        >
          <div className="flex sm:flex-row gap-4 items-center">
            <img src={item.image} alt={item.name} className="w-28" />
            <div className="flex flex-col">
              <p className="font-poppins text-md mr-28 ">{item.title}</p>
              <p className="text-sm text-gray-600"></p>
            </div>
          </div>

          <div className="flex items-center flex-row sm:flex-row gap-4 sm:gap-12 mt-4 mx-2 sm:mt-0">
            <div className="flex items-center ">
              <button
                onClick={() => DecreItem(item._id)}
                className="px-2 py-1 border border-gray-400   text-md  rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                -
              </button>
              <span className="pl-3 w-10">{item.quantity}</span>
              <button
                onClick={() => increItem(item._id)}
                className="px-2 py-1 border border-gray-400  text-md rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                +
              </button>
            </div>

            <div className="flex flex-col items-end">
              <p className="font-semibold text-sm sm:text-base">
                ${item.price.toFixed(2)}
              </p>
            </div>

            <div className="flex flex-col items-end w-12">
              <p className="font-semibold text-sm sm:text-base">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>

            {/* Remove Item Button */}
            <button
              onClick={() => removeItem(item._id)}
              className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-700 font-poppins focus:outline-none"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemsAdding;
