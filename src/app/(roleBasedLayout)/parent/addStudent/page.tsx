"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAddUserMutation } from "@/redux/api/userApi";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { getUserInfo } from "@/services/auth.service";

const AddStudentPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [addUser, { isLoading, isError, error }] = useAddUserMutation();

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  // ! Starting of Tailwind style
  const inputStyle =
    "w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-purple-500";
  const labelStyle = "block text-gray-700 text-sm font-bold mb-2";
  const buttonStyle =
    "bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600";
  const errorStyle = "text-red-500 text-sm";

  // ! End of Tailwind style

  const onSubmit = async (data: any) => {
    try {
      const parentId = getUserInfo();
      data.type = "student";
      data.parentId = parentId?._id;
      const response = await addUser(data).unwrap();
      if (response.success) {
        toast.success("Child created successfully!");
        setTimeout(() => {
          router.push("/parent");
        }, 2000);
      }
    } catch (err) {
      console.error("Failed to sign up:", err);
    }
  };

  return (
    <div className="bg-blue-100 h-[92vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Image
            src="https://codecombat.com/images/pages/base/logo.webp"
            alt="Logo"
            width={150}
            height={150}
          />
        </div>
        <h2 className="text-2xl font-bold text-center mb-8">Add Your Child</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/** Input fields are simplified with reusable style variables */}
          <div className="mb-4">
            <label htmlFor="name" className={labelStyle}>
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              className={inputStyle}
            />
            {errors.name && (
              <p className={errorStyle}>{errors.name.message as any}</p>
            )}
          </div>
          <div className="mb-4">
            {/* <label htmlFor="type" className={labelStyle}>
              User Type
            </label> */}
            {/* <select
              id="type"
              {...register("type", { required: "User type is required" })}
              className={inputStyle}
            >
              {/* <option value="student">Student</option>
              <option value="instructor">Instructor</option> */}
            {/* <option value="parent">Parent</option>
            </select> */}

            {/* {errors.type && (
              <p className={errorStyle}>{errors.type.message as string}</p>
            )} */}
          </div>
          {/* <div className="mb-4">
            <label htmlFor="avatar" className={labelStyle}>
              Avatar URL
            </label>
            <input
              type="text"
              id="avatar"
              {...register("avatar", { required: "Avatar URL is required" })}
              className={inputStyle}
            />
            {errors.avatar && (
              <p className={errorStyle}>{errors.avatar.message as string}</p>
            )}
          </div> */}
          <div className="mb-4">
            <label htmlFor="email" className={labelStyle}>
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              })}
              className={inputStyle}
            />
            {errors.email && (
              <p className={errorStyle}>{errors.email.message as any}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className={labelStyle}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: 6,
                })}
                className={inputStyle}
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className={errorStyle}>{errors.password.message as any}</p>
            )}
          </div>
          <div className="flex items-center justify-between flex-col space-y-4">
            <button type="submit" className={buttonStyle} disabled={isLoading}>
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
            {isError && <p className={errorStyle}>{"Failed to sign up"}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentPage;
