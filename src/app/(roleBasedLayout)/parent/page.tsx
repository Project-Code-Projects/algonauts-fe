"use client";
import SpinAnimation from "@/components/ui/SpinAnimation";
import { useGetParentbyUserIdQuery } from "@/redux/api/parentApi";
import { useGetStudentByParentIdQuery } from "@/redux/api/studentApi";
import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";
import Image from "next/image";
import { tailwindButtonClass } from "@/stylesShared/tailwindButtonClass";
import { capitalizeWords } from "@/utils/helperFunctions";

interface ProfileCardProps {
  name: string;
  email: string;
  avatarSrc: string;
  children?: React.ReactNode;
  password?: string;
}

const styles = {
  pageContainer: "min-h-screen flex flex-col px-4 py-8",
  contentContainer: "w-full max-w-4xl mx-auto",
  title: "text-3xl font-bold mb-8 text-center",
  cardContainer:
    "flex items-center justify-center flex-col rounded-lg shadow-md p-6 mb-6",
  avatarContainer: "w-24 h-24 rounded-full overflow-hidden mx-auto mb-4",
  name: "text-2xl font-bold text-center mb-2",
  details: "text-gray-600 text-center mb-4",
  addChildButton: `${tailwindButtonClass} mt-4 `,
  childrenContainer: "mt-8",
  childrenTitle: "text-2xl font-bold mb-4 text-center",
  childrenGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
  childCard:
    "bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-105",
  childAvatar: "w-16 h-16 rounded-full overflow-hidden mx-auto mb-4",
  childName: "text-xl font-bold text-center mb-2",
  childDetails: "text-gray-600 text-sm text-center",
  connectionLine: "w-1 bg-green-500 mx-auto my-4 h-8",
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  email,
  avatarSrc,
  children,
  password,
}) => (
  <div className={styles.cardContainer}>
    <div className={styles.avatarContainer}>
      <Image src={avatarSrc} alt={name} width={96} height={96} />
    </div>
    <h2 className={styles.name}>{name}</h2>
    <p>Email: {email}</p>

    {children}
  </div>
);

const ParentProfilePage: React.FC = () => {
  const userInfo = getUserInfo();
  const parentId = userInfo?._id;

  const {
    data: parentDataFromBE,
    isLoading,
    isError,
  } = useGetParentbyUserIdQuery(parentId);
  const { data: studentsByParentId } = useGetStudentByParentIdQuery(parentId);

  if (isLoading) return <SpinAnimation />;
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
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>Parent Profile</h1>
        <ProfileCard
          name={parentData.name}
          email={parentData.email}
          avatarSrc={`https://avatar.iran.liara.run/public/boy`}
        >
          <Link href="/parent/addStudent">
            <button className={styles.addChildButton}>Add Child</button>
          </Link>
        </ProfileCard>

        <div className={styles.connectionLine} />

        <div className={styles.childrenContainer}>
          <h2 className={styles.childrenTitle}>Children</h2>
          <div className={styles.childrenGrid}>
            {studentDataFromBE && studentDataFromBE.length > 0 ? (
              studentDataFromBE.map((student: any) => (
                <Link href={`/parent/${student._id}`} key={student._id}>
                  <ProfileCard
                    name={student.userId.name}
                    email={student.userId.email}
                    avatarSrc={`https://avatar.iran.liara.run/public`}
                  >
                    <p className={styles.childDetails}>
                      Password: {student.userId.password}
                    </p>
                    <p className={styles.childDetails}>
                      Status: {capitalizeWords(student.status)}
                    </p>
                    <p className={styles.childDetails}>
                      Created:{" "}
                      {new Date(student.userId.createdAt).toLocaleDateString()}
                    </p>
                  </ProfileCard>
                </Link>
              ))
            ) : (
              <p>No child yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentProfilePage;
