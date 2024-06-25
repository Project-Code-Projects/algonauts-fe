"use client";
import HelpRequestInstructorComponent from "@/components/helpRequest/HelpRequestInstructorComponent";
import SpinAnimation from "@/components/ui/SpinAnimation";
import { useGetHelpRequestQuery } from "@/redux/api/helpRequestApi";
// import { useGetParentbyUserIdQuery } from "@/redux/api/parentApi";
import { useGetInstructorApiQuery } from "@/redux/api/instructorApi";
import { useGetStudentByParentIdQuery } from "@/redux/api/studentApi";
import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SocialPage from "@/components/social/social";


const InstructorProfilePage = () => {
  const userInfo = getUserInfo();
  const userId = userInfo?._id;

  const {
    data: instructorDataFromBE,
    isLoading,
    isError,
  } = useGetInstructorApiQuery(userId);

  const {
    data: helpRequestData,
    isLoading: helpRequestIsLoading,
    isError: helpRequestIsError,
  } = useGetHelpRequestQuery({});

  // const { data: studentsByParentId } = useGetStudentByParentIdQuery(parentId);

  if (isLoading) {
    return <SpinAnimation />;
  }

  if (isError || !instructorDataFromBE) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error occurred while fetching data.
      </div>
    );
  }

  const instructorData = instructorDataFromBE?.data[0]?.userId;
  // const studentData = studentsByParentId?.data;

  return (
    <div className="min-h-[92vh] flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">
        instructor Name: {instructorData.name}{" "}
      </h1>
      <h1 className="text-2xl font-bold mb-8">
        Instructor userId: {instructorData._id}{" "}
      </h1>

      {helpRequestData.data && helpRequestData.data.length > 0 && (
        <HelpRequestInstructorComponent data={helpRequestData.data} />
      )}

      <Tabs defaultValue="social" className="mt-2 w-full">
        <TabsList>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="help-request">Help Request</TabsTrigger>
        </TabsList>
        <TabsContent value="social">
          <SocialPage />
        </TabsContent>
        <TabsContent value="help-request">
          {helpRequestData.data && helpRequestData.data.length > 0 && (
            <HelpRequestInstructorComponent data={helpRequestData.data} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InstructorProfilePage;
