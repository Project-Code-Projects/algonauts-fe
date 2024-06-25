import React from "react";
import Link from "next/link";

const DataAnalysisHomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Data Analysis Home Page
      </h1>
      <div className="text-center">
        <Link href="/instructor/dataAnalysis/classDataAnalysis">
          <span className="text-2xl font-semibold text-blue-500 hover:underline mb-4 block cursor-pointer">
            Class Data Analysis
          </span>
        </Link>
        <Link href="/instructor/dataAnalysis/studentDataAnalysis">
          <span className="text-2xl font-semibold text-blue-500 hover:underline cursor-pointer">
            Student Data Analysis
          </span>
        </Link>
      </div>
    </div>
  );
};

export default DataAnalysisHomePage;
