"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { authKey } from "@/constants/storageKey";
import { isLoggedIn, removeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  const handleLogout = () => {
    removeUserInfo(authKey);
    setLoggedIn(false);
    router.push("/");
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Link href={"/"}>
          <Image
            src="https://codecombat.com/images/pages/base/logo.webp"
            alt="Logo"
            width={150}
            height={150}
          />
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex space-x-4">
          <div>
            <button className="text-gray-600">Instructors</button>
          </div>
          <a href="#" className="text-gray-600">
            Parents
          </a>
        </div>
        {loggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        ) : (
          <>
            <Link href="/login" className="text-gray-600">
              Login
            </Link>
            <button className="bg-purple-500 text-white px-4 py-2 rounded">
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
