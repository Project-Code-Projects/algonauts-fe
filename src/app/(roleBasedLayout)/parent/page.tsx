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
    <div className="min-h-[92vh] flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">
        Parent Name: {parentData.name}{" "}
      </h1>
      <h1 className="text-2xl font-bold mb-8">
        Parent userId: {parentData._id}{" "}
      </h1>

      <div className="mb-8">
        <Link href={"/parent/addStudent"}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Child
          </button>
        </Link>
      </div>

      <div className="text-lg font-semibold mb-4">List of Children</div>
      <div>
        {studentData?.map((student: any) => (
          <div key={student._id} className="mb-4 p-4 border rounded">
            <h2 className="text-xl font-bold">{student.userId.name}</h2>
            <p>Email: {student.userId.email}</p>
            <p>Status: {student.status}</p>
            <p>Password: {student.userId.password}</p>
            <p>
              Created At:{" "}
              {new Date(student.userId.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParentProfilePage;
