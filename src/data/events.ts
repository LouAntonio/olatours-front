export type Accent = 'flag' | 'sky' | 'navy';

export interface EventPhoto {
	src: string;
	alt: string;
	caption?: string;
}

export interface EventDetail {
	label: string;
	value: string;
}

export interface EventDocument {
	url: string;
	name: string;
	size: number;
}

export interface Evento {
	id: string;
	slug: string;
	title: string;
	subtitle?: string;
	description: string;
	fullDescription?: string;
	date: string;
	dateLong: string;
	type: string;
	country: string;
	countryName: string;
	accent: Accent;
	photos?: EventPhoto[];
	details?: EventDetail[];
	documents?: EventDocument[];
	featured: boolean;
}
