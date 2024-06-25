import { baseApi } from "../api/baseApi";
import { tagTypes } from "../tag-types";
import { getBaseUrl } from "@/helpers/envConfig";

const URL = "/post";

const postApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPost: build.mutation({
      query: (data) => ({
        url: `${URL}/create`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.post],
    }),

    getPost: build.query({
      query: (params) => {
        const queryParams = new URLSearchParams(params).toString();
        return {
          url: `${URL}/posts?${queryParams}`,
          method: 'GET',
        };
      },
      providesTags: [tagTypes.post],
    }),

    updatePost: build.mutation({
      query: ({ id, data }) => ({
        url: `${URL}/update/${id}`,
        method: "PUT",
        data: data,
        body: data,
      }),
      invalidatesTags: [tagTypes.post],
    }),

    getPostById: build.query({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: tagTypes.post, id }],
    }),
    

  }),

});

export const { useCreatePostMutation, useGetPostQuery, useUpdatePostMutation , useGetPostByIdQuery} = postApi;