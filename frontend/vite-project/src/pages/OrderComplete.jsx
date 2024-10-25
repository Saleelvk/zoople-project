import React, { useContext, useEffect, useState } from 'react'
import CardProcess from '../components/CardProcess'
import { ShopContext } from "../components/ShopContext";
import { Link } from 'react-router-dom';

function OrderComplete() {
  const { cartItems } = useContext(ShopContext);
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

 
  //generate Order Code 
  function generateFakeOrderCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#_';
    let orderCode = '#'; 
    const codeLength = 10; 
  
    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      orderCode += characters[randomIndex];
    }
  
    return orderCode;
  }
  
  useEffect(()=>{
    // Example usage:
   generateFakeOrderCode();
   
  },[])
  const [orderCode, setOrderCode] = useState(generateFakeOrderCode());
  return cartItems && cartItems.length > 0 ? (
    <div className=''>  
      <CardProcess name={'Complete!'} />
      <div className='flex justify-center  '>
        <div className='flex flex-col items-center px-14 py-6 gap-8 mx-5  sm:w-2xl border-2 rounded-xl shadow-md mb-10 h-full '>
          <p className='text-2xl font-poppins font-semibold text-gray-400'>Thank you🎉</p>
          <p className='text-3xl font-poppins text-center font-semibold text-black'>
            Your order has been <br /> received
          </p>
  
          {/* Map over cart items here */}
          <div className='flex gap-3 '>
            {cartItems.map((item, index) => (
              <div key={index} className='relative'>
                <img className='w-20 h-20 object-cover' src={item.image} alt={item.name} />
                {/* Display the quantity or item index */}
                <p className='absolute top-0   right-2  px-1  rounded-full bg-black text-white text-sm'>{item.quantity}</p>
              </div>
            ))}
          </div>
  
          {/* Order details section */}
          <div className='flex flex-col gap-4  mt-10  '>
            <div className='grid grid-cols-2 gap-10 ml-6 '>
              <p className='font-poppins'>Order Code</p>
              <p className='font-poppins'>{orderCode}</p>
            </div>
  
            <div className='grid grid-cols-2 gap-10 ml-6 '>
              <p className='font-poppins'>Date</p>
              <p className='font-poppins'>{new Date().toLocaleDateString()}</p>
            </div>
  
            <div className='grid grid-cols-2 gap-10 ml-6 '>
              <p className='font-poppins'>Total</p>
              <p className='font-semibold'>{total}</p>
            </div>
  
            <div className='grid grid-cols-2 gap-10 ml-6 '>
              <p className='font-poppins'>Payment method</p>
              <p className='font-poppins'>Credit Card</p> {/* Replace with actual payment method */}
            </div>
          </div>
  
          {/* Shared button outside the map to avoid repetition */}
          <Link  to={'/Myorder'} className='px-5  bg-black text-white py-2 rounded-full cursor-pointer font-poppins'>
            Purchase history
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <p className="font-poppins text-3xl font-semibold flex-1  text-center py-20 my-[256px] bg-gray-200">
      No items in the cart.
      <br />
      Add items you wish.
    </p>
  );
  
}


export default OrderComplete
