import React from 'react';

function Discount({ onClose }) {
  return (
    <div className="fixed top-0 w-full flex items-center justify-center bg-gray-200 z-50  transition-transform duration-300">
      <img className="h-5 pt-1" src="/src/assets/image/VectorDiscount.png" alt="Discount Icon" />
      <p className="text-sm font-semibold">
        30% off storewide — Limited time! <span> Shop Now </span>
        <span className="text-blue-600 text-xl cursor-pointer">&#8594;</span>
      </p>
      <img onClick={onClose} className="absolute right-5 cursor-pointer" src="/src/assets/image/close.png" alt="Close" />
    </div>
  );
}

export default Discount;
