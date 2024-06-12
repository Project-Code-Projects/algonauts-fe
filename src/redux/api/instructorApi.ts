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
  }),
});

export const { useGetInstructorApiQuery } = instructorApi;
