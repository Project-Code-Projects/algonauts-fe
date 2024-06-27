// MeetingRoomPage.tsx
"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import MeetingRoom from "@/components/helpRequest/MeetingRoom";
import { useParams, useRouter } from "next/navigation";
import {
  useGetHelpRequestByIdQuery,
  useUpdateHelpRequestMutation,
} from "@/redux/api/helpRequestApi";
import { getUserInfo } from "@/services/auth.service";
import { USER_TYPE } from "@/constants/type";
import "react-quill/dist/quill.snow.css";
import "highlight.js/styles/github.css"; // You can choose any highlight.js theme here
import { useForm, Controller } from "react-hook-form";
import hljs from "highlight.js";
import Quill from "quill";
import toast from "react-hot-toast";
import socket from "@/services/socket";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// Add syntax highlighting functionality
window.Quill = Quill;
require("highlight.js");

// import socket from "../../../services/socket";
const modules = {
  syntax: {
    highlight: (text: string) => hljs.highlightAuto(text).value,
  },
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
    // [{ 'color': [] }, { 'background': [] }],
    // [{ 'align': [] }],
    // ['link', 'image', 'video'],
    ["clean"],
  ],
};

interface Params {
  params: { roomId: string };
}

const MeetingRoomPage = ({ params }: Params) => {
  const roomId = params.roomId;
  const userInfo = getUserInfo();
  const router = useRouter();

  const [peerId, setPeerId] = React.useState<string>("");
  const [remotePeerId, setRemotePeerId] = React.useState<string>("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ notes: string }>();

  const [submitNotes, { isLoading: isSubmitting }] =
    useUpdateHelpRequestMutation();

  const {
    data: helpRequestData,
    isLoading: helpRequestIsLoading,
    isError: helpRequestIsError,
  } = useGetHelpRequestByIdQuery(roomId);

  const helpRequest = helpRequestData?.data;

  useEffect(() => {
    if (helpRequest) {
      if (userInfo?.type === USER_TYPE.STUDENT) {
        setPeerId(helpRequest.studentId);
        setRemotePeerId(helpRequest.instructorId);
        socket.on("instructor-disconnected", () => {
          alert("Instructor disconnected");
          router.push("/student");
        });
      } else if (userInfo?.type === USER_TYPE.INSTRUCTOR) {
        setPeerId(helpRequest.instructorId);
        setRemotePeerId(helpRequest.studentId);
      }
    }
  }, [helpRequestData]);

  const onSubmit = async (data: { notes: string }) => {
    console.log(data);
    try {
      await submitNotes({ data: data, id: helpRequestData.data._id }).unwrap();
      alert("Notes submitted successfully");
      toast.success("Notes submitted successfully");
    } catch (error) {
      console.error("Failed to submit notes:", error);
      alert("Failed to submit notes");
      toast.error("Failed to submit notes");
    }
  };

  const closeMeeting = async () => {
    // Close the meetingt
    try {
      // Close the meeting
      // alert('Meeting Closed');
      await submitNotes({
        id: helpRequest._id,
        data: {
          completedAt: Date.now(),
          status: "completed",
        },
      }).unwrap();
      toast.success("Meeting Closed");
      router.push("/instructor");
    } catch (error) {
      console.error("Failed to close meeting:", error);
      toast.error("Failed to close meeting");
    }
  };

  if (helpRequestIsError) {
    return <div>Error...</div>;
  }

  if (helpRequestIsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {helpRequestData && peerId !== "" && remotePeerId !== "" && (
        <div className="container mx-auto p-8 bg-gray-100 rounded-lg shadow-md">
          <MeetingRoom
            roomId={roomId}
            meetingPeerId={peerId}
            meetingRemotePeerId={remotePeerId}
          />
          {userInfo?.type === USER_TYPE.INSTRUCTOR && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Notes</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="notes"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Notes are required" }}
                  render={({ field }) => (
                    <ReactQuill
                      {...field}
                      theme="snow"
                      className="bg-white rounded-lg shadow-md p-4"
                      modules={modules}
                    />
                  )}
                />
                {errors.notes && (
                  <p className="text-red-500 mt-2">{errors.notes.message}</p>
                )}
                <button
                  type="submit"
                  className={`mt-4 py-2 px-4 rounded ${
                    isSubmitting
                      ? "bg-gray-400"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Notes"}
                </button>
                <button
                  className={`mt-4 py-2 px-4 rounded`}
                  onClick={() => {
                    closeMeeting();
                  }}
                >
                  Close Meeting
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MeetingRoomPage;
