"use client";
import { useGetAllStudentsQuery } from "@/redux/api/studentApi";
import Link from "next/link";

const StudentDataAnalysisPage = () => {
  const {
    data: allStudentDataFromBE,
    error,
    isLoading,
  } = useGetAllStudentsQuery([]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading student data</div>;

  const allStudents = allStudentDataFromBE.data;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Student Data Analysis Page</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full  shadow-md rounded-lg overflow-hidden">
          <thead className="bg-green-100">
            <tr>
              <th className="py-3 px-4 text-left font-semibold text-gray-600 uppercase tracking-wider">
                Student Name
              </th>
              <th className="py-3 px-4 text-left font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="py-3 px-4 text-left font-semibold text-gray-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {allStudents.map((student: any) => (
              <tr key={student._id} className="hover:bg-gray-50">
                <td className="py-4 px-4 whitespace-nowrap">
                  {student.userId.name}
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  {student.status}
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  <Link
                    href={`/instructor/dataAnalysis/studentDataAnalysis/${student._id}`}
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    See Student Data
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDataAnalysisPage;
