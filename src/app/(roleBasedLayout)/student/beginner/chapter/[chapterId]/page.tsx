"use client";
import { useGetBeginnerLevelQuery } from "@/redux/api/beginnerLevelApi";
import { useGetChapterByIdQuery } from "@/redux/api/chaptersApi";
import Link from "next/link";
import React from "react";

const styles = {
  container: "p-8  min-h-screen",
  title: "text-3xl font-bold text-center mb-8",
  list: "space-y-4",
  listItem: "bg-white p-6 rounded-lg shadow-md hover:bg-gray-100",
  link: "text-lg font-semibold text-blue-600 hover:underline",
  errorMessage: "text-red-600 font-semibold text-center",
};

import SpinAnimation from "@/components/ui/SpinAnimation";

type IParams = {
  chapterId: string;
};

const ProblemsByChapterPage = ({ params }: { params: IParams }) => {
  const { chapterId } = params;
  // const { data, error, isLoading } = useGetChapterByIdQuery(chapterId);

  const {
    data: beginnerLevelData,
    isLoading: isLevelLoading,
    isError,
  } = useGetBeginnerLevelQuery({ chapterId: chapterId });

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error fetching data</div>;

  if (isLevelLoading) return <SpinAnimation />;
  if (isError)
    return <div className={styles.errorMessage}>Error loading data</div>;

  // const { chapter, exercises } = data.data;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Beginner Problem List</h1>
      <ul className={styles.list}>
        {beginnerLevelData?.data?.map((data: any) => (
          <li key={data._id} className={styles.listItem}>
            <Link href={`/student/beginner/${data.level}`}>
              <p className={styles.link}>{data.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProblemsByChapterPage;
