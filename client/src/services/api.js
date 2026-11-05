import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/";

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Attach access token to every outgoing request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('adminAccessToken') || localStorage.getItem('adminToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor: automatically refresh expired access tokens
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        const isAuthEndpoint =
            originalRequest?.url?.includes('admin/login') ||
            originalRequest?.url?.includes('admin/refresh-token');

        if (error.response?.status === 401 && !originalRequest?._retry && !isAuthEndpoint) {
            const refreshToken = localStorage.getItem('adminRefreshToken');

            // If there's no refresh token to recover with, clean up and fail
            if (!refreshToken) {
                localStorage.removeItem('adminAccessToken');
                localStorage.removeItem('adminToken');
                return Promise.reject(error);
            }

            // If another refresh call is in flight, queue this request until it finishes
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return api(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshEndpoint = API_BASE_URL.endsWith('/')
                    ? `${API_BASE_URL}admin/refresh-token`
                    : `${API_BASE_URL}/admin/refresh-token`;

                // Call refresh endpoint with raw axios to bypass interceptor recursion
                const res = await axios.post(refreshEndpoint, { refreshToken });
                const newAccessToken = res.data.accessToken || res.data.data;

                localStorage.setItem('adminAccessToken', newAccessToken);
                localStorage.setItem('adminToken', newAccessToken);

                api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                processQueue(null, newAccessToken);
                return api(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                localStorage.removeItem('adminAccessToken');
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminRefreshToken');

                if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
                    window.location.href = '/admin/login';
                }
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;
