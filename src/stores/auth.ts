import { create } from 'zustand';
import type { ApiUser } from '../types/api';

const STORAGE_KEY = 'olatours:auth';

interface AuthState {
	user: ApiUser | null;
	accessToken: string | null;
	refreshToken: string | null;
	isAuthenticated: boolean;
	isInitialized: boolean;
	login: (user: ApiUser, accessToken: string, refreshToken: string) => void;
	logout: () => void;
	setAccessToken: (token: string) => void;
	hydrate: () => void;
}

function loadFromStorage() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		return JSON.parse(raw) as { user: ApiUser; accessToken: string; refreshToken: string };
	} catch {
		return null;
	}
}

function saveToStorage(user: ApiUser, accessToken: string, refreshToken: string) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, accessToken, refreshToken }));
}

function clearStorage() {
	localStorage.removeItem(STORAGE_KEY);
}

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	accessToken: null,
	refreshToken: null,
	isAuthenticated: false,
	isInitialized: false,

	hydrate: () => {
		const stored = loadFromStorage();
		if (stored) {
			set({
				user: stored.user,
				accessToken: stored.accessToken,
				refreshToken: stored.refreshToken,
				isAuthenticated: true,
				isInitialized: true,
			});
		} else {
			set({ isInitialized: true });
		}
	},

	login: (user, accessToken, refreshToken) => {
		saveToStorage(user, accessToken, refreshToken);
		set({ user, accessToken, refreshToken, isAuthenticated: true });
	},

	logout: () => {
		clearStorage();
		set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });
	},

	setAccessToken: (token) => {
		const state = useAuthStore.getState();
		if (state.user && state.refreshToken) {
			saveToStorage(state.user, token, state.refreshToken);
		}
		set({ accessToken: token });
	},
}));
