"use client";
import { useGetClassStatsQuery } from "@/redux/api/instructorApi";

const ClassDataAnalysis = () => {
  const {
    data: classStatsFromBE,
    error,
    isLoading,
  } = useGetClassStatsQuery([]);

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Class Data Analysis</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Exercise Name</th>
              <th className="px-4 py-2 text-left">Exercise Type</th>
              <th className="px-4 py-2 text-left">Class Avg Completion Time</th>
              <th className="px-4 py-2 text-left">Total Attempts</th>
              <th className="px-4 py-2 text-left">Successful Attempts</th>
              <th className="px-4 py-2 text-left">Success Rate</th>
            </tr>
          </thead>
          <tbody>
            {classStatsFromBE?.data?.map((stat: any, index: any) => (
              <tr
                key={stat._id}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="px-4 py-2 border-t">{stat.exerciseName}</td>
                <td className="px-4 py-2 border-t">{stat.exerciseType}</td>
                <td className="px-4 py-2 border-t">
                  {Number(stat.classAverageCompletionTime).toFixed(2)} mins
                </td>
                <td className="px-4 py-2 border-t">{stat.totalAttempts}</td>
                <td className="px-4 py-2 border-t">
                  {stat.successfulAttempts}
                </td>
                <td className="px-4 py-2 border-t">
                  {Number(stat.successRate).toFixed(2)} %
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassDataAnalysis;
