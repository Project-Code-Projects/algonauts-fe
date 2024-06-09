import Image from "next/image";
import React from "react";

const ParentProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 md:w-1/2 w-full">
        <div className="flex flex-col items-center">
          <Image
            src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Profile"
            className="rounded-full w-32 h-32 mb-4"
            width={200}
            height={200}
          />
          <h1 className="text-2xl font-bold mb-2">John Doe</h1>
          <p className="text-gray-600 mb-4">Software Engineer</p>
          <p className="text-center text-gray-600 mb-6">
            Passionate about technology and coding. Loves to build web
            applications and explore new frameworks.
          </p>
          <div className="w-full flex justify-around">
            <a
              href="mailto:johndoe@example.com"
              className="text-blue-500 hover:underline"
            >
              johndoe@example.com
            </a>
            <a
              href="https://www.linkedin.com/in/johndoe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentProfilePage;
