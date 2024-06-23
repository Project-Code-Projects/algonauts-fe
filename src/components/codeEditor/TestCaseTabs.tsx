import React, { useState } from "react";

interface TestCase {
  input: any;
  target?: any;
  expected: any;
}

interface TestCases {
  [key: string]: TestCase;
}

interface TestCaseTabsProps {
  testCases: TestCases;
}

const TestCaseTabs: React.FC<TestCaseTabsProps> = ({ testCases }) => {
  const [activeTab, setActiveTab] = useState(Object.keys(testCases)[0]);

  const formatValue = (value: any): string => {
    if (typeof value === "object" && value !== null) {
      return JSON.stringify(value);
    }
    return String(value);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Test Cases</h2>
      <div className="mb-4">
        {Object.keys(testCases).map((key) => (
          <button
            key={key}
            className={`px-4 py-2 mr-2 ${
              activeTab === key ? "bg-blue-500 text-white" : "bg-gray-200"
            } rounded`}
            onClick={() => setActiveTab(key)}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>
      <div className="bg-gray-100 p-4 rounded">
        <h3 className="text-lg font-bold">{activeTab}</h3>
        <p>Input: {formatValue(testCases[activeTab].input)}</p>
        {testCases[activeTab].target !== undefined && (
          <p>Target: {formatValue(testCases[activeTab].target)}</p>
        )}
        <p>Expected: {formatValue(testCases[activeTab].expected)}</p>
      </div>
    </div>
  );
};

export default TestCaseTabs;
