import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { BACKEND_URL } from './routes';

interface ApiError {
  message: string;
  status?: number;
  data?: unknown;
}

const apiConfig: AxiosRequestConfig = {
  baseURL: BACKEND_URL,
  timeout: 10000,
};

const apiClient: AxiosInstance = axios.create(apiConfig);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    const apiError: ApiError = {
      message: error.message,
    };

    if (error.response) {
      apiError.status = error.response.status;
      apiError.data = error.response.data;
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('API No Response:', error.request);
    } else {
      console.error('API Request Error:', error.message);
    }

    return Promise.reject(apiError);
  }
);


export default apiClient;
export type { ApiError };