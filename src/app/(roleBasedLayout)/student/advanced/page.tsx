"use client";
import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import ProblemCard from "@/components/codeEditor/ProblemCard";
import { toast, Toaster } from "react-hot-toast";
import TestCaseTabs from "@/components/codeEditor/TestCaseTabs";

type TestCase = {
  nums: number[];
  target?: number;
  expected: number[];
};

const AdvancedPage: React.FC = () => {
  const solutionCode = `function sol (nums, target) {

}`;

  const [code, setCode] = useState<string>(solutionCode);
  const [results, setResults] = useState<string[]>([]);
  const testCases = {
    case1: { nums: [2, 7, 11, 15], target: 9, expected: [0, 1] },
    case2: { nums: [3, 2, 4], target: 6, expected: [1, 2] },
    case3: { nums: [3, 3], target: 6, expected: [0, 1] },
  };

  // const testCases: { [key: string]: TestCase } = {
  //   case1: {
  //     nums: [73, 74, 75, 71, 69, 72, 76, 73],
  //     expected: [1, 1, 4, 2, 1, 1, 0, 0],
  //   },
  //   case2: {
  //     nums: [30, 40, 50, 60],
  //     expected: [1, 1, 1, 0],
  //   },
  // };

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

  /*
 const hashMap = new Map();
  
  for (let index = 0; index < nums.length; index++) {
    const num = nums[index];
    const complement = target - num;
    
    if (hashMap.has(complement)) {
      return [hashMap.get(complement), index];
    }
    
    hashMap.set(num, index);
  }
  
  return [];

*/

  // !See below for explanation of this code
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

  const title = "Two Sum";
  const description =
    "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.";
  const examples = [
    {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
    {
      input: "nums = [4,3,5,15], target = 9",
      output: "[0,2]",
    },
  ];

  const constraints = [
    "2 ≤ nums.length ≤ 10^4",
    "-10^9 ≤ nums[i] ≤ 10^9",
    "-10^9 ≤ target ≤ 10^9",
    "Only one valid answer exists.",
  ];

  const followUp =
    "Can you come up with an algorithm that is less than O(n2) time complexity?";

  return (
    <div className="flex overflow-hidden h-[92vh]">
      <Toaster />
      {/* Start of Problem */}
      <div className="w-1/4 overflow-y-auto h-screen p-4">
        <ProblemCard
          title={title}
          description={description}
          examples={examples}
          constraints={constraints}
          followUp={followUp}
        />
      </div>
      {/* End of Problem */}
      {/* Start of Code Editor */}
      <div className="w-2/4 p-4">
        <h2 className="text-xl font-semibold">Code Here:</h2>

        <Editor
          height="50vh"
          defaultLanguage="javascript"
          defaultValue={code}
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
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
      {/* End of Code Editor */}
      <div className="w-1/4 mt-6">
        <h1>Output</h1>
        <div className="h-[50vh] bg-white mb-4 p-4 overflow-auto">
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

/*
┌────────────────────────┐
│       Start            │
└─────────┬─────────────┘
          │
          ∨
┌─────────────────────────────┐
│ Render the AdvancedPage      │
│ component with initial state │
└─────────────┬─────────────────┘
              │
              ∨
┌─────────────────────────────────────┐
│ Display the problem description,    │
│ examples, constraints, and follow-up│
└─────────────────┬─────────────────┘
                  │
                  ∨
┌─────────────────────────────┐
│ Render the code editor with │
│ the initial solution code   │
└─────────────┬─────────────┘
              │
              ∨
┌─────────────────────────────┐
│ User modifies the code in   │
│ the code editor             │
└─────────────┬─────────────┘
              │
              ∨
┌─────────────────────────────┐
│ User clicks the "Submit"    │
│ button                      │
└─────────────┬─────────────┘
              │
              ∨
┌─────────────────────────────┐
│ runCode function is called  │
└─────────────┬─────────────┘
              │
              ∨
┌─────────────────────────────┐
│ Code is evaluated against   │
│ test cases                  │
└─────────────┬─────────────┘
              │
              ∨
┌─────────────────────────────┐
│ Results are displayed in    │
│ the output section          │
└─────────────┬─────────────┘
              │
              ∨
┌─────────────────────────────┐
│ Success/Error toast message │
│ is shown                    │
└─────────────────────────────┘
*/

/*

┌───────────────────┐
│     runCode       │
└───────────┬───────┘
            │
            ∨
┌───────────────────┐
│ Create new        │
│ Function from code│
└───────────┬───────┘
            │
            ∨
┌───────────────────┐
│ Initialize empty  │
│ results array     │
└───────────┬───────┘
            │
            ∨
┌───────────────────┐
│ Loop through      │
│ test cases        │
└───────────┬───────┘
            │
            ∨
┌───────────────────┐
│ Run user's        │
│ function with     │
│ test case inputs  │
└───────────┬───────┘
            │
            ∨
┌───────────────────┐
│ Compare output    │
│ with expected     │
│ using arraysEqual │
└───────────┬───────┘
            │
            ∨
┌───────────────────┐
│ Store test result │
│ in results array  │
└───────────┬───────┘
            │
            ∨
┌───────────────────┐
│ Check if all      │
│ tests passed      │
└───────────┬───────┘
            │
   ┌─────────┴───────┐
   ∨                 ∨
┌───────────┐ ┌───────────┐
│ Show      │ │ Show      │
│ success   │ │ error     │
│ toast     │ │ toast     │
└───────────┘ └───────────┘

Function:runCode

There is a code in the editor. So firstly, the code after you press the submit button
will run this: runCode

Then, func --> this will create a new function and run that code from the editor. 

This for...of loop iterates over the entries of the testCases object 
using Object.entries(testCases).

Object.entries(testCases) converts the testCases object
into an array of key-value pairs, where each pair is an array of [key, value].

key is 'case1'
testCase is { nums: [2, 7, 11, 15], target: 9, expected: [0, 1] }

  const output = func(testCase.nums, testCase.target)--->
this will run the function taking the parameters from (test case's num and test.case
target)
Then your output will be checked here: arraysEqual(output, testCase.expected)
There is a turnary operator. So if the result is true/equal then test cases will
pass. 
Then the result state will be updated. 


*/
