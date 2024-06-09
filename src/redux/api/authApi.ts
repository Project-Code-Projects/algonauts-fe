import { baseApi } from "../api/baseApi";
import { tagTypes } from "../tag-types";

const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.student],
    }),
  }),
});

export const { useUserLoginMutation } = authApi;
