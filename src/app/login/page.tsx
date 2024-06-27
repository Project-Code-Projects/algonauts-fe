"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { storeUserInfo, getUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authEvents } from "@/utils/authEvents";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [userLogin, { isLoading }] = useUserLoginMutation();

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const loginResponse = await userLogin(data).unwrap();
      // console.log(loginResponse);

      if (loginResponse?.success) {
        storeUserInfo({ token: loginResponse?.data?.token });
        const userInfo = getUserInfo() as any;
        // console.log(userInfo);
        //  await setUserData(userInfo);
        authEvents.login();
        if (userInfo) {
          // console.log(userInfo.type);
          router.push(`/${userInfo.type}`);
        }
      }
    } catch (error) {
      // Handle login error
    }
  };

  return (
    <div className="bg-blue-100 h-[92vh] flex items-center justify-center">
      <div className="bg-tan-500 border-4 border-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full relative">
        <h1 className="text-gray-900 text-2xl mb-6 font-bold">
          EMAIL OR USERNAME:
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <h2 className="text-gray-900 text-2xl mb-2 font-bold">PASSWORD:</h2>
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
            <Link href="/signup" className="text-red-500 hover:text-blue-700 ">
              <p className=""> Don&apos;t have an account?</p>
            </Link>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white w-full py-2 rounded text-xl font-bold hover:bg-green-700"
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
