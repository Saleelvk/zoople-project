import React, { useEffect, useState } from 'react';
import Graph from '../../components/DashBoard/Graph';
import DealsDetails from '../../components/DashBoard/DealsDetails';

function DashBoard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const animateCount = (targetNumber, setState) => {
      const duration = 2000; // Duration in milliseconds
      const interval = 50; // Interval in milliseconds
      const steps = duration / interval; // Total steps to reach the target
      const increment = targetNumber / steps; // Increment for each step

      let currentCount = 0;
      const countUp = setInterval(() => {
        currentCount += increment;
        if (currentCount >= targetNumber) {
          currentCount = targetNumber; // Ensure it doesn't exceed the target
          clearInterval(countUp);
        }
        setState(Math.round(currentCount)); // Update state with the rounded value
      }, interval);

      return () => clearInterval(countUp); // Cleanup on component unmount
    };

    // Start counting animations
    const totalUsersAnimation = animateCount(14, setTotalUsers);
    const totalOrdersAnimation = animateCount(7, setTotalOrders); // Example target
    const totalProductsAnimation = animateCount(20, setTotalProducts); // Example target

    // Cleanup animations on component unmount
    return () => {
      totalUsersAnimation();
      totalOrdersAnimation();
      totalProductsAnimation();
    };
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="lg:ml-72 pt-8 pb-5 px-5"> {/* Added padding for smaller screens */}
        <p className="text-3xl font-poppins font-semibold mb-3">Dashboard</p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"> {/* Responsive grid for stats cards */}
          <div className="px-8 py-6 flex justify-between bg-white rounded-xl shadow-md">
            <div>
              <p className="font-poppins">Total Users</p>
              <p className="text-2xl  font-poppins font-semibold ">{totalUsers}</p>
            </div>
            <div>
              <img src="/image/Dashboard/Iconn.png" alt="Total Users Icon" />
            </div>
          </div>

          <div className="px-8 py-6 flex justify-between bg-white rounded-xl shadow-md">
            <div>
              <p className="font-poppins">Total Orders</p>
              <p className="text-2xl  font-poppins  font-semibold">{totalOrders}</p>
            </div>
            <div>
              <img src="/image/Dashboard/Icon-1.png" alt="Total Orders Icon" />
            </div>
          </div>

          <div className="px-8 py-6 flex justify-between bg-white rounded-xl shadow-md">
            <div>
              <p className="font-poppins">Total Products</p>
              <p className="text-2xl font-poppins  font-semibold">{totalProducts}</p>
            </div>
            <div>
              <img src="/image/Dashboard/Icon.png" alt="Total Products Icon" />
            </div>
          </div>
        </div>

        <div className="mt-10 bg-white rounded-2xl shadow-md w-full overflow-hidden">
          <Graph />
        </div>

        <div className="mt-8">
          <DealsDetails />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
