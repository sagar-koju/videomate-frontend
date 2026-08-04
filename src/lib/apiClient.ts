import axios from "axios";

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

let isRefreshing = false;
let failedQueue: { resolve: (value?: unknown) => void; reject: (reason?: any) => void }[] = [];

const processQueue = (error: any) => {
    failedQueue.forEach((prom) => (error ? prom.reject(error) : prom.resolve()))
    failedQueue = []
}

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // queue requests that come in while a refresh is already in progress
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject })
                }).then(() => apiClient(originalRequest))
            }

            originalRequest._retry = true
            isRefreshing = true

            try {
                await apiClient.post('/auth/refresh-token') // sends refreshToken cookie automatically
                processQueue(null)
                return apiClient(originalRequest) // retry the original failed request
            } catch (refreshError) {
                processQueue(refreshError)
                // refresh failed too — refresh token is actually expired/invalid, force logout
                window.location.href = '/login'
                return Promise.reject(refreshError)
            } finally {
                isRefreshing = false
            }
        }

        return Promise.reject(error)
    }
)