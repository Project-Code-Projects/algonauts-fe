import { baseApi } from "../api/baseApi";
import { tagTypes } from "../tag-types";
import { getBaseUrl } from "@/helpers/envConfig";

const URL = "/comment";

const commentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createComment: build.mutation({
      query: (data) => ({
        url: `${URL}/create`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: tagTypes.post, id: postId },
        { type: tagTypes.post },
      ],
    }),

    getComment: build.query({
      query: (params) => {
        const queryParams = new URLSearchParams(params).toString();
        return {
          url: `${URL}/comments?${queryParams}`,
          method: 'GET',
        };
      },
      providesTags: [tagTypes.comment],
    }),

    updateComment: build.mutation({
      query: ({ id, data }) => ({
        url: `${URL}/update/${id}`,
        method: "PUT",
        data: data,
        body: data,
      }),
      invalidatesTags: [tagTypes.comment],
    }),

    getCommentById: build.query({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: tagTypes.comment, id }],
    }),
    

  }),

});

export const { useCreateCommentMutation, useGetCommentQuery, useUpdateCommentMutation , useGetCommentByIdQuery} = commentApi;

