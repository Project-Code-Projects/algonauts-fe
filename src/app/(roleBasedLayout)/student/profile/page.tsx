"use client";

import SpinAnimation from "@/components/ui/SpinAnimation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetStudentByUserIdQuery } from "@/redux/api/studentApi";
import { getUserInfo } from "@/services/auth.service";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useResetUserPasswordMutation } from "@/redux/api/userApi";
import toast from "react-hot-toast";
import Image from "next/image";

const StudentProfilePage = () => {
  const userInfo = getUserInfo();
  const userId = userInfo?._id;
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    data: studentDataFromBE,
    isLoading,
    isError,
  } = useGetStudentByUserIdQuery(userId);

  const [resetPassword, { isLoading: isResetting, isError: isResetError }] =
    useResetUserPasswordMutation();

  const studentData = studentDataFromBE?.data[0]?.userId;

  if (isLoading) {
    return <SpinAnimation />;
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 font-semibold text-xl">
        Error loading student data.
      </div>
    );
  }

  if (!studentDataFromBE || studentDataFromBE.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 font-semibold text-xl">
        No student data found.
      </div>
    );
  }

  const handleResetPassword = async () => {
    try {
      console.log({ userId, oldPassword, newPassword });
      await resetPassword({ userId, oldPassword, newPassword }).unwrap();
      toast.success("Password reset successful");
      // Clear the input fields
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      toast.error("Failed to reset password");
    }
  };

  const togglePasswordVisibility = (field: any) => {
    if (field === "old") {
      setShowOldPassword(!showOldPassword);
    } else {
      setShowNewPassword(!showNewPassword);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Student Profile
          </h1>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-center border-b border-gray-200 pb-2">
              <Image
                src={`https://avatar.iran.liara.run/public/boy`}
                alt={studentData.name}
                width={64}
                height={64}
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-200 pb-2">
              <span className="text-gray-600 font-medium w-1/3">Name:</span>
              <span className="text-gray-800 sm:w-2/3">{studentData.name}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-200 pb-2">
              <span className="text-gray-600 font-medium w-1/3">Email:</span>
              <span className="text-gray-800 sm:w-2/3">
                {studentData.email}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-200 pb-2">
              <span className="text-gray-600 font-medium w-1/3">
                Created At:
              </span>
              <span className="text-gray-800 sm:w-2/3">
                {new Date(studentData.createdAt).toLocaleString()}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-200 pb-2">
              <span className="text-gray-600 font-medium w-1/3">
                Updated At:
              </span>
              <span className="text-gray-800 sm:w-2/3">
                {new Date(studentData.updatedAt).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        <div>
          {/* Reset Password Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full mt-12 bg-red-500">
                Reset Password
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Reset Password</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="old-password" className="text-right">
                    Old Password
                  </Label>
                  <div className="relative col-span-3">
                    <Input
                      id="old-password"
                      type={showOldPassword ? "text" : "password"}
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("old")}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showOldPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new-password" className="text-right">
                    New Password
                  </Label>
                  <div className="relative col-span-3">
                    <Input
                      id="new-password"
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("new")}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <Button onClick={handleResetPassword}>Reset Password</Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default StudentProfilePage;
