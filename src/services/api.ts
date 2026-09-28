import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * =========================================================================
 * CAMPUS EVENT MANAGEMENT SYSTEM - REST API CONFIGURATION
 * =========================================================================
 * This configuration is ready for future integration with a Java Spring Boot backend.
 * 
 * Target Backend:
 * - Framework: Spring Boot 3.x with Spring Security & Spring Data JPA
 * - Database: MySQL
 * - Authentication: JWT (JSON Web Tokens)
 * - Base URL: http://localhost:8080/api
 * 
 * When ready to connect Spring Boot:
 * 1. Ensure Spring Boot runs on port 8080 with CORS allowed for http://localhost:3000
 * 2. Set VITE_API_BASE_URL=http://localhost:8080/api in .env
 * =========================================================================
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor: Injects Spring Boot Bearer JWT Token if stored in localStorage
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('cems_jwt_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Formats responses and handles 401 Unauthorized token expiry
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Future Spring Boot JWT expiry handler:
      // localStorage.removeItem('cems_jwt_token');
      // window.location.href = '/student/login';
      console.warn('[API Interceptor] 401 Unauthorized from backend:', error.response?.data);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
