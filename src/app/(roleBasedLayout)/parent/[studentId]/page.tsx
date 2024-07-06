"use client";
import CompletionTimeComparisonChart from "@/components/charts/CompletionTimeComparisonChart";
import SuccessRateComparisonChart from "@/components/charts/SuccessRateComparisonChart";
import TotalAttemptsDistributionChart from "@/components/charts/TotalAttemptsDistributionChart";
import { useGetStudentStatsQuery } from "@/redux/api/parentApi";
import React from "react";

type IParams = {
  studentId: string;
};

const ParentsChildPage = ({ params }: { params: IParams }) => {
  const { studentId } = params;

  const {
    data: studentStatResponse,
    error,
    isLoading,
  } = useGetStudentStatsQuery(studentId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    console.error("Error fetching student stats:", error);
    return (
      <div className="text-center text-red-500 text-xl mt-10">
        Error loading student stats
      </div>
    );
  }

  if (!studentStatResponse || !studentStatResponse.data) {
    return (
      <div className="text-center text-gray-500 text-xl mt-10">
        No data available
      </div>
    );
  }

  const studentStats = studentStatResponse.data.statistics;
  const studentTotalHelpRequest = studentStatResponse.data.totalHelpRequests;

  const successRateData = studentStats.map((stat: any) => ({
    name: stat.exerciseName,
    studentSuccessRate: stat.studentSuccessRate,
    classSuccessRate: stat.successRate,
  }));

  const totalAttemptsData = studentStats.map((stat: any) => ({
    name: stat.exerciseName,
    totalAttempts: stat.studentTotalAttempts,
  }));

  const completionTimeData = studentStats.map((stat: any) => ({
    name: stat.exerciseName,
    studentTime: stat.studentAverageCompletionTime,
    averageTime: stat.classAverageCompletionTime,
  }));

  return (
    <div className="container mx-auto px-4 py-8 ">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Student Statistics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="md:col-span-2">
          <SuccessRateComparisonChart data={successRateData} />
        </div>
        <TotalAttemptsDistributionChart data={totalAttemptsData} />
        <CompletionTimeComparisonChart data={completionTimeData} />
      </div>

      <div className="mt-10 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Total Help Requests
        </h2>
        <p className="text-5xl font-bold text-blue-500 text-center">
          {studentTotalHelpRequest}
        </p>
      </div>
    </div>
  );
};

export default ParentsChildPage;
