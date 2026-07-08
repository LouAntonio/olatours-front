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

export interface Evento {
	id: string;
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
	featured: boolean;
}
