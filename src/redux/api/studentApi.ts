import { baseApi } from "../api/baseApi";
import { tagTypes } from "../tag-types";

const STUDENT_URL = "/student";

export const studentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getStudentByParentId: build.query({
      query: (parentId) => ({
        url: `${STUDENT_URL}/parent/${parentId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.student, tagTypes.user, tagTypes.parent],
    }),

    getStudentByUserId: build.query({
      query: (userId) => ({
        url: `${STUDENT_URL}/user/${userId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.student, tagTypes.user, tagTypes.parent],
    }),
    getAllStudents: build.query({
      query: () => ({
        url: `${STUDENT_URL}`,
        method: "GET",
      }),
      providesTags: [tagTypes.student, tagTypes.user, tagTypes.parent],
    }),

    getStudentProgress: build.query({
      query: (studentId) => ({
        url: `${STUDENT_URL}/studentProgress/${studentId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.studentProgress],
    }),
  }),
});

export const {
  useGetStudentByParentIdQuery,
  useGetStudentByUserIdQuery,
  useGetAllStudentsQuery,
  useGetStudentProgressQuery,
} = studentApi;
