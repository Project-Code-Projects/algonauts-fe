import Image from "next/image";
import React from "react";

const Homepage = () => {
  return (
    <div className="bg-blue-100 h-[80vh] flex px-20 items-center justify-center">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Learn to Code Through the Power of Play
          </h1>
          <div className="space-y-4 flex flex-col w-72">
            <button className="bg-yellow-500 text-gray-800 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-yellow-600">
              I&apos;m an Instructor
            </button>
            <button className="bg-yellow-500 text-gray-800 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-yellow-600">
              I&apos;m a Parent
            </button>
            <button className="bg-yellow-500 text-gray-800 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-yellow-600">
              I&apos;m a Student
            </button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center md:justify-end mt-12 md:mt-0">
          <Image
            src="https://codecombat.com/images/pages/home-v2/codecombat-classroom.webp"
            alt="Character"
            width={550}
            height={550}
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
