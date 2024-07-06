import React from "react";

interface Example {
  input: string;
  output: string;
  explanation?: string;
}

interface ProblemCardProps {
  title: string;
  description: string;
  examples: Example[];
  constraints?: string[];
  followUp?: string;
}

const ProblemCard: React.FC<ProblemCardProps> = ({
  title,
  description,
  examples,
  constraints,
  followUp,
}) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <p className="mb-6 text-lg">{description}</p>

      {examples.map((example, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Example {index + 1}:</h2>
          <div className="bg-green-100 p-4 rounded">
            <p>
              <strong>Input:</strong> {example.input}
            </p>
            <p>
              <strong>Output:</strong> {example.output}
            </p>
            <p>
              <strong>Explanation:</strong> {example.explanation}
            </p>
          </div>
        </div>
      ))}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Constraints:</h2>
        <ul className="list-disc list-inside bg-green-100 p-4 rounded">
          {constraints?.map((constraint, index) => (
            <li key={index}>{constraint}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Follow-up:</h2>
        <p>{followUp}</p>
      </div>
    </div>
  );
};

export default ProblemCard;
