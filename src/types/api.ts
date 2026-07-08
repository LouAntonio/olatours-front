export interface ApiPagination {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
}

export interface ApiResponse<T> {
	success: boolean;
	data: T;
	pagination?: ApiPagination;
	message?: string;
}

export type EventType =
	| 'FEIRA_TURISMO'
	| 'EVENTO_DESPORTIVO'
	| 'FEIRA_CORPORATIVA'
	| 'CIMEIRA_NEGOCIOS'
	| 'FEIRA_MULTISSETORIAL'
	| 'FEIRA_MICE'
	| 'EXPERIENCIA'
	| 'LAZER'
	| 'VIAGEM'
	| 'VIAGEM_INTERNACIONAL';

export type EventStatus = 'RASCUNHO' | 'PUBLICADO' | 'CANCELADO' | 'ENCERRADO';

export type Accent = 'flag' | 'sky' | 'navy';

export interface ApiEvent {
	id: string;
	title: string;
	subtitle: string | null;
	slug: string;
	description: string;
	fullDescription: string | null;
	startDate: string;
	endDate: string | null;
	displayDate: string;
	displayDateLong: string;
	type: EventType;
	featured: boolean;
	status: EventStatus;
	country: string;
	countryName: string;
	city: string | null;
	venue: string | null;
	latitude: number | null;
	longitude: number | null;
	coverImage: string | null;
	gallery: string[] | null;
	details: { label: string; value: string }[] | null;
	documents: { url: string; name: string; size: number }[] | null;
	metaTitle: string | null;
	metaDescription: string | null;
	ogImage: string | null;
	createdAt: string;
	updatedAt: string;
	publishedAt: string | null;
	createdBy: string | null;
}

export interface ApiUser {
	id: string;
	name: string;
	surname: string;
	email: string;
	role: 'ADMIN';
	lastLogin?: string;
	createdAt?: string;
}

export interface AuthResponse {
	user: ApiUser;
	accessToken: string;
	refreshToken: string;
}

export interface LoginInput {
	email: string;
	password: string;
}

export interface CreateEventInput {
	title: string;
	slug: string;
	subtitle?: string;
	description: string;
	fullDescription?: string;
	startDate: string;
	endDate?: string;
	displayDate: string;
	displayDateLong: string;
	type: EventType;
	featured?: boolean;
	status?: EventStatus;
	country: string;
	countryName: string;
	city?: string;
	venue?: string;
	latitude?: number;
	longitude?: number;
	coverImage?: string;
	metaTitle?: string;
	metaDescription?: string;
}

export type UpdateEventInput = Partial<CreateEventInput>
