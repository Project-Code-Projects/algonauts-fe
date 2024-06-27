import { baseApi } from "../api/baseApi";
import { tagTypes } from "../tag-types";

const AUTH_URL = "/user";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addUser: build.mutation({
      query: (userData) => ({
        url: `${AUTH_URL}/create-user`,
        method: "POST",
        data: userData,
      }),
      invalidatesTags: [tagTypes.student, tagTypes.user],
    }),
    resetUserPassword: build.mutation({
      query: ({ userId, oldPassword, newPassword }) => ({
        url: `${AUTH_URL}/reset-password/${userId}`,
        method: "PUT",
        data: { oldPassword, newPassword },
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const { useAddUserMutation, useResetUserPasswordMutation } = userApi;
