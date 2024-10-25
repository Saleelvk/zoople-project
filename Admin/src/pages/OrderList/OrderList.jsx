import React, { useEffect, useState } from "react";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("orders", orders);

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
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        setOrders(data.orders);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/order/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      const updatedOrder = await response.json();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: updatedOrder.order.status } : order
        )
      );
    
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="pt-8 pb-5 lg:ml-72 md:ml-20 ml-2">
      <div className="bg-white mt-10 mr-5">
        <p className="p-2 font-poppins text-xl md:ml-8 font-semibold">Admin Orders</p>

        <div className="mb-10">
          <div className="grid grid-cols-7 md:mx-8 mx-0 py-3 md:text-base text-xs font-poppins bg-gray-100 md:px-2 px-0 rounded-md">
            <div>Image</div>
            <div>Product Name</div>
            <div>Date-Time</div>
            <div>Amount</div>
            <div>Status</div>
            <div>Update Status</div>
          </div>

          {orders.map((order) => (
            <div key={order._id} className="mb-5 grid grid-cols-7 md:mx-8 mx-0 py-3 md:text-base text-xs font-poppins bg-white md:px-3 px-2 border-b">
              {/* Displaying the product image */}
              <div>
                {order.items[0] && order.items[0].image && (
                  <img
                    src={order.items[0].image}
                    alt={order.items[0].name || "Product Image"}
                    className="h-16 w-16 object-cover"
                  />
                )}
              </div>
              <div>{order.items[0] ? order.items[0].name : "N/A"}</div> {/* Added check for items */}
              <div>{new Date(order.createdAt).toLocaleString()}</div>
              <div>{order.total}</div>
              <div>{order.status}</div>

              <div>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className="border p-1"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderList;
