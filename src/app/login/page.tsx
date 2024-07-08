"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { storeUserInfo, getUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authEvents } from "@/utils/authEvents";
import toast from "react-hot-toast";
import alogoanutsLogo from "../../../public/navbar/logo.png";
import Image from "next/image";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [userLogin, { isLoading, isError }] = useUserLoginMutation();

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const loginResponse = await userLogin(data).unwrap();

      if (loginResponse?.success) {
        storeUserInfo({ token: loginResponse?.data?.token });
        const userInfo = getUserInfo() as any;
        authEvents.login();
        if (userInfo && userInfo.type) {
          toast.success("Login successfull. Redirecting you to your dashboard");
          router.push(`/${userInfo.type}`);
        }
      } else {
        // Handle unsuccessful login
        toast.error(loginResponse.message || "Login failed. Please try again.");
      }
    } catch (error: any) {
      console.error(error);
      if (error.data) {
        toast.error(
          error.data.message ||
            "An error occurred during login. Please try again."
        );
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="h-[100vh] flex items-center justify-center">
      <div className="p-8  max-w-md w-full relative">
        <div className="flex justify-center mb-6">
          <Image src={alogoanutsLogo} alt="Logo" width={150} height={150} />
        </div>
        <h1 className="text-2xl font-bold text-center mb-8">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="block text-gray-700 text-sm font-bold mb-2">Email:</h2>
          <input
            type="text"
            className="w-full p-2 mb-4 border-2 border-gray-900 rounded"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-600">{errors.email.message as string}</p>
          )}
          <div className="relative">
            <h2 className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </h2>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-2 mb-4 border-2 border-gray-900 rounded"
              placeholder="password"
              {...register("password", {
                required: "Password is required",
                minLength: 6,
              })}
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute inset-y-2 right-0 pr-3 mt-5"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-600">{errors.password.message as string}</p>
          )}

          <div className="flex items-center mb-6 ">
            <Link
              href="/signup/parentSignup"
              className="text-blue-600 hover:text-blue-700 "
            >
              <p className=""> Don&apos;t have an account? Sign up please</p>
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            disabled={isLoading}
          >
            {isLoading ? "LOGGING IN..." : "LOG IN"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
