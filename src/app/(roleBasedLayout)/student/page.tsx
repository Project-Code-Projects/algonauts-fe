"use client";
import SpinAnimation from "@/components/ui/SpinAnimation";
import { useGetStudentByUserIdQuery } from "@/redux/api/studentApi";
import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { IHelpRequest } from "@/types/helpRequest";
import {
  useGetHelpRequestQuery,
  useCreateHelpRequestMutation,
} from "@/redux/api/helpRequestApi";
import HelpRequestStudentComponent from "@/components/helpRequest/HelpRequestStudentComponent";
import NotificationComponent from "@/components/NotificationComponent";


type HelpFormValues = {
  question: string;
};
const StudentPage = () => {
  const userInfo = getUserInfo();
  const userId = userInfo?._id;
  const studentId = userInfo?.studentId;
  const [openHelpDialogue, setOpenHelpDialogue] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HelpFormValues>();

  const [
    helpRequestCreate,
    {
      isLoading: helpRequestCreateIsLoading,
      isError: helpRequestCreateIsError,
    },
  ] = useCreateHelpRequestMutation();

  const {
    data: studentDataFromBE,
    isLoading,
    isError,
  } = useGetStudentByUserIdQuery(userId);

  const studentData = studentDataFromBE?.data[0]?.userId;
  const studentTableData = studentDataFromBE?.data[0];

  const {
    data: helpRequestData,
    isLoading: helpRequestIsLoading,
    isError: helpRequestIsError,
  } = useGetHelpRequestQuery({ studentId: studentId });

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



  // help request submit handler
  const onSubmit: SubmitHandler<HelpFormValues> = async (data) => {
    const helpCreationData = {
      question: data.question,
      studentId: studentId,
      userId: userId,
    };

    try {
      const data = await helpRequestCreate(helpCreationData);
      setOpenHelpDialogue(false);
      toast.success("Help request submitted successfully.");
    } catch (error: any) {
      console.error(error);
      toast.error("Error submitting help request.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <NotificationComponent />

      <h1 className="text-3xl font-bold mb-4">Student Information</h1>
      <Button variant="outline" onClick={() => setOpenHelpDialogue(true)}>
        Help Request
      </Button>

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


      {/* Help request component */}

      {helpRequestData.data && helpRequestData.data.length > 0 && (
        <HelpRequestStudentComponent data={helpRequestData.data} />  
      )}

      {/* <HelpRequestStudentComponent data={helpRequestData} /> */}

      {/* Help request modal */}
      <Dialog
        open={openHelpDialogue}
        onOpenChange={() => setOpenHelpDialogue(!openHelpDialogue)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold mb-2">
              Help Request
            </DialogTitle>
            <DialogDescription className="mb-4">
              Ask a question or request help from your instructor.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col space-y-1">
              <label htmlFor="question" className="font-medium">
                Question
              </label>
              <input
                id="question"
                {...register("question", { required: true })}
                placeholder="Type your question here"
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.question && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentPage;
