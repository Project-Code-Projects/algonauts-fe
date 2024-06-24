/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
import Editor from "@monaco-editor/react";
import { useGetEditorLevelByExerciseIdQuery } from "@/redux/api/editorLevelApi";
import ProblemCard from "@/components/codeEditor/ProblemCard";
import TestCaseTabs from "@/components/codeEditor/TestCaseTabs";
import usePreventCheat from "@/hooks/usePreventCheat";
import { getUserInfo } from "@/services/auth.service";
import { useAddExerciseLogMutation } from "@/redux/api/exerciseLogApi";

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
  const [
    addExerciseLog,
    {
      isLoading: addExerciseLogLoading,
      isSuccess: addExerciseLogSuccess,
      isError: addExerciseLogError,
    },
  ] = useAddExerciseLogMutation();

  const [code, setCode] = useState<string>("");
  const [results, setResults] = useState<string[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [completionTime, setCompletionTime] = useState<number | null>(null);
  const [status, setStatus] = useState<boolean | null>(false);
  const logCreated = useRef(false);

  const { studentId } = getUserInfo() as any;

  useEffect(() => {
    const isAllTestCassesPassed =
      results.length > 0 &&
      results.every((result) => result.includes("passed"));
    // console.log(isAllTestCassesPassed);
    setIsButtonDisabled(!isAllTestCassesPassed);
    // console.log(isAllTestCassesPassed);
  }, [results]);

  const switchTabCount = usePreventCheat();
  // console.log("I am tab count", switchTabCount);

  useEffect(() => {
    if (EditorLevelDataFromBE?.data[0]) {
      setCode(EditorLevelDataFromBE.data[0].functionPlaceholder);
    }
  }, [EditorLevelDataFromBE]);

  useEffect(() => {
    if (logCreated.current) return;

    const start = Date.now();
    setStartTime(start);
    const currentEndTime = Date.now();
    const timeSpent = startTime ? (currentEndTime - startTime) / 1000 / 60 : 0;
    const exerciseLogData = {
      exerciseId,
      studentId,
      startTime: start,
      endTime: currentEndTime,
      completionTime: timeSpent,
      switchTabCount,
      status: false,
    };
    addExerciseLog(exerciseLogData);

    logCreated.current = true;
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading data</div>;
  }

  const problemData = EditorLevelDataFromBE?.data[0];

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

  const handleSubmit = async () => {
    const currentEndTime = Date.now();
    setEndTime(currentEndTime);

    if (startTime) {
      const timeSpent = (currentEndTime - startTime) / 1000 / 60; // duration in minutes
      console.log(`Time spent solving: ${timeSpent.toFixed(2)} minutes`);
      setCompletionTime(timeSpent);
      setStatus(true);

      const exerciseLogData = {
        exerciseId,
        studentId,
        startTime,
        endTime: currentEndTime,
        completionTime: timeSpent,
        switchTabCount,
        status: true,
      };

      try {
        await addExerciseLog(exerciseLogData);
        if (addExerciseLogSuccess) {
          toast.success("Successfully submitted");
        }
      } catch (error) {
        toast.error("Failed to log exercise");
      }
    } else {
      toast.error("Start time is not defined");
    }
  };

  const { title, description, examples, constraints, followUp } =
    problemData.problem || {};

  // const dummyData = {
  //   exerciseId,
  //   studentId,
  //   startTime,
  //   endTime,
  //   completionTime,
  //   switchTabCount,
  //   status,
  // };

  // console.log("I am dummyData", dummyData);

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
            contextmenu: false, // Disable right-click menu
            copyWithSyntaxHighlighting: false, // Disable copy with syntax highlighting
          }}
          // onMount={(editor, monaco) => {
          //   // Disable copy-paste in the editor
          //   editor.addCommand(
          //     monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyC,
          //     () => {}
          //   );
          //   editor.addCommand(
          //     monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyV,
          //     () => {}
          //   );
          //   editor.addCommand(
          //     monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyX,
          //     () => {}
          //   );
          // }}
        />
        <div className="flex items-center justify-between">
          <button
            onClick={runCode}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Run Code
          </button>

          <button
            onClick={handleSubmit}
            disabled={isButtonDisabled}
            className={`mt-4 mr-8 px-4 py-2 rounded ${
              isButtonDisabled
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-700"
            }`}
          >
            Submit
          </button>
        </div>
      </div>
      <div className="w-1/4 mt-4">
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
