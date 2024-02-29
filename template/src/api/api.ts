import axios, {AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import Config from 'react-native-config';
import {ApiConfig} from './api.types';
import {getGeneralApiProblem} from './apiProblem';

/**
 * Configuring the axios instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL || '',
  apiVersion: Config.API_VERSION || '',
  timeout: 10000,
};

/**
 * Initialise axio api instance
 */
export const api = axios.create({
  baseURL: `${DEFAULT_API_CONFIG.url}/${DEFAULT_API_CONFIG.apiVersion}/`,
  timeout: DEFAULT_API_CONFIG.timeout,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // You can modify the request config here (e.g., add headers, authentication token)
    // config.headers['Authorization'] = 'Bearer YOUR_ACCESS_TOKEN';
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response Interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // You can modify the response data here before it's passed to the component
    return response?.data;
  },
  error => {
    // Handle error responses here
    // For more read: https://github.com/axios/axios?tab=readme-ov-file#error-types
    const problem = getGeneralApiProblem(error);
    return Promise.reject(problem);
  },
);
