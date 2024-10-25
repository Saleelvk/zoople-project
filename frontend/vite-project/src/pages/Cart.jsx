import { useContext, useState } from "react";
import CardProcess from "../components/CardProcess";
import ItemsAdding from "../components/ItemsAdding";
import { ShopContext } from "../components/ShopContext";
import { useNavigate } from "react-router-dom";
function Cart() {
  const { cartItems } = useContext(ShopContext);
  const [shippingCost, setShippingCost] = useState(0); // To store the shipping cost
  const navigate = useNavigate();
  // Calculate totals
  const Subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = Subtotal + shippingCost; // Add shipping cost to subtotal for total

  // Function to handle shipping cost update
  const handleShippingChange = (cost) => {
    setShippingCost(cost);
  };

  const checkOutHandle=()=>{
    navigate("/CheckOut");
  }

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] my-20">
      <CardProcess name={"Cart"} />
      <div className="flex flex-col sm:flex-row justify-between w-full my-20 gap-10 ">
        <div className="flex flex-col justify-between w-full ">


          <div>
          <div className="flex justify-between border-b-2 pb-5 text-sm font-semibold mr-36  ">
            <p className="font-poppins mr-3">Product</p>
            <div className="flex gap-[74px]">
              <p className="font-poppins hidden sm:block">Quantity</p>
              <p className="font-poppins hidden sm:block">Price</p>
              <p className="font-poppins hidden sm:block">Subtotal</p>
            </div>
          </div>

          <ItemsAdding />
          </div>


        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md min-w-sm w-full h-[440px] mx-auto border ">
          <h2 className="text-lg font-semibold mb-4 font-poppins">Cart summary</h2>
          <div className="space-y-5">
            {/* Shipping Options */}
            <label className="flex items-center border p-2 rounded-md justify-between px-3">
              <div className="flex">
                <input
                  type="radio"
                  name="shipping"
                  value="free"
                  className="h-5 w-5 text-blue-600"
                  onChange={() => handleShippingChange(0)} // Free shipping
                />
                <p className="ml-2 font-poppins">Free shipping</p>
              </div>
              <p className="text-gray-500">$0.00</p>
            </label>
            <label className="flex items-center p-2 border rounded-md justify-between px-3">
              <div className="flex">
                <input
                  type="radio"
                  name="shipping"
                  value="express"
                  className="h-5 w-5 text-blue-600"
                  onChange={() => handleShippingChange(15)} // Express shipping
                />
                <p className="ml-2 font-poppins">Express shipping</p>
              </div>
              <p className="text-green-500">+$15.00</p>
            </label>
            <label className="flex items-center p-2 border rounded-md justify-between px-3">
              <div className="flex">
                <input
                  type="radio"
                  name="shipping"
                  value="pick-up"
                  className="h-5 w-5 text-blue-600"
                  onChange={() => handleShippingChange(30)} // Pick Up shipping
                />
                <p className="ml-2 font-poppins">Pick Up</p>
              </div>
              <p className="text-purple-500">+$30.00</p>
            </label>
          </div>

          {/* Totals Display */}
          <div className="mt-6">
            <p className="text-gray-900 font-semibold font-poppins">
              Subtotal <span className="float-right font-poppins">${Subtotal.toFixed(2)}</span>
            </p>
            <p className="text-xl font-bold mt-2 font-poppins">
              Total <span className="float-right font-poppins">${total.toFixed(2)}</span>
            </p>
          </div>

          <button onClick={checkOutHandle} className="mt-4 w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors font-poppins">
            
            Checkout
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 my-10 ">
        <p className="font-poppins font-semibold">Have a coupon?</p>
        <p className="font-poppins text-gray-500 text-sm">Add your code for an instant cart discount</p>
        <div className="border flex justify-between w-[300px] px-2 py-2 rounded-md font-poppins">
          <div className="flex gap-3 justify-center items-center">
            <img src="/src/assets/image/VectorDiscount.png" alt="VectorDiscount" className="h-4 " />
            <p className="font-poppins">Coupon Code</p>
          </div>

          <button>Apply</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
