import { baseApi } from "../api/baseApi";
import { tagTypes } from "../tag-types";

const SECTION_URL = "/section";

export const sectionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllSections: build.query({
      query: () => ({
        url: SECTION_URL,
        method: "GET",
      }),
      providesTags: [tagTypes.section],
    }),
    getSectionById: build.query({
      query: (id: string) => ({
        url: `${SECTION_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.section],
    }),
  }),
});

export const { useGetAllSectionsQuery, useGetSectionByIdQuery } = sectionApi;
