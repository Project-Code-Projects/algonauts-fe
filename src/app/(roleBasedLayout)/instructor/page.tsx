"use client";
import HelpRequestInstructorComponent from "@/components/helpRequest/HelpRequestInstructorComponent";
import SpinAnimation from "@/components/ui/SpinAnimation";
import { useGetHelpRequestQuery } from "@/redux/api/helpRequestApi";
import { useGetInstructorApiQuery } from "@/redux/api/instructorApi";
import { getUserInfo } from "@/services/auth.service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SocialPage from "@/components/social/social";
import Image from "next/image";

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

  return (
    <div className="min-h-[92vh] flex flex-col justify-center ">
      {/* Left side: Instructor Information */}
      <div className=" p-6 flex items-center justify-center">
        <div className="flex flex-col  mb-6">
          <Image
            src={`https://avatar.iran.liara.run/public/boy`}
            alt={instructorData.name}
            width={128}
            height={128}
            className="rounded-full mb-4 border-4 border-blue-500"
          />
          <h1 className="text-2xl font-bold text-gray-800">
            {instructorData.name}
          </h1>
          <p className="text-gray-600">Email: {instructorData.email}</p>
        </div>
      </div>

      {/* Right side: Social and Help Request */}
      <div className=" p-6">
        <Tabs defaultValue="social" className="w-full flex flex-col ">
          <TabsList className="mb-4">
            <TabsTrigger value="social" className="px-4 py-2">
              Social
            </TabsTrigger>
            <TabsTrigger value="help-request" className="px-4 py-2">
              Help Request
            </TabsTrigger>
          </TabsList>
          <TabsContent value="social">
            <SocialPage />
          </TabsContent>
          <TabsContent value="help-request">
            {helpRequestData?.data && helpRequestData.data.length > 0 ? (
              <HelpRequestInstructorComponent data={helpRequestData.data} />
            ) : (
              <p className="text-gray-600">No help requests available.</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InstructorProfilePage;
