import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ShopContext } from "../components/ShopContext";
import closeIcon from "../assets/image/communication/outline/close.png";
import Discount from "./discount";
import axios from "axios";

function Navbar() {
  const [visible, setVisible] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status
  const location = useLocation();
  const { currency, cartItems, setCartItems, } = useContext(ShopContext);

  const [showDiscount, setShowDiscount] = useState(true);
  const navigate = useNavigate();

  const fetchCartProducts = async () => {
    try {
      const response = await fetch("https://e-commerce-gclo.onrender.com/api/v1/cart", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cart products");
      }

      const data = await response.json();

      setCartItems(
        data.items
          .filter((item) => item.product)
          .map((item) => ({
            key: item.product._id,
            _id: item.product._id,
            title: item.product.name,
            price: item.product.price,
            image: item.product.images[0],
            quantity: item.quantity,
            color: item.colors,
            subtotal: item.product.price * item.quantity,
          }))
      );
    } catch (error) {
      console.log("Error fetching cart products:", error);
    }
  };
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

  const logouthandler = () => {
    // Handle logout logic
    setIsLoggedIn(false); // Update login state
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/Login");
  };

  const handleLogin = () => {
    // Simulate login success and token storage
    setIsLoggedIn(true);
    // Set token in localStorage
    navigate("/Login"); // Redirect to home or desired page after login
  };

  useEffect(() => {
    fetchCartProducts();
    // Check for token on component mount
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // Set login state based on token presence
    }
  }, [setCartItems]);

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };


