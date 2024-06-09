import type { AxiosRequestConfig, AxiosError } from "axios";
import { instance as axiosInstance } from "./axiosInstance";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { IMeta } from "@/types/common";

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      meta?: IMeta;
      contentType?: string;
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, contentType }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          contentType: contentType || "application/json",
        },
      });
      return result;
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

/*
axiosBaseQuery that serves as a base query for Redux Toolkit Query (RTK Query)


The axiosBaseQuery function is an arrow function that takes an optional object parameter { baseUrl } with a default value of an empty string.

Inside the function body, another arrow function is defined that serves as the actual query function.

This inner function is an async function that takes a single argument, an object with properties url, method, data, params, and contentType.

Inside this inner function, an Axios request is made using the axiosInstance imported earlier. The request is made to the specified url appended with the baseUrl and with the provided method, data, params, and contentType.

If the request is successful, the result is returned.

If an error occurs during the request, it is caught, and the error response is formatted into a standardized format containing the error status and data.



****HOW Axios Base Query and Axios Instance conncted:***
axiosBaseQuery relies on the Axios instance (axiosInstance) created in axiosInstance.js to perform HTTP requests with the predefined settings and interceptors. This connection ensures that all HTTP requests made within the application adhere to the configured behavior set up in axiosInstance


  */
