import { baseApi } from "../api/baseApi";
import { tagTypes } from "../tag-types";



const URL = "/like";

const likeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    likePost: build.mutation({
      query: (data) => ({
        url: `${URL}/like`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: tagTypes.post, id: postId },
        { type: tagTypes.post },
      ],
    }),

    getLike: build.query({
      query: (params) => {
        const queryParams = new URLSearchParams(params).toString();
        return {
          url: `${URL}/likes?${queryParams}`,
          method: 'GET',
        };
      },
      providesTags: [tagTypes.like],
    }),

    updateLike: build.mutation({
      query: ({ id, data }) => ({
        url: `${URL}/update/${id}`,
        method: "PUT",
        data: data,
        body: data,
      }),
      invalidatesTags: [tagTypes.like],
    }),

    getLikeById: build.query({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: tagTypes.like, id }],
    }),

    likePostAction: build.mutation({
      query: ({post_id, data}) => ({
        url: `${URL}/like/${post_id}`,
        method: "POST",
        data: data,
        body: data,
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: tagTypes.post, id: postId },
        { type: tagTypes.post },
      ],
    }),
  }),

});

export const { useLikePostMutation, useGetLikeQuery, useUpdateLikeMutation , useGetLikeByIdQuery, useLikePostActionMutation} = likeApi;