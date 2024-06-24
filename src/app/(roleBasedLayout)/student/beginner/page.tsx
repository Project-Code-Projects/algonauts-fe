"use client";
import SpinAnimation from "@/components/ui/SpinAnimation";
import {
    useGetBeginnerLevelQuery
} from "@/redux/api/beginnerLevelApi";
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

const BeginneLevelPage = () => {
    const {
        data: beginnerLevelData,
        isLoading,
        isError,
    } = useGetBeginnerLevelQuery({});

    //   level list 
    // create exercise -> beginner-level-table
    // each item <link href=/beginner/{levlel-id}

    console.log(beginnerLevelData);
    const advancedSection = beginnerLevelData?.data.find(
        (section: ISection) => section.name === "advanced"
    );
    const advancedSectionId = advancedSection ? advancedSection._id : null;

    //   const {
    //     data: getAllChaptersFromBE,
    //     isLoading: ChaptersLoading,
    //     isError: ChaptersLoadingError,
    //   } = useGetSectionByIdQuery(advancedSectionId);

    if (isLoading) return <SpinAnimation />;
    if (isError)
        return <div className={styles.errorMessage}>Error loading data</div>;

    return (
        <>
        <div className="flex justify-center h-screen bg-black">
            <div className="flex justify-start p-2">
                {beginnerLevelData?.data?.map((data: any) => {
                    return (
                        <div className="flex flex-col items-center mr-2">
                            <div className="">
                                <div className="flex flex-col items-center"><div className="text-white">Level: {data?.level}</div></div>
                            </div>
                            <button className=" bg-blue-500 text-white">
                                <Link href={`beginner/${data?.level}`} >
                                    Start Playing
                                </Link>
                            </button>
                        </div>
                    )
                }
                )}
            </div>
            </div>
        </>
    );
};

export default BeginneLevelPage;
