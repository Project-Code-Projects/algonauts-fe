import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface Question {
  _id: string;
  studentId: string;
  question: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
  __v: number;
}

const HelpRequestStudentComponent = ({ data }: { data: Question[] }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<string>("");

  const openModal = (notes: string = "") => {
    setModalContent(notes);
    setShowModal(true);
  };
  return (
    <div className="container mx-auto p-8  shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6">Student Questions</h1>
      <ul className="space-y-4">
        {data.map((item) => (
          <li key={item._id} className="  p-6  m-4">
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
            <div className="mt-4 flex flex-col space-y-2">
              {item.notes && (
                <button
                  onClick={() => openModal(item.notes)}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  View Notes
                </button>
              )}
              {item.status === "accepted" && (
                <a
                  href={`/meeting/${item._id}`}
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                  Join Meeting
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Modal to show notes */}
      <Dialog open={showModal} onOpenChange={() => setShowModal(!showModal)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold mb-2">
              Help Request Notes
            </DialogTitle>
          </DialogHeader>
          <div dangerouslySetInnerHTML={{ __html: modalContent }} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HelpRequestStudentComponent;
