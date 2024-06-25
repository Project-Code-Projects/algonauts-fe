"use client";

import { useState } from "react";
import CompletionTimeComparisonChart from "@/components/charts/CompletionTimeComparisonChart";
import SuccessRateComparisonChart from "@/components/charts/SuccessRateComparisonChart";
import TotalAttemptsDistributionChart from "@/components/charts/TotalAttemptsDistributionChart";
import {
  useGetStudentStatsQuery,
  useGetStudentCodeSnippetQuery,
} from "@/redux/api/instructorApi";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type IParams = {
  studentId: string;
};

const IndividualStudentDataPage = ({ params }: { params: IParams }) => {
  const { studentId } = params;
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const {
    data: studentStatResponse,
    error: studentStatsError,
    isLoading: studentStatsLoading,
  } = useGetStudentStatsQuery(studentId);

  const {
    data: studentCodeSnippetResponse,
    error: studentCodeSnippetError,
    isLoading: studentCodeSnippetLoading,
  } = useGetStudentCodeSnippetQuery(studentId);

  if (studentStatsLoading || studentCodeSnippetLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (studentStatsError || studentCodeSnippetError) {
    console.error(
      "Error fetching student data:",
      studentStatsError || studentCodeSnippetError
    );
    return (
      <div className="text-center text-red-500 text-xl mt-10">
        Error loading student data
      </div>
    );
  }

  if (
    !studentStatResponse ||
    !studentStatResponse.data ||
    !studentCodeSnippetResponse ||
    !studentCodeSnippetResponse.data
  ) {
    return (
      <div className="text-center text-gray-500 text-xl mt-10">
        No data available
      </div>
    );
  }

  const studentStats = studentStatResponse.data.statistics;
  const studentTotalHelpRequest = studentStatResponse.data.totalHelpRequests;

  const successRateData = studentStats.map((stat: any) => ({
    name: stat.exerciseName,
    studentSuccessRate: stat.studentSuccessRate,
    classSuccessRate: stat.successRate,
  }));

  const totalAttemptsData = studentStats.map((stat: any) => ({
    name: stat.exerciseName,
    totalAttempts: stat.studentTotalAttempts,
  }));

  const completionTimeData = studentStats.map((stat: any) => ({
    name: stat.exerciseName,
    studentTime: stat.studentAverageCompletionTime,
    averageTime: stat.classAverageCompletionTime,
  }));

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Student Statistics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="md:col-span-2">
          <SuccessRateComparisonChart data={successRateData} />
        </div>
        <TotalAttemptsDistributionChart data={totalAttemptsData} />
        <CompletionTimeComparisonChart data={completionTimeData} />
      </div>

      <div className="mt-10 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Total Help Requests
        </h2>
        <p className="text-5xl font-bold text-blue-500 text-center">
          {studentTotalHelpRequest}
        </p>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Code Snippets
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {studentCodeSnippetResponse.data.map(
            (exercise: any, index: number) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{exercise.exerciseName}</AccordionTrigger>
                <AccordionContent>
                  {exercise.snippets.map(
                    (snippet: any, snippetIndex: number) => (
                      <div
                        key={snippetIndex}
                        className="mb-4 p-4 bg-white rounded shadow"
                      >
                        <p className="text-sm text-gray-600 mb-2">
                          Completed on:{" "}
                          {new Date(snippet.completedOn).toLocaleString()}
                        </p>
                        <Dialog
                          open={openDialog === `${index}-${snippetIndex}`}
                          onOpenChange={(isOpen) =>
                            isOpen
                              ? setOpenDialog(`${index}-${snippetIndex}`)
                              : setOpenDialog(null)
                          }
                        >
                          <DialogTrigger asChild>
                            <button
                              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                              onClick={() =>
                                setOpenDialog(`${index}-${snippetIndex}`)
                              }
                            >
                              View Code Snippet
                            </button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Code Snippet</DialogTitle>
                              <DialogDescription>
                                <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded">
                                  {snippet.codeSnippet}
                                </pre>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </div>
                    )
                  )}
                </AccordionContent>
              </AccordionItem>
            )
          )}
        </Accordion>
      </div>
    </div>
  );
};

export default IndividualStudentDataPage;
