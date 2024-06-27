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
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Link href={"/"}>
          <Image src={algonautsLog} alt="Logo" width={150} height={150} />
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {!loggedIn && (
          <div className="hidden md:flex space-x-4">
            <Link href="/instructor" className="text-gray-600">
              Instructor
            </Link>
            <Link href="/parent" className="text-gray-600">
              Parents
            </Link>
            <Link href="/student" className="text-gray-600">
              Students
            </Link>
          </div>
        )}
        {loggedIn && (
          <>
            {userType === "parent" ? (
              <Link href="/parent" className="text-gray-600">
                Home
              </Link>
            ) : userType === "student" ? (
              <>
                <Link href="/student" className="text-gray-600">
                  Home
                </Link>
                <Link href="/student/profile" className="text-gray-600">
                  Profile
                </Link>
                <Link href="/student/syllabus" className="text-gray-600">
                  Syllabus
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
            <Link href="/login" className="text-gray-600">
              Login
            </Link>
            <Link href={"/signup"}>
              <button className="bg-purple-500 text-white px-4 py-2 rounded">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
