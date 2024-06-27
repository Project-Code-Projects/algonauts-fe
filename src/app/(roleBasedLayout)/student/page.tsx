"use client";
import SpinAnimation from "@/components/ui/SpinAnimation";
import {
  useGetStudentByUserIdQuery,
  useGetStudentProgressQuery,
} from "@/redux/api/studentApi";
import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

import {
  useGetHelpRequestQuery,
  useCreateHelpRequestMutation,
} from "@/redux/api/helpRequestApi";
import HelpRequestStudentComponent from "@/components/helpRequest/HelpRequestStudentComponent";
import NotificationComponent from "@/components/NotificationComponent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SocialPage from "@/components/social/social";
import ExerciseProgressPieChart from "@/components/charts/ExerciseProgressPieChart";

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

  const {
    data: studentPorgressResponse,
    isLoading: studentProgressLoading,
    isError: studentProgressError,
  } = useGetStudentProgressQuery(studentId);

  const studentProgressData = studentPorgressResponse?.data;
  console.log(studentProgressData);

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
    <div className="flex justify-evenly items-start mx-auto p-6">
      {/* Tabs component */}

      <div className="">
        <NotificationComponent />

        <Button
          variant="outline"
          onClick={() => setOpenHelpDialogue(true)}
          className="ml-4"
        >
          Help Request
        </Button>
      </div>

      <div className="flex-grow">
        <Tabs defaultValue="social" className="mt-2 w-full">
          <TabsList className="flex justify-center ">
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="help-request">Help Request</TabsTrigger>
          </TabsList>
          <TabsContent value="social">
            <SocialPage />
          </TabsContent>
          <TabsContent value="help-request">
            {helpRequestData?.data && helpRequestData?.data.length > 0 && (
              <HelpRequestStudentComponent data={helpRequestData.data} />
            )}
          </TabsContent>
        </Tabs>
      </div>

      <div className="my-12 flex flex-col justify-center items-center">
        <ExerciseProgressPieChart
          totalExercises={studentProgressData?.totalExercises}
          numberOfExercisesDone={studentProgressData.numberOfExercisesDone}
        />
        <Link href={"/student/syllabus"}>
          <button className="inline-block px-6 py-3 bg-violet-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out">
            See syllabus
          </button>
        </Link>
      </div>

      {/* Modal Start */}
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
