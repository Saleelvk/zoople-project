import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DealsDetails() {
  const navigate = useNavigate();
  const [lastOrders, setLastOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:3001/api/v1/order/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('please Login  ');
        }

        const data = await response.json();
        setLastOrders(data.orders.slice(0, 3)); // Take the latest 3 orders
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleViewMore = () => {
    navigate("/order-list"); // Redirect to the Order List page
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white mt-10 lg:mr-5 px-4 py-6 rounded-xl shadow-md">
      <p className="text-xl font-poppins font-semibold mb-6">Deals Details</p>

      <div className="bg-white md:p-4 rounded-lg shadow-lg">
        {/* Header with flex layout */}
        <div className="flex justify-between bg-gray-100 px-1 py-3 md:px-3 rounded-md text-xs md:text-base font-poppins">
          <div className="w-1/5 text-center md:text-left">Product Image</div>
          <div className="w-2/5 text-center md:text-left">Product Name</div>
          <div className="w-1/5 text-center md:text-left">Date-Time</div>
          <div className="w-1/5 text-center md:text-left">Amount</div>
          <div className="w-1/5 text-center md:text-left">Status</div>
        </div>

        {/* Mapping only the first 3 orders */}
        {lastOrders.map((order) => (
          <div
            key={order._id}
            className="flex md:justify-between items-center justify-center border-b py-4 px-2 gap-2 sm:px-3 space-y-4 sm:space-y-0"
          >
            {order.items[0] && (
              <div className="flex w-1/5">
                <img
                  src={order.items[0].image}
                  alt={order.items[0].name}
                  className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md"
                />
              </div>
            )}
            <div className="w-2/5 text-xs sm:text-sm md:text-base text-center sm:text-left">
              {order.items[0] ? order.items[0].name : "N/A"}
            </div>
            <div className="w-1/5 text-xs sm:text-sm md:text-base text-center sm:text-left">
              {new Date(order.createdAt).toLocaleString()}
            </div>
            <div className="w-1/5 text-xs sm:text-sm md:text-base text-center sm:text-left">
              {order.total}
            </div>
            <div className="w-1/5 text-xs sm:text-sm md:text-base text-center sm:text-left">
              {order.status}
            </div>
          </div>
        ))}
      </div>

      {/* "View More" Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleViewMore}
          className="bg-black text-white py-2 px-6 rounded-full font-poppins hover:bg-gray-700 transition"
        >
          View More
        </button>
      </div>
    </div>
  );
}

export default DealsDetails;
