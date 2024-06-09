import { createApi } from "@reduxjs/toolkit/query/react";

import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import { getBaseUrl } from "@/helpers/envConfig";
import { tagTypesList } from "../tag-types";


export const baseApi = createApi({
  reducerPath: "api", // This is the folder name where reducers are stored. It provides a unique identifier for this API slice within the Redux store.
  baseQuery: axiosBaseQuery({ baseUrl: getBaseUrl() }), // The baseQuery option specifies the function used for making network requests for each endpoint. Here, we use axiosBaseQuery to customize request and response handling using Axios.
  endpoints: (builder) => ({}), // The endpoints option allows defining specific endpoints for the API. It's an object that maps endpoint names to endpoint definitions.
  tagTypes: tagTypesList, // The tagTypes option defines the types of tags used to categorize and organize the API endpoints for caching and invalidation purposes.
});

/*
  reducerPath: "api" - This is the folder name where my reducers are stored. It serves as a unique identifier for this API slice within the Redux store.
  
  baseQuery - This base query function is used by each endpoint defined in the API. If no queryFn option is specified for an endpoint, it will use this base query function to make network requests. RTK Query provides fetchBaseQuery as a default base query function, which is a lightweight wrapper around fetch for common use-cases. However, in this case, we are using axiosBaseQuery to customize request and response handling using Axios.
*/
