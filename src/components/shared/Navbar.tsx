import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
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
          <div className="">
            <button className="text-gray-600">Instructors</button>
          </div>
          <a href="#" className="text-gray-600">
            Parents
          </a>
        </div>
        <Link href="/login" className="text-gray-600">
          Login
        </Link>
        <button className="bg-purple-500 text-white px-4 py-2 rounded">
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
