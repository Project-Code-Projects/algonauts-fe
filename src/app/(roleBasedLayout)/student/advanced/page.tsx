"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

type Example = {
  input: string;
  output: string;
  explanation?: string;
};

type Problem = {
  title: string;
  description: string;
  examples: Example[];
  constraints?: string[];
  followUp?: string;
};

type ProblemData = {
  _id: string;
  problem: Problem;
  functionPlaceholder: string;
  testCases: {
    [key: string]: any;
  };
};

const AdvancedMockData: ProblemData[] = [
  {
    _id: "60f1b2f9c9d75c0f8b3f9d1e",
    problem: {
      title: "Two Sum",
      description:
        "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      examples: [
        {
          input: "nums = [2,7,11,15], target = 9",
          output: "[0,1]",
          explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
        },
        {
          input: "nums = [4,3,5,15], target = 9",
          output: "[0,2]",
        },
      ],
      constraints: [
        "2 ≤ nums.length ≤ 10^4",
        "-10^9 ≤ nums[i] ≤ 10^9",
        "-10^9 ≤ target ≤ 10^9",
        "Only one valid answer exists.",
      ],
      followUp:
        "Can you come up with an algorithm that is less than O(n^2) time complexity?",
    },
    functionPlaceholder: "function sol(nums, target) {\n\n}",
    testCases: {
      case1: {
        nums: [2, 7, 11, 15],
        target: 9,
        expected: [0, 1],
      },
      case2: {
        nums: [4, 3, 5, 15],
        target: 9,
        expected: [0, 2],
      },
      case3: {
        nums: [1, 2, 3, 4],
        target: 5,
        expected: [1, 2],
      },
    },
  },
  {
    _id: "60f1b2f9c9d75c0f8b3f9d1f",
    problem: {
      title: "Maximum Subarray",
      description:
        "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
      examples: [
        {
          input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
          output: "6",
          explanation: "The subarray [4,-1,2,1] has the largest sum 6.",
        },
        {
          input: "nums = [1]",
          output: "1",
        },
      ],
      constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
      followUp:
        "Can you come up with a solution using only one loop and without any extra space?",
    },
    functionPlaceholder: "function sol(nums) {\n\n}",
    testCases: {
      case1: {
        nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
        expected: 6,
      },
      case2: {
        nums: [1],
        expected: 1,
      },
      case3: {
        nums: [-2, -1],
        expected: -1,
      },
    },
  },
  {
    _id: "60f1b2f9c9d75c0f8b3f9d20",
    problem: {
      title: "Palindrome Number",
      description:
        "Given an integer x, return true if x is a palindrome, and false otherwise.",
      examples: [
        {
          input: "x = 121",
          output: "true",
          explanation:
            "121 reads as 121 from left to right and from right to left.",
        },
        {
          input: "x = -121",
          output: "false",
          explanation:
            "From left to right, it reads -121. From right to left, it becomes 121-.",
        },
      ],
      constraints: ["-2^31 ≤ x ≤ 2^31 - 1"],
      followUp:
        "Could you solve it without converting the integer to a string?",
    },
    functionPlaceholder: "function sol(x) {\n\n}",
    testCases: {
      case1: {
        x: 121,
        expected: true,
      },
      case2: {
        x: -121,
        expected: false,
      },
      case3: {
        x: 10,
        expected: false,
      },
    },
  },
];

const AdvancedProblemList = () => {
  const [problems, setProblems] = useState<ProblemData[]>([]);

  useEffect(() => {
    setProblems(AdvancedMockData);
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">
        Advanced Problem List
      </h1>
      <ul className="space-y-4">
        {problems.map((problem) => (
          <li
            key={problem._id}
            className="bg-white p-6 rounded-lg shadow-md hover:bg-gray-100"
          >
            <Link href={`/student/advanced/${problem._id}`}>
              <p className="text-lg font-semibold text-blue-600 hover:underline">
                {problem.problem.title}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdvancedProblemList;
