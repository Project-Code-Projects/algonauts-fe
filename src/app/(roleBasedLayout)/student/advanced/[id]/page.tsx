"use client";
import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import Editor from "@monaco-editor/react";
import ProblemCard from "@/components/codeEditor/ProblemCard";
import TestCaseTabs from "@/components/codeEditor/TestCaseTabs";

interface Params {
  id: string;
}

interface AdvancedPageProps {
  params: Params;
}

type TestCase = {
  nums: number[];
  target?: number;
  expected: number[];
};

const AdvancedPage: React.FC<AdvancedPageProps> = ({
  params,
}: {
  params: Params;
}) => {
  const { id: problem } = params;

  const [problemData, setProblemData] = useState<any>(null);
  const [code, setCode] = useState<string>("");
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    if (problem) {
      const fetchData = async () => {
        // Replace this with your actual data fetching logic
        const data = mockData.find((item) => item._id === problem);
        if (data) {
          setProblemData(data);
          setCode(data.functionPlaceholder);
        } else {
          toast.error("Problem not found");
        }
      };
      fetchData();
    }
  }, [problem]);

  if (!problemData) {
    return <div>Loading...</div>;
  }

  const testCases: { [key: string]: TestCase } = problemData.testCases;

  const handleCodeChange = (value: any) => {
    setCode(value);
  };

  const arraysEqual = (a: any, b: any) => {
    if (a.length === 0 && b.length === 0) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  };

  const runCode = () => {
    try {
      const func = new Function(`return (${code})`)();
      const newResults: string[] = [];
      for (const [key, testCase] of Object.entries(testCases)) {
        let output;
        if (testCase.target !== undefined) {
          output = func(testCase.nums, testCase.target);
        } else {
          output = func(testCase.nums);
        }
        const result = arraysEqual(output, testCase.expected)
          ? `Test ${key} passed!`
          : `Test ${key} failed: Output: ${JSON.stringify(
              output
            )} (Expected: ${JSON.stringify(testCase.expected)})`;

        newResults.push(result);
      }

      setResults(newResults);

      if (newResults.every((result) => result.includes("passed"))) {
        toast.success("All test cases passed!");
      } else {
        toast.error("Some test cases failed!");
      }
    } catch (error) {
      toast.error("Error in code execution!");
      setResults([`Error: ${(error as Error).message}`]);
    }
  };

  const { title, description, examples, constraints, followUp } =
    problemData.problem;

  return (
    <div className="flex overflow-hidden h-[92vh]">
      <Toaster />
      <div className="w-1/4 overflow-y-auto h-screen p-4">
        <ProblemCard
          title={title}
          description={description}
          examples={examples}
          constraints={constraints}
          followUp={followUp}
        />
      </div>
      <div className="w-2/4 p-4">
        <h2 className="text-xl font-semibold">Code Here:</h2>

        <Editor
          height="50vh"
          defaultLanguage="javascript"
          value={code}
          onChange={handleCodeChange}
          theme="light"
          options={{
            selectOnLineNumbers: true,
            roundedSelection: false,
            readOnly: false,
            cursorStyle: "line",
            automaticLayout: true,
          }}
        />

        <button
          onClick={runCode}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
      <div className="w-1/4 ">
        <h1 className="text-xl font-semibold mb-4">Output</h1>
        <div className="h-[50vh] bg-white mb-4 p-4 overflow-auto shadow-md rounded-lg">
          {results.map((result, index) => (
            <p key={index}>{result}</p>
          ))}
        </div>
        <TestCaseTabs testCases={testCases} />
      </div>
    </div>
  );
};

export default AdvancedPage;

const mockData = [
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

/*
Solution1:
function sol(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  
  return [];
}


Solution2:
function sol(nums) {
  let maxSoFar = nums[0];
  let maxEndingHere = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }
  
  return maxSoFar;
}

Solution 3:
function sol(x) {
  if (x < 0 || (x % 10 === 0 && x !== 0)) {
    return false;
  }
  
  let revertedNumber = 0;
  while (x > revertedNumber) {
    revertedNumber = revertedNumber * 10 + x % 10;
    x = Math.floor(x / 10);
  }
  
  return x === revertedNumber || x === Math.floor(revertedNumber / 10);
}
*/
