import { authKey } from "@/constants/storageKey";
import { IGenericErrorResponse, ResponseSuccessType } from "@/types/common";

import { getFromLocalStorage } from "@/utils/local-storage";
import axios from "axios";

const instance = axios.create();

instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = getFromLocalStorage(authKey);
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor

instance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    const responseObject: ResponseSuccessType = {
      data: response?.data,
      meta: response?.data?.meta,
    };
    return responseObject;
  },
  function (error) {
    const responseObject: IGenericErrorResponse = {
      success: error?.response?.data?.success,
      statusCode: error?.response?.data?.statusCode || 500,
      message: error?.response?.data?.messages || "Something went wrong",
      errorMessages: error?.response?.data?.messages,
    };

    return Promise.reject(error);
  }
);

export { instance };

/*
Why using Axios?---  Before sending the request I want to intercept the request and add some methods to it. 

const instance = axios.create();--- I am creating an HTTP client; so that I can use custom configurations. Now, I can set default header, timeouts, and other options. 

Setting Default Headers:
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";

for my POST requests, I am using this^ default headers. 



instance.defaults.timeout = 60000; ---> Now after 1 min the client will stop waiting for the server and throw an error. 


Request Interceptor: instance.interceptors.request.use
To check the validation--- I will get the token from local storage and set it in the header. 



Response Interceptor: instance.interceptors.response.use,
I am setting, how i should have this response to the frontend


const responseObject: IGenericErrorResponse = {
      success: error?.response?.data?.success,
      statusCode: error?.response?.data?.statusCode || 500,
      message: error?.response?.data?.messages || "Something went wrong",
      errorMessages: error?.response?.data?.messages,

      ^^ This is telling, how i should get the error messages. 


****HOW Axios Base Query and Axios Instance conncted:***
axiosBaseQuery relies on the Axios instance (axiosInstance) created in axiosInstance.js to perform HTTP requests with the predefined settings and interceptors. This connection ensures that all HTTP requests made within the application adhere to the configured behavior set up in axiosInstance
*/
