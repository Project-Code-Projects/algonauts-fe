import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const INSTRUCTOR_URL = "/instructor";

export const instructorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getInstructorApi: build.query({
      query: (userId) => ({
        url: `${INSTRUCTOR_URL}/user/${userId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.student, tagTypes.user],
    }),
    getClassStats: build.query({
      query: () => ({
        url: `${INSTRUCTOR_URL}/exercise-statistics`,
        method: "GET",
      }),
      providesTags: [tagTypes.student, tagTypes.user, tagTypes.stats],
    }),
    getStudentStats: build.query({
      query: (studentId) => ({
        url: `${INSTRUCTOR_URL}/exercise-statistics/${studentId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.student, tagTypes.user, tagTypes.stats],
    }),
  }),
});

export const {
  useGetInstructorApiQuery,
  useGetClassStatsQuery,
  useGetStudentStatsQuery,
} = instructorApi;
