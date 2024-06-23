import { baseApi } from "../api/baseApi";
import { tagTypes } from "../tag-types";

const EDITOR_LEVEL_URL = "/editor-level";

export const editorLevelApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllEditorLevels: build.query({
      query: () => ({
        url: EDITOR_LEVEL_URL,
        method: "GET",
      }),
      providesTags: [tagTypes.editorLevel],
    }),
    getEditorLevelById: build.query({
      query: (id: string) => ({
        url: `${EDITOR_LEVEL_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.editorLevel],
    }),
    getEditorLevelByExerciseId: build.query({
      query: (id: string) => ({
        url: `${EDITOR_LEVEL_URL}/v2/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.editorLevel],
    }),
  }),
});

export const {
  useGetAllEditorLevelsQuery,
  useGetEditorLevelByIdQuery,
  useGetEditorLevelByExerciseIdQuery,
} = editorLevelApi;
