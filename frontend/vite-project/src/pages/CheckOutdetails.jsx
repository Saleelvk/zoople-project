import React, { useContext, useState } from "react";
import CardProcess from "../components/CardProcess";
import { ShopContext } from "../components/ShopContext";
import { useNavigate } from "react-router-dom";

function CheckOutDetails() {
  const { cartItems, setCartItems, currency } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    streetAddress: "",
    country: "India",
    city: "",
    state: "",
    zip: "",
    paymentMethod: "card", // Default payment method
    cardNumber: "",
    cardExpiry: "",
    cvc: "",
  });

  const Subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const total = Subtotal; // Assuming total is the same as subtotal here
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

   
  };


  /////////////////////////////////
 
  const handlePlaceOrder = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    try {
      // Prepare the order data
      const orderData = {
        ...formData,
        cartItems,
        total,
      };
      console.log(orderData);
  
      // Get the token from localStorage
      const token = localStorage.getItem('token');
  
      // Send the request using the fetch API
      const response = await fetch("http://localhost:3001/api/v1/order/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
        body: JSON.stringify(orderData),
        
      });
  
      // Check if the response is successful
      if (!response.ok) {
        const errorData = await response.json(); // Get error details
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message || 'Unknown error'}`);
      }
  
      const data = await response.json();
      console.log("Order placed successfully:", data);
  
      // Navigate to OrderComplete page after placing the order
      navigate("/Ordercomplete");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };
  
  
/////////////////////////////////

   // Update the cart quantity in the backend
   const updateCartQuantityInBackend = async (itemId, quantityChange) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/v1/cart/`, {
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



  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] ">
      <CardProcess name={"CheckOut"} />
      {/* Contact Information Section */}
      <div className="flex md:flex-row flex-col w-full gap-5 ">
        <form className=" w-full font-poppins " onSubmit={handlePlaceOrder}>
          <div className="max-w-2xl p-5 rounded-md border-2 my-5">
            <h2 className="text-lg font-semibold mb-4 font-poppins">
              Contact Information
            </h2>
            <div className="mb-4 flex gap-5">
              <div className="flex-1">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 font-poppins"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First name"
                  className="mt-1 block w-full p-2 border font-poppins border-gray-300 rounded-md"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 font-poppins"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last name"
                  className="mt-1 block w-full p-2 border font-poppins border-gray-300 rounded-md"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium font-poppins text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="mt-1 block w-full p-2 border font-poppins border-gray-300 rounded-md"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium font-poppins text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Your Email"
                className="mt-1 block w-full p-2 border font-poppins border-gray-300 rounded-md"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Shipping Address Section */}
          <div className="max-w-2xl p-5 rounded-md border-2 my-5  ">
            <h2 className="text-lg font-semibold font-poppins mb-4">Shipping Address</h2>
            <div className="mb-4">
              <label
                htmlFor="streetAddress"
                className="block text-sm font-medium font-poppins text-gray-700"
              >
                Street Address
              </label>
              <input
                type="text"
                id="streetAddress"
                name="streetAddress"
                placeholder="Street Address"
                className="mt-1 block w-full p-2 border font-poppins border-gray-300 rounded-md"
                value={formData.streetAddress}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="country"
                className="block text-sm font-medium font-poppins text-gray-700"
              >
                Country
              </label>
              <select
                id="country"
                name="country"
                className="mt-1 block w-full p-2 border  border-gray-300 rounded-md font-poppins outline-none"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="India">India</option>
                <option value="America">America</option>
                <option value="Portugal">Portugal</option>
                <option value="Argentina">Argentina</option>
                <option value="Brazil">Brazil</option>
                <option value="Croatia">Croatia</option>
                <option value="France">France</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="city"
                className="block text-sm font-medium font-poppins text-gray-700"
              >
                Town/City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Town/City"
                className="mt-1 block w-full p-2 border font-poppins border-gray-300 rounded-md"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4 flex gap-5">
              <div className="flex-1">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700 font-poppins"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  placeholder="State"
                  className="mt-1 block w-full p-2 border font-poppins border-gray-300 rounded-md"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="zip"
                  className="block text-sm font-medium font-poppins text-gray-700"
                >
                  ZIP Code
                </label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  placeholder="Zip Code"
                  className="mt-1 block w-full p-2 border font-poppins border-gray-300 rounded-md"
                  value={formData.zip}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-4 flex items-center gap-2">
              <input
                type="checkbox"
                id="differentBillingAddress"
                name="differentBillingAddress"
                className="w-5 h-5 text-blue-600 border-gray-300 font-poppins rounded focus:ring-blue-500"
              />
              <label
                htmlFor="differentBillingAddress"
                className="block text-sm font-medium text-gray-700 font-poppins"
              >
                Use a different billing address (optional)
              </label>
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="max-w-2xl p-5 rounded-md border-2 my-5">
            <h2 className="text-lg font-poppins font-semibold mb-4">Payment Method</h2>
            <div className="mb-4 flex items-center gap-4">
              <input
                type="radio"
                id="card"
                name="paymentMethod"
                value="card"
                className="mr-2 font-poppins"
                checked={formData.paymentMethod === "card"}
                onChange={handleChange}
              />
              <label htmlFor="card " className="font-poppins">Credit Card</label>
              <input
                type="radio"
                id="paypal"
                name="paymentMethod"
                value="paypal"
                className="mr-2 font-poppins"
                checked={formData.paymentMethod === "paypal"}
                onChange={handleChange}
              />
              <label htmlFor="paypal " className="font-poppins">PayPal</label>
            </div>
            {formData.paymentMethod === "card" && (
              <>
                <div className="mb-4 ">
                  <label
                    htmlFor="cardNumber"
                    className="block text-sm font-medium font-poppins text-gray-700"
                  >
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    className="mt-1 block w-full p-2 border font-poppins border-gray-300 rounded-md"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4 flex gap-5">
                  <div className="flex-1">
                    <label
                      htmlFor="cardExpiry"
                      className="block text-sm font-poppins font-medium text-gray-700"
                    >
                      Expiry Date (MM/YY)
                    </label>
                    <input
                      type="text"
                      id="cardExpiry"
                      name="cardExpiry"
                      placeholder="MM/YY"
                      className="mt-1 block w-full p-2 border border-gray-300 font-poppins rounded-md"
                      value={formData.cardExpiry}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="cvc"
                      className="block text-sm font-poppins font-medium text-gray-700"
                    >
                      CVC
                    </label>
                    <input
                      type="text"
                      id="cvc"
                      name="cvc"
                      className="mt-1 block w-full p-2 border font-poppins border-gray-300 rounded-md"
                      value={formData.cvc}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </>
            )}
            {/* Submit Button */}
          <button

            type="submit"
            className="mt-4 font-poppins bg-black w-full text-white font-semibold py-2 px-4 rounded-md"
          >
            Place Order
          </button>
          </div>

         


          
        </form>

          {/* Order Summary Section */}
      <div className="md:w-2/5  w-full" >

      <div className="border-2  w-full   flex  my-10">
      {cartItems && cartItems.length > 0 ? (
        <div className="bg-white shadow-lg rounded-lg w-full">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold font-poppins">Order Summary</h2>
          </div>
          <div className="p-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <img src={item.image} className="w-16" alt={item.title} />
                  <div>
                    <p className="font-poppins">{item.title}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => DecreItem(item._id)} className="px-2 bg-gray-200 rounded-md">-</button>
                  <span className="p-2 font-poppins">{item.quantity}</span>
                  <button onClick={() => increItem(item._id)} className="px-2 bg-gray-200 rounded-md ">+</button>
                </div>
                <p className="font-poppins">{currency}{item.price}</p>
              </div>
            ))}

            {/* Promo Code Section */}
            <div className="flex items-center mb-4">
              <input type="text" placeholder="Promo Code" className="flex-grow p-2 border rounded" />
              <button className="ml-2 p-2 bg-black text-white rounded font-poppins">Apply</button>
            </div>

            {/* Discount and Shipping */}
            <div className="flex justify-between items-center mb-4">
              <p className="font-poppins">Discount</p>
              <p className="text-green-500 font-poppins">-{currency}25.00 <button className="text-red-500 font-poppins">[Remove]</button></p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="font-poppins">Shipping</p>
              <p className="font-poppins">Free</p>
            </div>

            {/* Subtotal and Total */}
            <div className="flex justify-between items-center mb-4">
              <p className="font-poppins">Subtotal</p>
              <p className="font-poppins">{currency}{total}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-poppins">Total</p>
              <p className="text-xl font-poppins font-semibold">{currency}{total}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="font-poppins flex-1 text-xl text-center py-20 bg-gray-200 ">
          No items in the cart.
          <br />
          Add items you wish.
        </p>
      )}
    </div>
      </div>


      </div>
    </div>
  );
}

export default CheckOutDetails;
