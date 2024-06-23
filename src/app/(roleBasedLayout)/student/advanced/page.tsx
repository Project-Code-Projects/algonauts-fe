"use client";
import SpinAnimation from "@/components/ui/SpinAnimation";
import {
  useGetAllSectionsQuery,
  useGetSectionByIdQuery,
} from "@/redux/api/sectionApi";
import Link from "next/link";
import React from "react";

interface IChapter {
  _id: string;
  name: string;
  description: string;
  sectionId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ISection {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  chapters: IChapter[];
}

const styles = {
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12",
  title: "text-3xl font-bold text-gray-900 mb-8",
  chaptersContainer: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
  chapterCard:
    "bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300",
  chapterTitle: "text-xl font-semibold text-gray-800 mb-2",
  chapterDescription: "text-gray-600",
  errorMessage: "text-red-600 font-semibold text-center",
};

const AdvancedPage = () => {
  const {
    data: allSectionsData,
    isLoading,
    isError,
  } = useGetAllSectionsQuery([]);

  const advancedSection = allSectionsData?.data.find(
    (section: ISection) => section.name === "advanced"
  );
  const advancedSectionId = advancedSection ? advancedSection._id : null;

  const {
    data: getAllChaptersFromBE,
    isLoading: ChaptersLoading,
    isError: ChaptersLoadingError,
  } = useGetSectionByIdQuery(advancedSectionId);

  if (isLoading || ChaptersLoading) return <SpinAnimation />;
  if (isError || ChaptersLoadingError)
    return <div className={styles.errorMessage}>Error loading data</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Advanced Section</h1>
      <div className={styles.chaptersContainer}>
        {getAllChaptersFromBE?.data?.chapters?.map((chapter: IChapter) => (
          <Link
            href={`/student/advanced/${chapter._id}`}
            key={chapter._id}
            className={styles.chapterCard}
          >
            <h2 className={styles.chapterTitle}>
              {chapter.name.toUpperCase()}
            </h2>
            <p className={styles.chapterDescription}>{chapter.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdvancedPage;
