import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import LogoutModal from '../../pages/Login/Logout';
import axios from "axios";

const Navbar = () => {
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); // Check if token exists

  const location = useLocation();
  const navigate = useNavigate();

  const listItems = [
    { label: "Dashboard", link: "/dashboard" },
    { label: "Order List", link: "/order-list" },
    { label: "Products", link: "/products" },
    { label: "Products Stock", link: "/products-stock" },
  ];

  const handleLogout = async () => {
    setIsModalOpen(false);
    try {
      const response = await axios.post('https://e-commerce-gclo.onrender.com/api/v1/auth/logout');
      console.log(response.data.message);
      setIsLoggedIn(false); // Update the logged-in state

      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  const handleLogin = async () => {
    navigate('/login')
    // Replace this with your login logic
    try {
      const response = await axios.post('https://e-commerce-gclo.onrender.com/api/v1/auth/login', {
        // your login credentials
      });
      console.log(response.data.message);
      localStorage.setItem('token', response.data.token); // Assuming the response contains a token
      setIsLoggedIn(true); // Update the logged-in state
      navigate('/'); // Redirect to homepage or wherever needed
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  const confirmLogout = () => {
    handleLogout(); // Call the logout function
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-menu")) {
        setShowProfileOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex">
      <div className="fixed top-0 left-0 w-full flex items-center justify-between py-5 font-medium z-40 bg-white shadow-lg px-8 transition-all duration-500">
        <div className="flex items-center gap-1">
          <NavLink to="/">
            <img
              src="/image/image/letter-g_12452164.png"
              className="w-12"
              alt="Logo"
            />
          </NavLink>
          <NavLink
            to="/"
            className="sm:flex gap-6 text-xl text-gray-900 font-poppins"
          >
            Gadget Core
          </NavLink>
        </div>

        <div className="w-[500px] mx-4 hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border rounded-2xl p-2 focus:outline-none focus:border-black"
          />
        </div>

        <div className="flex items-center gap-4 relative">
          <div className="relative profile-menu">
            <div className="flex gap-2">
              <img
                className="w-7 h-7 cursor-pointer"
                src="/image/image/Vector.png"
                alt="profile icon"
                onClick={() => setShowProfileOptions(!showProfileOptions)}
              />
              {/* Conditional Rendering for Login/Logout */}
              {!isLoggedIn && (
                <button onClick={handleLogin} className="text-white  px-10   bg-black font-poppins rounded-md">
                  Login
                </button>
              )}
            </div>
            {showProfileOptions && isLoggedIn && (
              <div className="absolute right-0 top-14 bg-white shadow-md px-3 py-2 w-40 mt-2">
                <button onClick={() => setIsModalOpen(true)} className="text-red-500 font-poppins">
                  Logout
                </button>
              </div>
            )}
          </div>

          <LogoutModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            onConfirm={confirmLogout} 
          />

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <img
                src="/src/assets/image/menu_open_43dp_5F6368_FILL0_wght400_GRAD0_opsz40.png"
                className="w-10 cursor-pointer"
                alt="menu-icon"
              />
            </button>
          </div>
        </div>
      </div>

      <nav className={`fixed top-[89px] z-50 left-0 w-64 h-[calc(100%-89px)] bg-white shadow-lg sidebar-list transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <ul>
          {listItems.map((item, index) => (
            <li
              key={index}
              className={`py-2 px-5 md:block transition duration-300 font-poppins
                ${item.link === location.pathname ? 'bg-black text-white' : 'bg-white text-black'} 
                hover:bg-black hover:text-white`}
            >
              <NavLink to={item.link} className="block w-full h-full" onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex-1 ml-64 mt-[89px] md:ml-0">
        {/* Your main content goes here */}
      </div>
    </div>
  );
};

export default Navbar;
