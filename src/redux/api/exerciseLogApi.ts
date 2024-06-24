import { baseApi } from "../api/baseApi";
import { tagTypes } from "../tag-types";

const EXERCISE_LOG_URL = "/exercise-log";

export const exerciseLogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addExerciseLog: build.mutation({
      query: (exerciseData) => ({
        url: `${EXERCISE_LOG_URL}/create`,
        method: "POST",
        data: exerciseData,
      }),
      invalidatesTags: [tagTypes.exerciseLog],
    }),
  }),
});

export const { useAddExerciseLogMutation } = exerciseLogApi;
