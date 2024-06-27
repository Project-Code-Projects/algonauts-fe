import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CompletionTimeComparisonChart = ({ data }: { data: any }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Completion Time Comparison
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="studentTime"
            stroke="#3B82F6"
            strokeWidth={2}
            name="Student's Average Time"
          />
          <Line
            type="monotone"
            dataKey="averageTime"
            stroke="#10B981"
            strokeWidth={2}
            name="Class Average Time"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompletionTimeComparisonChart;
