import { baseApi } from "../api/baseApi";
import { tagTypes } from "../tag-types";

const CHAPTER_URL = "/chapter";

export const chapterApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllChapters: build.query({
      query: () => ({
        url: CHAPTER_URL,
        method: "GET",
      }),
      providesTags: [tagTypes.chapter],
    }),
    getChapterById: build.query({
      query: (id: string) => ({
        url: `${CHAPTER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.chapter],
    }),
  }),
});

export const { useGetAllChaptersQuery, useGetChapterByIdQuery } = chapterApi;
