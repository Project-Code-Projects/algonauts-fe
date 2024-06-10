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
  }),
});

export const { useAddUserMutation } = userApi;
