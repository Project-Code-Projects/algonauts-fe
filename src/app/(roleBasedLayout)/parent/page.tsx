"use client";
import SpinAnimation from "@/components/ui/SpinAnimation";
import { useGetParentbyUserIdQuery } from "@/redux/api/parentApi";
import { useGetStudentByParentIdQuery } from "@/redux/api/studentApi";
import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";

const ParentProfilePage = () => {
  const userInfo = getUserInfo();
  const parentId = userInfo?._id;

  const {
    data: parentDataFromBE,
    isLoading,
    isError,
  } = useGetParentbyUserIdQuery(parentId);

  const { data: studentsByParentId } = useGetStudentByParentIdQuery(parentId);

  if (isLoading) {
    return <SpinAnimation />;
  }

  if (isError || !parentDataFromBE) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error occurred while fetching data.
      </div>
    );
  }

  const parentData = parentDataFromBE?.data[0]?.userId;
  const studentData = studentsByParentId?.data;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-3xl mx-auto bg-gray-200 rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-4 text-center">Parent Profile</h1>
        <h2 className="text-2xl font-bold mb-4 text-center">
          Parent Name: {parentData.name}
        </h2>
        <h2 className="text-2xl font-bold mb-8 text-center">
          Parent userId: {parentData._id}
        </h2>

        <div className="mb-8 flex justify-center">
          <Link href={"/parent/addStudent"}>
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
              Add Child
            </button>
          </Link>
        </div>

        <div className="text-lg font-semibold mb-4 text-center">
          List of Children
        </div>
        <div className="grid gap-4">
          {studentData?.map((student: any) => (
            <div
              key={student._id}
              className="bg-blue-100 p-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
            >
              <h2 className="text-xl font-bold mb-2">{student.userId.name}</h2>
              <p className="text-gray-600">Email: {student.userId.email}</p>
              <p className="text-gray-600">Status: {student.status}</p>
              <p className="text-gray-600">
                Password: {student.userId.password}
              </p>
              <p className="text-gray-600">
                Created At:{" "}
                {new Date(student.userId.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParentProfilePage;
