// src/api/setupInterceptors.ts
import { apiClient } from "./apiClient";

export function setupInterceptors() {
    apiClient.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("jwt");
            if (token) {
                config.headers.Authorization = token
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    apiClient.interceptors.response.use(
        response => response,
        error => {
            if (error.response?.status === 401) {
                localStorage.removeItem('jwt');
                localStorage.removeItem('user');
                window.location.href = '/signin';
            }
            return Promise.reject(error);
        }
    );
}