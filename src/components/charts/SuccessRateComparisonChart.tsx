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

const SuccessRateComparisonChart = ({ data } : {data : any}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Success Rate Comparison
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="studentSuccessRate"
            fill="#3B82F6"
            name="Student Success Rate"
          />
          <Bar
            dataKey="classSuccessRate"
            fill="#10B981"
            name="Class Success Rate"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SuccessRateComparisonChart;
