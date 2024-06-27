import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface ExerciseProgressPieChartProps {
  totalExercises: number;
  numberOfExercisesDone: number;
}

const ExerciseProgressPieChart: React.FC<ExerciseProgressPieChartProps> = ({
  totalExercises,
  numberOfExercisesDone,
}) => {
  const percentageDone = Math.round(
    (numberOfExercisesDone / totalExercises) * 100
  );
  const data = [
    { name: "Done", value: numberOfExercisesDone },
    { name: "Remaining", value: totalExercises - numberOfExercisesDone },
  ];
  const COLORS = ["#0088FE", "#FF8042"];

  return (
    <div className="my-12 flex flex-col justify-center items-center">
      <ResponsiveContainer width={300} height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="progress-label"
          >
            {`${percentageDone}% Complete`}
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExerciseProgressPieChart;
