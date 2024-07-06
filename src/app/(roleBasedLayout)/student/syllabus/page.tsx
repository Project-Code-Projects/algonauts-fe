"use client";
import Link from "next/link";
import Lottie from "lottie-react";
import chapterAnimation from "../../../../../public/chapter/pcAnimation.json";
import astroBoy from "../../../../../public/chapter/astroBoy.json";

const SyllabusPage = () => {
  return (
    <div className="p-4 flex flex-col lg:flex-row justify-evenly items-center">
      <div className="w-full ">
        <Lottie animationData={chapterAnimation} loop={true} />
      </div>
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 gap-12 mt-12 lg:mt-0">
        <h1 className="text-center my-12 text-3xl">Select your section</h1>
        <Link href={"/student/beginner"}>
          <div className="card p-6 rounded-lg cursor-pointer glassmorphism w-80">
            <h2 className="text-xl font-bold mb-2">Beginner</h2>
            <p>Start your learning journey here.</p>
          </div>
        </Link>
        <Link href={"/student/advanced"}>
          <div className="card p-6 rounded-lg cursor-pointer glassmorphism w-80">
            <h2 className="text-xl font-bold mb-2">Advanced</h2>
            <p>Take your skills to the next level.</p>
          </div>
        </Link>
        <Link href={"/student/experienced"}>
          <div className="card p-6 rounded-lg cursor-pointer glassmorphism w-80">
            <h2 className="text-xl font-bold mb-2">Experienced</h2>
            <p>Become a master in your field.</p>
          </div>
        </Link>
      </div>
      <div className="w-full ">
        <Lottie animationData={astroBoy} loop={true} />
      </div>
    </div>
  );
};

export default SyllabusPage;
