import axios from "axios";
import { BehaviorSubject } from "rxjs";
import { toast } from "react-toastify";
import { getToken, isAuthenticated, removeToken } from "../utils/auth";

let refreshed = false;

export const baseUrl =
  process.env.REACT_APP_API_BASE_URL ||
  "https://nexus-backend-n855.onrender.com/api/v1";
// "http://localhost:4000/api/v1";

export const subscriber = new BehaviorSubject(0);
const Api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

// Request interceptor for API calls
Api.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: isAuthenticated() ? `${getToken()}` : "",
    };
    return config;
  },
  (err) => {
    console.log(err, "from");
    if (
      err?.response?.status === 401 &&
      err?.response?.data?.detail === "Incorrect authentication credentials." &&
      !refreshed
    ) {
      toast.error("Session expired", {
        position: "top-center",
      });
      setTimeout(() => {
        removeToken();
        window.history.pushState({}, "User Login", "/home");
      }, 4000);
    }
    refreshed = false;
    // Promise.reject(err);
    return err;
  }
);

// Response interceptor for API calls
Api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    console.log({ error });
    if (
      error?.response?.status === 401 &&
      error?.response?.data?.message === "No Valid Token Please Login"
    ) {
      console.log("yes");
      toast.error("Session expired", {
        position: "top-center",
      });
      setTimeout(() => {
        removeToken();
        window.location.reload();
        window.history.pushState({}, "User Login", "/home");
      }, 4000);
    }
    // const originalRequest = error?.config;
    // if (error?.response?.status === 401 && !originalRequest?._retry) {
    //   originalRequest._retry = true;
    //   const rToken = getRefreshToken();
    //   if (rToken) {
    //     const access_token = await refreshToken(rToken);
    //     axios.defaults.headers.common["Authorization"] =
    //       "Bearer " + access_token;
    //   }
    //   return Api(originalRequest);
    // }
    return Promise.reject(error);
  }
);

export default Api;
