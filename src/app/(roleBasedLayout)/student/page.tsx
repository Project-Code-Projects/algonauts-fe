"use client";
import SpinAnimation from "@/components/ui/SpinAnimation";
import { useGetStudentByUserIdQuery } from "@/redux/api/studentApi";
import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";
import React from "react";

const StudentPage = () => {
  const userInfo = getUserInfo();
  const userId = userInfo?._id;

  const {
    data: studentDataFromBE,
    isLoading,
    isError,
  } = useGetStudentByUserIdQuery(userId);

  if (isLoading) {
    return <SpinAnimation />;
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error loading student data.
      </div>
    );
  }

  if (!studentDataFromBE || studentDataFromBE.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        No student data found.
      </div>
    );
  }

  const studentData = studentDataFromBE?.data[0]?.userId;

  console.log(studentData);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Student Information</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <p className="text-gray-600 mb-2">
          <strong className="text-gray-800">ID:</strong> {studentData._id}
        </p>
        <p className="text-gray-600 mb-2">
          <strong className="text-gray-800">Name:</strong> {studentData.name}
        </p>
        <p className="text-gray-600 mb-2">
          <strong className="text-gray-800">Email:</strong> {studentData.email}
        </p>
        <p className="text-gray-600 mb-2">
          <strong className="text-gray-800">Created At:</strong>{" "}
          {new Date(studentData.createdAt).toLocaleString()}
        </p>
        <p className="text-gray-600">
          <strong className="text-gray-800">Updated At:</strong>{" "}
          {new Date(studentData.updatedAt).toLocaleString()}
        </p>

        <div className="flex justify-around w-full mt-12 space-x-8">
          <Link href={"/student/beginner"}>
            <div className="card bg-gray-100 p-6 rounded-lg shadow-md hover:bg-gray-200 cursor-pointer">
              <h2 className="text-xl font-bold mb-2">Beginner</h2>
              <p>Start your learning journey here.</p>
            </div>
          </Link>
          <Link href={"/student/advanced"}>
            <div className="card bg-gray-100 p-6 rounded-lg shadow-md hover:bg-gray-200 cursor-pointer">
              <h2 className="text-xl font-bold mb-2">Advanced</h2>
              <p>Take your skills to the next level.</p>
            </div>
          </Link>
          <Link href={"/student/expert"}>
            <div className="card bg-gray-100 p-6 rounded-lg shadow-md hover:bg-gray-200 cursor-pointer">
              <h2 className="text-xl font-bold mb-2">Expert</h2>
              <p>Become a master in your field.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
