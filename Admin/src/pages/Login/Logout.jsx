import React from 'react';
import { Link } from 'react-router-dom';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded shadow-lg p-5">
        <h2 className="text-lg font-semibold">Are you ready to log out?</h2>
        <div className="mt-4 flex justify-between">
          <Link
          to={'/login'}
            onClick={onConfirm} 
            className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
          </Link>
          <button 
            onClick={onClose} 
            className="bg-gray-300 text-black px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
