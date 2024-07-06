"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { authKey } from "@/constants/storageKey";
import {
  getUserInfo,
  isLoggedIn,
  removeUserInfo,
} from "@/services/auth.service";
import { useRouter } from "next/navigation";
import algonautsLog from "../../../public/navbar/logo.png";
import { tailwindButtonClass } from "@/stylesShared/tailwindButtonClass";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedInStatus = isLoggedIn();
      setLoggedIn(loggedInStatus);
      if (loggedInStatus) {
        const user = getUserInfo() as any;
        setUserType(user?.type);
      }
    };

    checkLoginStatus();
    window.addEventListener("auth-login", checkLoginStatus);
    window.addEventListener("auth-logout", checkLoginStatus);

    return () => {
      window.removeEventListener("auth-login", checkLoginStatus);
      window.removeEventListener("auth-logout", checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    removeUserInfo(authKey);
    setLoggedIn(false);
    router.push("/");
  };

  const user = getUserInfo() as any;
  console.log(user);

  return (
    <nav className="bg-gradient-to-b from-[#a4e1e6] to-transparent text-black p-4 flex justify-between items-center ">
      <div className="flex items-center">
        <Link href={"/"}>
          <Image src={algonautsLog} alt="Logo" width={150} height={150} />
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {!loggedIn && (
          <div className="hidden md:flex space-x-4">
            <Link href="/instructor" className="text-black">
              Instructor
            </Link>
            <Link href="/parent" className="text-black">
              Parents
            </Link>
            <Link href="/student" className="text-black">
              Students
            </Link>
          </div>
        )}
        {loggedIn && (
          <>
            {userType === "parent" ? (
              <Link href="/parent" className="text-black">
                Home
              </Link>
            ) : userType === "student" ? (
              <>
                <Link href="/student" className="text-black">
                  Home
                </Link>
                <Link href="/student/profile" className="text-black">
                  Profile
                </Link>
                <Link href="/student/syllabus" className="text-black">
                  Syllabus
                </Link>
              </>
            ) : userType === "instructor" ? (
              <>
                <Link href="/instructor" className="text-black">
                  Home
                </Link>
                <Link href="/instructor/dataAnalysis" className="text-black">
                  Data Analysis
                </Link>
              </>
            ) : null}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        )}
        {!loggedIn && (
          <>
            <Link href="/login" className={`${tailwindButtonClass}`}>
              Login
            </Link>
            <Link href={"/signup/parentSignup"}>
              <button className={`${tailwindButtonClass}`}>Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
