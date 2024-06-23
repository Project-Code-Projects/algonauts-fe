"use client";
import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import Editor from "@monaco-editor/react";
import { useGetEditorLevelByExerciseIdQuery } from "@/redux/api/editorLevelApi";
import ProblemCard from "@/components/codeEditor/ProblemCard";
import TestCaseTabs from "@/components/codeEditor/TestCaseTabs";

type IParams = {
  exercises: string;
};

type ITestCase = {
  input: any;
  expected: any;
  target?: any;
};

const ExercisePage = ({ params }: { params: IParams }) => {
  const { exercises: exerciseId } = params;
  const {
    data: EditorLevelDataFromBE,
    error,
    isLoading,
  } = useGetEditorLevelByExerciseIdQuery(exerciseId);

  const [code, setCode] = useState<string>("");
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    if (EditorLevelDataFromBE?.data[0]) {
      setCode(EditorLevelDataFromBE.data[0].functionPlaceholder);
    }
  }, [EditorLevelDataFromBE]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading data</div>;
  }

  const problemData = EditorLevelDataFromBE?.data[0];
  console.log("preblemData", problemData);

  if (!problemData) {
    return <div>No data found</div>;
  }

  const testCases = problemData.testCases;

  const handleCodeChange = (value: any) => {
    setCode(value);
  };

  const arraysEqual = (a: any, b: any): boolean => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
      if (Array.isArray(a[i]) && Array.isArray(b[i])) {
        if (!arraysEqual(a[i], b[i])) return false;
      } else if (typeof a[i] === "object" && typeof b[i] === "object") {
        if (JSON.stringify(a[i]) !== JSON.stringify(b[i])) return false;
      } else if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  };
  const runCode = () => {
    try {
      const func = new Function(`return (${code})`)();
      const newResults: string[] = [];
      for (const [key, testCase] of Object.entries(testCases)) {
        let { input, target, expected } = testCase as ITestCase;

        let output;
        if (target !== undefined) {
          output = func(input, target);
        } else {
          output = func(input);
        }

        let result;
        if (Array.isArray(expected)) {
          result = arraysEqual(output, expected)
            ? `Test ${key} passed!`
            : `Test ${key} failed: Output: ${JSON.stringify(
                output
              )} (Expected: ${JSON.stringify(expected)})`;
        } else if (typeof expected === "object" && expected !== null) {
          result =
            JSON.stringify(output) === JSON.stringify(expected)
              ? `Test ${key} passed!`
              : `Test ${key} failed: Output: ${JSON.stringify(
                  output
                )} (Expected: ${JSON.stringify(expected)})`;
        } else {
          result =
            output === expected
              ? `Test ${key} passed!`
              : `Test ${key} failed: Output: ${output} (Expected: ${expected})`;
        }

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
    problemData.problem || {};

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

export default ExercisePage;
