"use client";
import {
  useGetExercisesByChapterIdAndStudentIdAndIndexedQuery,
  useGetExercisesByChapterIdQuery,
} from "@/redux/api/exerciseApi";
import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";
import React from "react";

const styles = {
  container: "p-8 bg-gray-100 min-h-screen",
  title: "text-3xl font-bold text-center mb-8",
  list: "space-y-4",
  listItem: "bg-white p-6 rounded-lg shadow-md",
  listItemDisabled: "bg-white p-6 rounded-lg shadow-md opacity-50",
  link: "text-lg font-semibold text-blue-600 hover:underline",
  linkDisabled: "text-lg font-semibold text-gray-400",
};

type IParams = {
  chapterId: string;
};

const ProblemsByChapterPage = ({ params }: { params: IParams }) => {
  const { chapterId } = params;
  const { studentId } = getUserInfo() as any;
  console.log("studentid", studentId);

  const {
    data: ExercisesResponse,
    error,
    isLoading,
  } = useGetExercisesByChapterIdQuery(chapterId);
  const {
    data: indexResponse,
    error: indexError,
    isLoading: indexLoading,
  } = useGetExercisesByChapterIdAndStudentIdAndIndexedQuery({
    studentId,
    chapterId,
  });

  const neededIndex = indexResponse?.data;

  if (isLoading || indexLoading) return <div>Loading...</div>;
  if (error || indexError) return <div>Error fetching data</div>;
  const exercises = ExercisesResponse?.data;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Advanced Problem List</h1>
      <ul className={styles.list}>
        {exercises.map((exercise: any) => (
          <li
            key={exercise._id}
            className={
              exercise.index <= neededIndex
                ? styles.listItem
                : styles.listItemDisabled
            }
          >
            {exercise.index <= neededIndex ? (
              <Link href={`/student/advanced/exercises/${exercise._id}`}>
                <p className={styles.link}>{exercise.name}</p>
              </Link>
            ) : (
              <p className={styles.linkDisabled}>{exercise.name}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProblemsByChapterPage;