// Function to calculate the total (could include taxes or shipping if applicable)


  const handleCheckout = () => {
    navigate("/checkout");
    setVisible(false);
  };

  const carthandle = () => {
    setVisible(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const removeItem = async (itemId) => {
    try {
      const response = await fetch(
        `https://e-commerce-gclo.onrender.com/api/v1/cart/${itemId}`,
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





  const viewCartPage=()=>{
    setVisible(false)
    navigate('/Cart')
  }

  return (
    <div className="relative">
      {showDiscount && (
        <div className="absolute top-0 left-0 bg-white right-0 w-full z-50">
          <Discount onClose={() => setShowDiscount(false)} />
        </div>
      )}

      <div
        className={`fixed top-0 left-0 w-full flex items-center justify-between py-5 font-medium z-40 bg-white shadow-lg px-8 transition-all duration-500 ${
          showDiscount ? "pt-10" : "pt-4"
        }`}
      >
        <div className="flex items-center gap-1">
          <NavLink to="/">
            <img
              src="../../public/image/letter-g_12452164.png"
              className="w-12"
              alt="Logo"
            />
          </NavLink>
          <NavLink
            to="/"
            className="sm:flex gap-6 text-xl text-gray-900 font-Orbitron"
          >
            Gadget Core
          </NavLink>
        </div>

        <ul className="hidden sm:flex gap-5 text-md">
          {["/", "/Shop", "/Products", "/ContactUs"].map((path) => (
            <NavLink
              key={path}
              to={path}
              className={`focus:text-black ${
                location.pathname === path ? "text-black" : "text-gray-500"
              } font-poppins`}
            >
              {path === "/"
                ? "Home"
                : path
                    .replace("/", "")
                    .replace(/([A-Z])/g, " $1")
                    .trim()}
            </NavLink>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          {/* Show search icon only on larger screens */}
          <img
            className="sm:block hidden"
            src="../../public/image/search 02.png"
            alt="search"
          />

          {/* Cart Icon - Show only when logged in */}
          {isLoggedIn && (
            <div className="relative">
              <img
                onClick={() => setVisible(true)}
                className="sm:block hidden cursor-pointer"
                src="../../public/image/shopping bag.png"
                alt="shopping bag"
              />
              <p className="absolute hidden sm:block right-0 left-2 top-3 bg-black text-white px-[5px] py-[2px] text-[10px] rounded-full">
                {cartItems.length}
              </p>
            </div>
          )}

          {/* Login Button or Profile Icon */}
          <div className="relative">
  {isLoggedIn ? (
    <>
      <img
        className="sm:block hidden w-6 h-6 cursor-pointer"
        src="/public/image/Vector.png"
        alt="profile icon"
        onClick={() => setShowProfileOptions(!showProfileOptions)}
      />
      {showProfileOptions && (
        <div className="absolute right-0 top-14 bg-white shadow-md p-2 w-40 mt-2">
          <p className="text-gray-700 font-semibold font-poppins">
            Username
          </p>
          <div className="flex flex-col gap-2">
            <Link
              to={"/Login"}
              className="text-red-500 mt-2 font-poppins"
              onClick={logouthandler}
            >
              Logout
            </Link>
            <Link
              to={"/Myorder"}
              className="text-red-500 font-poppins"
              onClick={() => {
                // Hide profile options when "My Order" is clicked
                setShowProfileOptions(false);
              }}
            >
              My Order
            </Link>
          </div>
        </div>
      )}
    </>
  ) : (
    <button
      onClick={handleLogin}
      className="text-gray-500 font-poppins"
    >
      Login
    </button>
  )}
</div>


          {/* Sidebar Menu Button */}
          <button onClick={toggleSidebar} className="sm:hidden w-10">
            <img
              src="../../src/assets/image/menu_open_43dp_5F6368_FILL0_wght400_GRAD0_opsz40.png"
              alt="Menu"
            />
          </button>
        </div>

        {/* Sidebar Menu for Small Screens */}
        <div
          className={`fixed top-0 right-0 bg-white shadow-lg w-64 h-full z-50 transition-transform transform ${
            sidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-end p-4">
            <img
              src={closeIcon}
              alt="close"
              onClick={toggleSidebar}
              className="cursor-pointer"
            />
          </div>
          <nav className="flex flex-col items-start p-4">
            {["/", "/Shop", "/Products", "/ContactUs"].map((path) => (
              <NavLink
                key={path}
                to={path}
                onClick={toggleSidebar}
                className={`my-2 text-lg ${
                  location.pathname === path ? "text-black" : "text-gray-500"
                }`}
              >
                {path === "/"
                  ? "Home"
                  : path
                      .replace("/", "")
                      .replace(/([A-Z])/g, " $1")
                      .trim()}
              </NavLink>
            ))}
            <div className="flex items-center relative">
              {/* Show shopping icon only if not logged in */}
              {!isLoggedIn && (
                <div className="flex items-center gap-2 mt-4">
                  <img
                    src="../../public/image/shopping bag.png"
                    alt="Shopping Icon"
                  />
                  <Link
                    to="/Cart"
                    className="text-lg text-gray-500"
                    onClick={toggleSidebar}
                  ></Link>
                </div>
              )}

              <div className="flex items-center gap-2 mt-2">
                {isLoggedIn ? (
                  <button
                    className="relative"
                    onClick={() => setShowProfileOptions(!showProfileOptions)}
                  >
                    <img src="/public/image/Vector.png" alt="Profile Icon" />
                  </button>
                ) : (
                  <button
                    onClick={handleLogin}
                    className="bg-black text-white font-poppins px-6 py-2 rounded-lg transition duration-300 ease-in-out hover:bg-gray-800"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Shopping Cart Overlay */}
      {visible && (
  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40">
    <div
      className={`absolute top-0 right-0 bg-white p-6 w-full sm:w-96 h-full shadow-lg transform transition-transform duration-500 ${
        visible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center mb-5">

      <h2 className="text-2xl font-bold  ">Shopping Cart</h2>
      <button
          onClick={carthandle}
          className="text-gray-500 py-2  rounded-lg hover:text-gray-700 transition"
          >
          <img src='/src/assets/image/close.png' alt=""  className="w-6"/>
        </button>
        </div>
        {cartItems.map((item) => (

          
<div
key={item._id}
className="flex justify-between items-center mb-6 border-b pb-4 transition hover:shadow-lg"
>
<div className="flex items-center">
  <img
    src={item.image}
    alt={item.title}
    className="w-16 h-16 mr-4 rounded-lg shadow-xs object-cover transition-transform duration-200 hover:scale-105"
  />
  <div>
    <div className="flex gap-10 items-center">
      <h3 className="text-lg font-poppins font-semibold text-gray-800">{item.title}</h3>
      <p className="text-lg font-poppins font-bold text-gray-900">
        ${item.price.toFixed(2)}
      </p>
    </div>

    <div className="flex items-center mt-2">
      {/* Decrease Quantity Button */}
      <button
        onClick={() => DecreItem(item._id)}
        className="px-3 py-1 bg-gray-200 text-black rounded-lg hover:bg-gray-300 transition"
        disabled={item.quantity <= 1}
      >
        -
      </button>

      <span className="mx-2 text-lg font-medium">{item.quantity}</span>

      {/* Increase Quantity Button */}
      <button
        onClick={() => increItem(item._id)}
        className="px-3 py-1 bg-gray-200 text-black rounded-lg hover:bg-gray-300 transition"
      >
        +
      </button>
    </div>
  </div>
</div>
<img
  src={closeIcon}
  alt="Remove"
  onClick={() => removeItem(item._id)}
  className="cursor-pointer w-5 h-5 text-gray-600 hover:text-red-600 transition"
/>
</div>

))}


      <div className="flex justify-between mt-4 font-bold">
        <h3 className="text-lg">Subtotal:</h3>
        <p className="text-lg">{currency}{calculateSubtotal()}</p>
      </div>

      <div className="flex justify-between mt-2 font-bold">
        <h3 className="text-lg">Total:</h3>
        <p className="text-lg">{currency}{calculateSubtotal()}</p>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={handleCheckout}
          className="bg-black w-full font-poppins  text-white py-2 px-6 rounded-lg shadow hover:bg-gray-800 transition"
        >
          Checkout
        </button>
       
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={viewCartPage}
          className="bg-black text-white font-poppins py-2 px-4 rounded-lg shadow hover:bg-gray-800 transition"
        >
          View Cart Page
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default Navbar;
