"use client";
import Link from "next/link";
import Lottie from "lottie-react";
import chapterAnimation from "../../../../../public/chapter/pcAnimation.json";
import astroBoy from "../../../../../public/chapter/astroBoy.json";

const SyllabusPage = () => {
  return (
    <div className="p-4 flex justify-evenly items-center">
      <div className="w-1/2">
        <Lottie animationData={chapterAnimation} loop={true} />
      </div>
      <div className="flex flex-col  justify-center items-center  w-full gap-12 mt-12 space-x-8">
        <h1 className="text-center my-12 text-3xl">Select your section </h1>
        <Link href={"/student/beginner"}>
          <div className="card bg-gray-100 p-6 rounded-lg shadow-md hover:bg-gray-200 cursor-pointer">
            <h2 className="text-xl font-bold mb-2">Beginner</h2>
            <p>Start your learning journey here.</p>
          </div>
        </Link>
        <Link href={"/student/advanced"}>
          <div className="card bg-gray-100 p-6 rounded-lg shadow-md hover:bg-gray-200 cursor-pointer">
            <h2 className="text-xl font-bold mb-2">Advanced</h2>
            <p>Take your skills to the next level.</p>
          </div>
        </Link>
        <Link href={"/student/experienced"}>
          <div className="card bg-gray-100 p-6 rounded-lg shadow-md hover:bg-gray-200 cursor-pointer">
            <h2 className="text-xl font-bold mb-2">Experienced</h2>
            <p>Become a master in your field.</p>
          </div>
        </Link>
      </div>
      <div className="w-1/2">
        <Lottie animationData={astroBoy} loop={true} />
      </div>
    </div>
  );
};

export default SyllabusPage;
