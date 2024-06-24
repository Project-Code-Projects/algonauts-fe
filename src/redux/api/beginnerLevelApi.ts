import { baseApi } from "../api/baseApi";
import { tagTypes } from "../tag-types";
import { getBaseUrl } from "@/helpers/envConfig";

const URL = "/beginner-level";

const beginnerLevelApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBeginnerLevel: build.mutation({
      query: (data) => ({
        url: `${URL}/create`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.beginnerLevel],
    }),

    getBeginnerLevel: build.query({
      query: (params) => {
        const queryParams = new URLSearchParams(params).toString();
        return {
          url: `${URL}/?${queryParams}`,
          method: 'GET',
        };
      },
      providesTags: [tagTypes.beginnerLevel],
    }),

    updateBeginnerLevel: build.mutation({
      query: ({ id, data }) => ({
        url: `${URL}/update/${id}`,
        method: "PUT",
        data: data,
        body: data,
      }),
      invalidatesTags: [tagTypes.beginnerLevel],
    }),

    getBeginnerLevelById: build.query({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: tagTypes.beginnerLevel, id }],
    }),

    getBeginnerLevelByLevelId: build.query({
      query: (levelId) => ({
        url: `${URL}/level/${levelId}`,
        method: "GET",
      }),
      providesTags: (result, error, levelId) => [{ type: tagTypes.beginnerLevel, levelId }],
    }),
    
  }),

});

export const {useGetBeginnerLevelByLevelIdQuery ,useCreateBeginnerLevelMutation, useGetBeginnerLevelQuery, useUpdateBeginnerLevelMutation , useGetBeginnerLevelByIdQuery} = beginnerLevelApi;


