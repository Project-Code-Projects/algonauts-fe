import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TotalAttemptsDistributionChart = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Total Attempts Distribution
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalAttempts" fill="#8884d8" name="Total Attempts" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalAttemptsDistributionChart;
