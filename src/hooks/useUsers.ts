import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import type { ApiResponse, ApiUser } from '../types/api';

interface UserFormData {
	name: string;
	surname: string;
	email: string;
	password: string;
}

async function fetchUsers(): Promise<ApiUser[]> {
	const { data } = await api.get<ApiResponse<ApiUser[]>>('/auth/users');
	return data.data;
}

async function createUser(input: UserFormData): Promise<ApiUser> {
	const { data } = await api.post<ApiResponse<ApiUser>>('/auth/register', input);
	return data.data;
}

async function removeUser(id: string): Promise<void> {
	await api.delete(`/auth/users/${id}`);
}

async function updateProfile(input: { name: string; surname: string; email: string }): Promise<ApiUser> {
	const { data } = await api.put<ApiResponse<ApiUser>>('/auth/me', input);
	return data.data;
}

async function changePassword(input: { currentPassword: string; newPassword: string }): Promise<void> {
	await api.put('/auth/password', input);
}

export function useUsers() {
	return useQuery({
		queryKey: ['users'],
		queryFn: fetchUsers,
		staleTime: 30 * 1000,
	});
}

export function useCreateUser() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createUser,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
	});
}

export function useDeleteUser() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: removeUser,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
	});
}

export function useUpdateProfile() {
	return useMutation({ mutationFn: updateProfile });
}

export function useChangePassword() {
	return useMutation({ mutationFn: changePassword });
}
