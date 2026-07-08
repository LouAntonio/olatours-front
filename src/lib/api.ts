import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '../stores/auth';

const api = axios.create({
	baseURL: '/api',
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
});

let isRefreshing = false;
let failedQueue: Array<{
	resolve: (token: string) => void;
	reject: (error: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null) {
	for (const { resolve, reject } of failedQueue) {
		if (error) {
			reject(error);
		} else {
			resolve(token!);
		}
	}
	failedQueue = [];
}

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	const token = useAuthStore.getState().accessToken;
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

api.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		const originalRequest = error.config as InternalAxiosRequestConfig & {
			_retry?: boolean;
		};

		if (error.response?.status === 401 && !originalRequest._retry) {
			const refreshToken = useAuthStore.getState().refreshToken;

			if (!refreshToken) {
				useAuthStore.getState().logout();
				return Promise.reject(error);
			}

			if (isRefreshing) {
				return new Promise<string>((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				}).then((token) => {
					originalRequest.headers.Authorization = `Bearer ${token}`;
					return api(originalRequest);
				});
			}

			originalRequest._retry = true;
			isRefreshing = true;

			try {
				const { data } = await axios.post('/api/auth/refresh', {
					refreshToken,
				});
				const newToken = data.data.accessToken;
				useAuthStore.getState().setAccessToken(newToken);
				processQueue(null, newToken);
				originalRequest.headers.Authorization = `Bearer ${newToken}`;
				return api(originalRequest);
			} catch (refreshError) {
				processQueue(refreshError, null);
				useAuthStore.getState().logout();
				return Promise.reject(refreshError);
			} finally {
				isRefreshing = false;
			}
		}

		return Promise.reject(error);
	},
);

export default api;
