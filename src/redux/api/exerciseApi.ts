import { baseApi } from "../api/baseApi";
import { tagTypes } from "../tag-types";

const EXERCISE_URL = "/exercise";

export const exerciseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getNextExercise: build.query({
      query: (exerciseId) => ({
        url: `${EXERCISE_URL}/fetchNextExercise/${exerciseId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.exercise],
    }),
    getExercisesByChapterId: build.query({
      query: (chapterId) => ({
        url: `${EXERCISE_URL}/chapter/${chapterId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.exercise],
    }),
    getExercisesByChapterIdAndStudentIdAndIndexed: build.query({
      query: ({ studentId, chapterId }) => ({
        url: `${EXERCISE_URL}/${studentId}/${chapterId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.exercise],
    }),
  }),
});

export const {
  useGetNextExerciseQuery,
  useGetExercisesByChapterIdQuery,
  useGetExercisesByChapterIdAndStudentIdAndIndexedQuery,
} = exerciseApi;
