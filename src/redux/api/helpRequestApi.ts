import { baseApi } from "../api/baseApi";
import { tagTypes } from "../tag-types";
import { getBaseUrl } from "@/helpers/envConfig";

const URL = "/help-request";

const helpRequestApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createHelpRequest: build.mutation({
      query: (data) => ({
        url: `${URL}/create`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.helpRequest],
    }),

    getHelpRequest: build.query({
      query: (params) => {
        const queryParams = new URLSearchParams(params).toString();
        return {
          url: `${URL}/?${queryParams}`,
          method: 'GET',
        };
      },
      providesTags: [tagTypes.helpRequest],
    }),

    updateHelpRequest: build.mutation({
      query: ({ id, data }) => ({
        url: `${URL}/update/${id}`,
        method: "PUT",
        data: data,
      }),
      invalidatesTags: [tagTypes.helpRequest],
    }),

    getHelpRequestById: build.query({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: tagTypes.helpRequest, id }],
    }),
    

  }),



});


export const { useCreateHelpRequestMutation, useGetHelpRequestQuery, useUpdateHelpRequestMutation , useGetHelpRequestByIdQuery} = helpRequestApi;



