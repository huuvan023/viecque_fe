import env from "@Env/index";
import axios from "axios";

const AxiosClient = axios.create({
  baseURL: env,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default AxiosClient;
