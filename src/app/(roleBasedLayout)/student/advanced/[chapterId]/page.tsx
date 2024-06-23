"use client";
import { useGetChapterByIdQuery } from "@/redux/api/chaptersApi";
import Link from "next/link";
import React from "react";

const styles = {
  container: "p-8 bg-gray-100 min-h-screen",
  title: "text-3xl font-bold text-center mb-8",
  list: "space-y-4",
  listItem: "bg-white p-6 rounded-lg shadow-md hover:bg-gray-100",
  link: "text-lg font-semibold text-blue-600 hover:underline",
};

type IParams = {
  chapterId: string;
};

const ProblemsByChapterPage = ({ params }: { params: IParams }) => {
  const { chapterId } = params;
  const { data, error, isLoading } = useGetChapterByIdQuery(chapterId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  const { chapter, exercises } = data.data;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Advanced Problem List</h1>
      <ul className={styles.list}>
        {exercises.map((exercise: any) => (
          <li key={exercise._id} className={styles.listItem}>
            <Link href={`/student/advanced/exercises/${exercise._id}`}>
              <p className={styles.link}>{exercise.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProblemsByChapterPage;
