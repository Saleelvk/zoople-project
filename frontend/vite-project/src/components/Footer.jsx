import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="w-full bg-black flex-col text-white pb-10 font-poppins">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row border-b items-start sm:items-center justify-between px-5 sm:px-10 h-auto sm:h-[100px]">
        {/* Left Section */}
        <div className="flex items-center justify-start gap-4 pt-4">
          <p className="font-medium font-poppins">GadgetCore</p>
          <hr className="w-[1px] h-5 bg-white" />
          <p className="text-sm  font-poppins">Empower Your Workstation</p>
        </div>

        {/* Right Section */}
        <ul className="flex flex-col sm:flex-row gap-2 sm:gap-5 text-sm mt-5 sm:mt-0 ">
          <Link to="/" className=" font-poppins">Home</Link>
          <Link to="/Shop"  className=" font-poppins">Shop</Link>
          <Link to="/Product"  className=" font-poppins">Products</Link>
          <Link to="/ContactUs"  className=" font-poppins">Contact Us</Link>
        </ul>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-5 sm:px-3 pt-5 sm:pt-10 h-auto sm:h-[50px]">
        {/* Left Section */}
        <div className="flex flex-col sm:flex-row  items-start sm:items-center gap-2 mb-4 sm:gap-4 sm:ml-7 ">
          <p className="text-xs font-poppins ">Copyright © 2024 Mens Cart. All rights reserved</p>
          <p className="text-xs font-poppins" >Privacy Policy</p>
          <p className="text-xs font-poppins">Terms of Use</p>
        </div>

        {/* Right Section */}
        <ul className="flex flex-row gap-5 mt-5 sm:mt-0 mb-4 mr-7 ">
          <img src="/src/assets/image/social/outline/instagram.png" alt="Instagram" />
          <img src="/src/assets/image/social/outline/facebook.png" alt="Facebook" />
          <img src="/src/assets/image/social/outline/youtube.png" alt="YouTube" />
        </ul>
      </div>
    </div>
  );
}

export default Footer;
