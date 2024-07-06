"use client";
import astroBoy from "../../../../public/chapter/astroBoy.json";
import Lottie from "lottie-react";
import Link from "next/link";
import TypeWriterEffect from "react-typewriter-effect";

const Hero = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
            <TypeWriterEffect
              textStyle={{
                fontWeight: 700,
                fontSize: "inherit",
              }}
              startDelay={100}
              cursorColor="#3F3D56"
              multiText={[
                "Learn to Code",
                "Through the Power of Play",
                "Discover the Magic of Coding",
                "Unlock Your Creative Potential",
                "Transform Ideas into Code",
                "Master Programming with Fun",
                "Build Your Future in Tech",
              ]}
              multiTextDelay={1000}
              typeSpeed={100}
              loop={true}
            />
          </h1>
          <div className="space-y-4 max-w-sm mx-auto md:mx-0">
            <Link href="/login" passHref>
              <div className="mb-4">
                <button className="w-full bg-yellow-500 text-gray-800 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-yellow-600 transition duration-300">
                  I&apos;m an Instructor
                </button>
              </div>
            </Link>
            <Link href="/login" passHref>
              <div className="mb-4">
                <button className="w-full bg-yellow-500 text-gray-800 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-yellow-600 transition duration-300">
                  I&apos;m a Parent
                </button>
              </div>
            </Link>
            <Link href="/login" passHref>
              <div className="mb-4">
                <button className="w-full bg-yellow-500 text-gray-800 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-yellow-600 transition duration-300">
                  I&apos;m a Student
                </button>
              </div>
            </Link>
          </div>
        </div>
        <div className="md:w-1/2">
          <Lottie animationData={astroBoy} loop={true} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
