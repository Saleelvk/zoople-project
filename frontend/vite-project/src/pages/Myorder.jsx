import React, { useEffect, useState } from "react";

function MyOrder() {
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserOrders = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('https://e-commerce-gclo.onrender.com/api/v1/order/myorders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        setUserOrders(data.orders);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="pt-20 pb-5 lg:ml-72 md:ml-20 ml-2  ">
      <div className="bg-white mt-10 mr-5 ">
        <p className="p-2 font-poppins text-xl md:ml-8 font-semibold">My Orders</p>

        <div className="mb-10 ">
          <div className="grid grid-cols-4 md:mx-8 mx-0 py-3 md:text-base text-xs bg-gray-100 md:px-2 px-0 rounded-md ">
            <div className="font-poppins">Product Image</div>
            <div className="font-poppins">Product Name</div>
            <div className="font-poppins">Amount</div>
            <div className="font-poppins">Status</div>
          </div>

          {userOrders.map((order) => (
            <div key={order._id} className="mb-5">
              {order.items.map((item) => (
                <div key={item.product} className="grid grid-cols-4 md:mx-8 mx-0 py-3 md:text-base text-xs bg-white md:px-3 px-2 border-b items-center">
                  <img src={item.image} alt={item.name} className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-md" />
                  <div className="font-poppins">{item.name}</div>
                  <div className="font-poppins">{item.price} {/* Display the price here instead of createdAt */}</div>
                  <div className="font-poppins">{order.status}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyOrder;
