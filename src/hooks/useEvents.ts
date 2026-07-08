import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';
import { mapApiEventsToEventos, mapApiEventToEvento } from '../lib/mappers';
import type { ApiResponse, ApiEvent } from '../types/api';
import type { Evento } from '../data/events';

async function fetchEvents(page = 1, limit = 50): Promise<Evento[]> {
	const { data } = await api.get<ApiResponse<ApiEvent[]>>('/events', {
		params: { page, limit },
	});
	return mapApiEventsToEventos(data.data);
}

async function fetchEvent(id: string): Promise<Evento | null> {
	const { data } = await api.get<ApiResponse<ApiEvent>>(`/events/${id}`);
	return data.success ? mapApiEventToEvento(data.data) : null;
}

async function fetchEventBySlug(slug: string): Promise<Evento | null> {
	const { data } = await api.get<ApiResponse<ApiEvent>>(`/events/slug/${slug}`);
	return data.success ? mapApiEventToEvento(data.data) : null;
}

async function fetchAdminEvents(page = 1, limit = 100): Promise<{ events: Evento[]; total: number }> {
	const { data } = await api.get<ApiResponse<ApiEvent[]> & { pagination: { total: number } }>(
		'/admin/events',
		{ params: { page, limit } },
	);
	return { events: mapApiEventsToEventos(data.data), total: data.pagination.total };
}

export function useEvents(page?: number, limit?: number) {
	return useQuery({
		queryKey: ['events', 'public', page, limit],
		queryFn: () => fetchEvents(page, limit),
		staleTime: 5 * 60 * 1000,
	});
}

export function useEvent(id: string) {
	return useQuery({
		queryKey: ['event', id],
		queryFn: () => fetchEvent(id),
		enabled: !!id,
		staleTime: 5 * 60 * 1000,
	});
}

export function useEventBySlug(slug: string) {
	return useQuery({
		queryKey: ['event', 'slug', slug],
		queryFn: () => fetchEventBySlug(slug),
		enabled: !!slug,
		staleTime: 5 * 60 * 1000,
	});
}

export function useAdminEvents(page?: number, limit?: number) {
	return useQuery({
		queryKey: ['events', 'admin', page, limit],
		queryFn: () => fetchAdminEvents(page, limit),
		staleTime: 30 * 1000,
	});
}

export async function createEvent(input: Record<string, unknown>) {
	const { data } = await api.post<ApiResponse<ApiEvent>>('/events', input);
	return data.data;
}

export async function updateEvent(id: string, input: Record<string, unknown>) {
	const { data } = await api.put<ApiResponse<ApiEvent>>(`/events/${id}`, input);
	return data.data;
}

export async function deleteEvent(id: string) {
	const { data } = await api.delete<ApiResponse<null>>(`/events/${id}`);
	return data;
}
