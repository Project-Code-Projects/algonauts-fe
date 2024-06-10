import Link from "next/link";
import React from "react";

const SignUpOptions = () => {
  return (
    <div className="bg-blue-100 h-[92vh] flex flex-col items-center justify-center ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Educator Card */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <img
            src="https://codecombat.com/images/pages/account/create/educator.png"
            alt="Educator"
            className="w-full h-40 object-cover rounded-md"
          />
          <h3 className="text-xl font-semibold mt-4">
            Teach Computer Science with CodeCombat
          </h3>
          <button className="mt-4 bg-teal-500 text-white py-2 px-4 rounded-lg">
            I&apos;m an Educator
          </button>
        </div>
        {/* Parent Card */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <img
            src="https://codecombat.com/images/pages/account/create/parent.png"
            alt="Parent"
            className="w-full h-40 object-cover rounded-md"
          />
          <h3 className="text-xl font-semibold mt-4">
            Explore our live online coding classes
          </h3>
          <Link href={`/signup/parentSignup`}>
            <button className="mt-4 bg-teal-500 text-white py-2 px-4 rounded-lg">
              I&apos;m a Parent
            </button>
          </Link>
        </div>
        {/* Student Card */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <img
            src="https://codecombat.com/images/pages/account/create/student.png"
            alt="Student"
            className="w-full h-40 object-cover rounded-md"
          />
          <h3 className="text-xl font-semibold mt-4">
            Learn Computer Science with your class
          </h3>
          <button className="mt-4 bg-teal-500 text-white py-2 px-4 rounded-lg">
            I&apos;m a Student
          </button>
        </div>
        {/* Individual Card */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <img
            src="https://codecombat.com/images/pages/account/create/individual.png"
            alt="Individual"
            className="w-full h-40 object-cover rounded-md"
          />
          <h3 className="text-xl font-semibold mt-4">
            Play at home outside of a class setting
          </h3>
          <button className="mt-4 bg-teal-500 text-white py-2 px-4 rounded-lg">
            I&apos;m an Individual
          </button>
        </div>
      </div>
      <p className="mt-6 text-sm">
        Already have an account?{" "}
        <a href="/login" className="text-teal-500">
          Sign in
        </a>
      </p>
    </div>
  );
};

export default SignUpOptions;
