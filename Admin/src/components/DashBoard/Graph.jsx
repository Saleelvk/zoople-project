import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";


const Graph = () => {
  const data = [
    { name: "Jan", sales: 10000 },
    { name: "Feb", sales: 15000 },
    { name: "Mar", sales: 5000 },
    { name: "Apr", sales: 4000 },
    { name: "May", sales: 10000 },
    { name: "Jun", sales: 35000 },
    { name: "Jul", sales: 4000 },
    { name: "Aug", sales: 2000 },
    { name: "Sep", sales: 15000 },
    { name: "Oct", sales: 25000 },
    { name: "Nov", sales: 12000 },
    { name: "Dec", sales: 18000 },
  ];
  return (
    <div style={{ width: "100%", height: 500 }}>
      <h2 className=" pl-10 pt-6 font-bold text-xl">Sales Details</h2>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#000000"
            strokeWidth={2}
            activeDot={{ r: 8 }}
            dot={{ r: 4 }}
            isAnimationActive={true}
            animationDuration={1500}  // Controls animation speed
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
