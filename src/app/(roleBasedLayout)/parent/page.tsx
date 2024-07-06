"use client";
import SpinAnimation from "@/components/ui/SpinAnimation";
import { useGetParentbyUserIdQuery } from "@/redux/api/parentApi";
import { useGetStudentByParentIdQuery } from "@/redux/api/studentApi";
import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";
import Image from "next/image";
import { tailwindButtonClass } from "@/stylesShared/tailwindButtonClass";

const styles = {
  pageContainer: "min-h-screen flex px-4 py-8",
  leftColumn: "w-1/3 pr-8",
  rightColumn: "w-2/3",
  contentContainer:
    "bg-gradient-to-r from-blue-200 to-green-200 rounded-lg shadow-lg p-8",
  title: "text-3xl font-bold mb-4",
  subtitle: "text-xl font-semibold mb-2",
  addChildButton: `${tailwindButtonClass} mt-2`,
  childrenListTitle: "text-2xl font-bold mb-4",
  studentCardContainer: "grid grid-cols-2 gap-4",
  studentCard:
    "bg-blue-100 p-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 flex items-center",
  avatarContainer: "w-16 h-16 rounded-full overflow-hidden mr-4",
  studentInfo: "flex-grow",
  studentName: "text-xl font-bold mb-1",
  studentDetail: "text-gray-600 text-sm",
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
      <div className="flex items-center justify-center h-screen text-red-500">
        Error occurred while fetching data.
      </div>
    );
  }

  const parentData = parentDataFromBE?.data[0]?.userId;
  const studentDataFromBE = studentsByParentId?.data;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.leftColumn}>
        <div className={styles.contentContainer}>
          <h1 className={styles.title}>Parent Profile</h1>
          <div className={styles.avatarContainer}>
            <Image
              src={`https://avatar.iran.liara.run/public/boy`}
              alt={parentData.name}
              width={64}
              height={64}
            />
          </div>
          <h2 className={styles.subtitle}>Name: {parentData.name}</h2>
          <p>User ID: {parentData._id}</p>
          <p>Email: {parentData.email}</p>
          <Link href="/parent/addStudent">
            <button className={styles.addChildButton}>Add Child</button>
          </Link>
        </div>
      </div>
      <div className={styles.rightColumn}>
        <div className={styles.contentContainer}>
          <h2 className={styles.childrenListTitle}>Children</h2>
          <div className={styles.studentCardContainer}>
            {studentDataFromBE?.map((student: any) => (
              <Link
                href={`/parent/${student?._id}`}
                key={student._id}
                className={styles.studentCard}
              >
                <div className={styles.avatarContainer}>
                  <Image
                    src={`https://avatar.iran.liara.run/public`}
                    alt={student.userId.name}
                    width={64}
                    height={64}
                  />
                </div>
                <div className={styles.studentInfo}>
                  <h3 className={styles.studentName}>{student.userId.name}</h3>
                  <p className={styles.studentDetail}>
                    Status: {student.status}
                  </p>
                  <p className={styles.studentDetail}>
                    Email: {student.userId.email}
                  </p>
                  <p className={styles.studentDetail}>
                    Password: {student.userId.password}
                  </p>
                  <p className={styles.studentDetail}>
                    Created:{" "}
                    {new Date(student.userId.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentProfilePage;
