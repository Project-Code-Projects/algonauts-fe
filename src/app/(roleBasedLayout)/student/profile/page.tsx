"use client";

import SpinAnimation from "@/components/ui/SpinAnimation";
import { useGetStudentByUserIdQuery } from "@/redux/api/studentApi";
import { getUserInfo } from "@/services/auth.service";

const StudentProfilePage = () => {
  const userInfo = getUserInfo();
  const userId = userInfo?._id;

  const {
    data: studentDataFromBE,
    isLoading,
    isError,
  } = useGetStudentByUserIdQuery(userId);

  const studentData = studentDataFromBE?.data[0]?.userId;

  if (isLoading) {
    return <SpinAnimation />;
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 font-semibold text-xl">
        Error loading student data.
      </div>
    );
  }

  if (!studentDataFromBE || studentDataFromBE.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 font-semibold text-xl">
        No student data found.
      </div>
    );
  }

  return (
    <div className=" py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Student Profile
          </h1>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-200 pb-2">
              <span className="text-gray-600 font-medium w-1/3">ID:</span>
              <span className="text-gray-800 sm:w-2/3">{studentData._id}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-200 pb-2">
              <span className="text-gray-600 font-medium w-1/3">Name:</span>
              <span className="text-gray-800 sm:w-2/3">{studentData.name}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-200 pb-2">
              <span className="text-gray-600 font-medium w-1/3">Email:</span>
              <span className="text-gray-800 sm:w-2/3">
                {studentData.email}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-200 pb-2">
              <span className="text-gray-600 font-medium w-1/3">
                Created At:
              </span>
              <span className="text-gray-800 sm:w-2/3">
                {new Date(studentData.createdAt).toLocaleString()}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-200 pb-2">
              <span className="text-gray-600 font-medium w-1/3">
                Updated At:
              </span>
              <span className="text-gray-800 sm:w-2/3">
                {new Date(studentData.updatedAt).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfilePage;
