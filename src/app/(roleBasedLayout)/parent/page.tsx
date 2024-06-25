"use client";
import SpinAnimation from "@/components/ui/SpinAnimation";
import { useGetParentbyUserIdQuery } from "@/redux/api/parentApi";
import { useGetStudentByParentIdQuery } from "@/redux/api/studentApi";
import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";

const styles = {
  errorContainer: "flex items-center justify-center h-screen text-red-500",
  pageContainer:
    "min-h-screen flex flex-col items-center justify-center px-4 py-8",
  contentContainer: "max-w-3xl mx-auto bg-gray-200 rounded-lg shadow-lg p-8",
  title: "text-4xl font-bold mb-4 text-center",
  subtitle: "text-2xl font-bold mb-4 text-center",
  subsubtitle: "text-2xl font-bold mb-8 text-center",
  addChildButtonContainer: "mb-8 flex justify-center",
  addChildButton:
    "bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300",
  childrenListTitle: "text-lg font-semibold mb-4 text-center",
  studentCardContainer: "grid gap-4",
  studentCard:
    "bg-blue-100 p-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-105",
  studentName: "text-xl font-bold mb-2",
  studentInfo: "text-gray-600",
};

const ParentProfilePage = () => {
  const userInfo = getUserInfo();
  const parentId = userInfo?._id;

  const {
    data: parentDataFromBE,
    isLoading,
    isError,
  } = useGetParentbyUserIdQuery(parentId);

  const { data: studentsByParentId } = useGetStudentByParentIdQuery(parentId);

  if (isLoading) {
    return <SpinAnimation />;
  }

  if (isError || !parentDataFromBE) {
    return (
      <div className={styles.errorContainer}>
        Error occurred while fetching data.
      </div>
    );
  }

  const parentData = parentDataFromBE?.data[0]?.userId;
  const studentDataFromBE = studentsByParentId?.data;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>Parent Profile</h1>
        <h2 className={styles.subtitle}>Parent Name: {parentData.name}</h2>
        <h2 className={styles.subsubtitle}>Parent userId: {parentData._id}</h2>

        <div className={styles.addChildButtonContainer}>
          <Link href={"/parent/addStudent"}>
            <button className={styles.addChildButton}>Add Child</button>
          </Link>
        </div>

        <div className={styles.childrenListTitle}>List of Children</div>
        <div className={styles.studentCardContainer}>
          {studentDataFromBE?.map((student: any) => (
            <Link
              href={`/parent/${student?._id}`}
              key={student._id}
              className={styles.studentCard}
            >
              <h2 className={styles.studentName}>{student.userId.name}</h2>
              <p className={styles.studentInfo}>
                Email: {student.userId.email}
              </p>
              <p className={styles.studentInfo}>Status: {student.status}</p>
              <p className={styles.studentInfo}>
                Password: {student.userId.password}
              </p>
              <p className={styles.studentInfo}>
                Created At:{" "}
                {new Date(student.userId.createdAt).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParentProfilePage;
