import axios from 'axios';
// import dotenv from 'dotenv'
import type { FailedRequest } from '../types/apiResponse';
// dotenv.config();

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_FRONTEND}/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// ✅ Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    console.log("sending acess token from axios setup",token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Flag to prevent infinite loop
let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

// ✅ Function to refresh token
const refreshAccessToken = async () => {

  return axios.post(
    `${import.meta.env.VITE_FRONTEND}/api/user/refresh-access-token`,
    {},
    { withCredentials: true } // ✅ send refresh token cookie
  );
};

// ✅ Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // ✅ Token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const res = await refreshAccessToken();

          const newAccessToken = res.data.accessToken;

          // ✅ Save new token
          localStorage.setItem('accessToken', newAccessToken);

          isRefreshing = false;

          // ✅ Retry queued requests
          failedQueue.forEach((req) => req.resolve(newAccessToken));
          failedQueue = [];

          // ✅ Retry original request
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);

        } catch (err) {
          isRefreshing = false;
          failedQueue.forEach((req) => req.reject(err));
          failedQueue = [];

          // ✅ Refresh token also expired
          localStorage.removeItem('accessToken');
          window.location.href = '/';
        }
      }

      // ✅ Queue requests while refreshing
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axiosInstance(originalRequest));
          },
          reject,
        });
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;