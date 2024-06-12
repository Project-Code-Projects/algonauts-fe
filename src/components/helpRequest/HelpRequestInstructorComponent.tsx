import React from "react";
import { useUpdateHelpRequestMutation } from "@/redux/api/helpRequestApi";
import { getUserInfo } from "@/services/auth.service";

interface Question {
  _id: string;
  studentId: string;
  question: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


const HelpRequestInstructorComponent = ({ data }: { data: Question[] }) => {
  const userInfo = getUserInfo();
  const userId = userInfo?._id;
  const instructorId = userInfo?.instructorId;

 const [updateHelpRequest] = useUpdateHelpRequestMutation();
  return (
    <div className="container mx-auto p-8 bg-white shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6">Student Questions</h1>
      <ul className="space-y-4">
        {data.map((item) => (
          <li
            key={item._id}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-300 m-4"
          >
            <p className="text-lg font-semibold mb-2">{item.question}</p>
            <p className="text-sm text-gray-600">
              <strong>Status:</strong> {item.status}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Student ID:</strong> {item.studentId}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Created At:</strong>{" "}
              {new Date(item.createdAt).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Updated At:</strong>{" "}
              {new Date(item.updatedAt).toLocaleString()}
            </p>
            {item.status === 'pending' && (
              <button
                onClick={() => 
                  updateHelpRequest({ id: item._id, data: { status: 'accepted', instructorId:instructorId } })
                }
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Accept
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HelpRequestInstructorComponent;
