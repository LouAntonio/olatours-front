import type { ApiEvent, Accent, EventType } from '../types/api';
import type {
	Evento,
	EventPhoto,
	EventDetail,
	EventDocument,
} from '../data/events';

const BACKEND_URL =
	import.meta.env.VITE_BACKEND_URL ?? 'https://api.olatours.co.ao';

export function uploadUrl(path: string): string {
	if (!path) return '';
	if (path.startsWith('http')) return path;
	const cleaned = path.replace(/^uploads\//, '');
	return `${BACKEND_URL}/uploads/${cleaned.replace(/\\/g, '/')}`;
}

function mapCoverUrl(url: string | null): string {
	return uploadUrl(url ?? '');
}

const typeAccentMap: Record<EventType, Accent> = {
	FEIRA_TURISMO: 'sky',
	EVENTO_DESPORTIVO: 'flag',
	FEIRA_CORPORATIVA: 'navy',
	CIMEIRA_NEGOCIOS: 'flag',
	FEIRA_MULTISSETORIAL: 'navy',
	FEIRA_MICE: 'sky',
	EXPERIENCIA: 'flag',
	LAZER: 'sky',
	VIAGEM: 'navy',
	VIAGEM_INTERNACIONAL: 'flag',
};

const typeDisplayMap: Record<EventType, string> = {
	FEIRA_TURISMO: 'Feira de Turismo',
	EVENTO_DESPORTIVO: 'Evento Desportivo',
	FEIRA_CORPORATIVA: 'Feira Corporativa',
	CIMEIRA_NEGOCIOS: 'Cimeira de Negócios',
	FEIRA_MULTISSETORIAL: 'Feira Multissetorial',
	FEIRA_MICE: 'Feira MICE',
	EXPERIENCIA: 'Experiência',
	LAZER: 'Lazer',
	VIAGEM: 'Viagem',
	VIAGEM_INTERNACIONAL: 'Viagem Internacional',
};

function mapPhotos(event: ApiEvent): EventPhoto[] | undefined {
	const photos: EventPhoto[] = [];

	if (event.coverImage) {
		photos.push({
			src: mapCoverUrl(event.coverImage),
			alt: `${event.title} — ${event.countryName}`,
		});
	}

	if (event.gallery && Array.isArray(event.gallery)) {
		for (const item of event.gallery) {
			const src =
				typeof item === 'string'
					? mapCoverUrl(item)
					: mapCoverUrl((item as { url: string }).url);
			const alt =
				typeof item === 'string'
					? event.title
					: ((item as { alt?: string }).alt ?? event.title);
			photos.push({ src, alt });
		}
	}

	return photos.length > 0 ? photos : undefined;
}

function mapDocuments(event: ApiEvent): EventDocument[] | undefined {
	if (!event.documents || !Array.isArray(event.documents)) return undefined;
	return event.documents.map((d) => ({
		url: uploadUrl(d.url),
		name: d.name,
		size: d.size,
	}));
}

function mapDetails(event: ApiEvent): EventDetail[] | undefined {
	if (!event.details || !Array.isArray(event.details)) return undefined;
	return event.details.map((d) => ({ label: d.label, value: d.value }));
}

export function mapApiEventToEvento(event: ApiEvent): Evento {
	return {
		id: event.id,
		slug: event.slug,
		title: event.title,
		subtitle: event.subtitle ?? undefined,
		description: event.description,
		fullDescription: event.fullDescription ?? undefined,
		date: event.displayDate,
		dateLong: event.displayDateLong,
		type: typeDisplayMap[event.type] ?? event.type,
		country: event.country,
		countryName: event.countryName,
		accent: typeAccentMap[event.type] ?? 'navy',
		photos: mapPhotos(event),
		details: mapDetails(event),
		documents: mapDocuments(event),
		featured: event.featured,
	};
}

export function mapApiEventsToEventos(events: ApiEvent[]): Evento[] {
	return events.map(mapApiEventToEvento);
}
