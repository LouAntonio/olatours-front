import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useEventBySlug, createEvent, updateEvent, uploadCover, uploadGalleryImage, deleteGalleryImage } from '../../hooks/useEvents.ts';
import type { EventType, EventStatus } from '../../types/api.ts';

const EVENT_TYPES: { value: EventType; label: string }[] = [
	{ value: 'FEIRA_TURISMO', label: 'Feira de Turismo' },
	{ value: 'EVENTO_DESPORTIVO', label: 'Evento Desportivo' },
	{ value: 'FEIRA_CORPORATIVA', label: 'Feira Corporativa' },
	{ value: 'CIMEIRA_NEGOCIOS', label: 'Cimeira de Negócios' },
	{ value: 'FEIRA_MULTISSETORIAL', label: 'Feira Multissetorial' },
	{ value: 'FEIRA_MICE', label: 'Feira MICE' },
	{ value: 'EXPERIENCIA', label: 'Experiência' },
	{ value: 'LAZER', label: 'Lazer' },
	{ value: 'VIAGEM', label: 'Viagem' },
	{ value: 'VIAGEM_INTERNACIONAL', label: 'Viagem Internacional' },
];

const STATUS_OPTIONS: { value: EventStatus; label: string }[] = [
	{ value: 'RASCUNHO', label: 'Rascunho' },
	{ value: 'PUBLICADO', label: 'Publicado' },
	{ value: 'CANCELADO', label: 'Cancelado' },
	{ value: 'ENCERRADO', label: 'Encerrado' },
];

interface FormState {
	title: string;
	slug: string;
	subtitle: string;
	description: string;
	fullDescription: string;
	startDate: string;
	endDate: string;
	displayDate: string;
	displayDateLong: string;
	type: EventType;
	status: EventStatus;
	featured: boolean;
	country: string;
	countryName: string;
	city: string;
	venue: string;
	coverImage: string;
}

const EMPTY_FORM: FormState = {
	title: '',
	slug: '',
	subtitle: '',
	description: '',
	fullDescription: '',
	startDate: '',
	endDate: '',
	displayDate: '',
	displayDateLong: '',
	type: 'FEIRA_TURISMO',
	status: 'RASCUNHO',
	featured: false,
	country: '',
	countryName: '',
	city: '',
	venue: '',
	coverImage: '',
};

export function AdminEventForm() {
	const { slug } = useParams<{ slug: string }>();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const isEditing = !!slug;

	const { data: existingEvent, isLoading: loadingEvent } = useEventBySlug(slug ?? '');
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState('');

	const [form, setForm] = useState<FormState>(EMPTY_FORM);
	const [loadedSlug, setLoadedSlug] = useState<string | null>(null);

	const [uploadingCover, setUploadingCover] = useState(false);
	const [uploadingGallery, setUploadingGallery] = useState(false);
	const [coverUrl, setCoverUrl] = useState<string | null>(null);
	const [galleryUrls, setGalleryUrls] = useState<string[]>([]);

	if (isEditing && existingEvent && loadedSlug !== slug) {
		setLoadedSlug(slug ?? null);
		const cover = existingEvent.photos?.[0]?.src ?? null;
		const gallery = existingEvent.photos?.slice(1).map((p) => p.src) ?? [];
		setCoverUrl(cover);
		setGalleryUrls(gallery);
		setForm({
			title: existingEvent.title,
			slug: existingEvent.slug,
			subtitle: existingEvent.subtitle ?? '',
			description: existingEvent.description,
			fullDescription: existingEvent.fullDescription ?? '',
			startDate: '',
			endDate: '',
			displayDate: existingEvent.date,
			displayDateLong: existingEvent.dateLong,
			type: 'FEIRA_TURISMO',
			status: 'PUBLICADO',
			featured: existingEvent.featured,
			country: existingEvent.country,
			countryName: existingEvent.countryName,
			city: '',
			venue: '',
			coverImage: cover ?? '',
		});
	}

	function update(key: keyof FormState, value: string | boolean) {
		setForm((prev) => ({ ...prev, [key]: value }));
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError('');
		setSaving(true);
		try {
			const payload = {
				title: form.title,
				slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
				subtitle: form.subtitle || undefined,
				description: form.description,
				fullDescription: form.fullDescription || undefined,
				startDate: form.startDate || undefined,
				endDate: form.endDate || undefined,
				displayDate: form.displayDate,
				displayDateLong: form.displayDateLong,
				type: form.type,
				status: form.status,
				featured: form.featured,
				country: form.country,
				countryName: form.countryName,
				city: form.city || undefined,
				venue: form.venue || undefined,
				coverImage: form.coverImage || undefined,
			};

			if (isEditing) {
				await updateEvent(existingEvent!.id, payload);
			} else {
				const created = await createEvent(payload);
				navigate(`/ot/eventos/${created.slug}/editar`, { replace: true });
				return;
			}

			queryClient.invalidateQueries({ queryKey: ['events'] });
			navigate('/ot/eventos');
		} catch (err: unknown) {
			const msg = err instanceof Error ? err.message : 'Erro ao guardar evento';
			setError(msg);
		} finally {
			setSaving(false);
		}
	}

	async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file || !isEditing || !existingEvent) return;
		setUploadingCover(true);
		try {
			const result = await uploadCover(existingEvent.id, file);
			const mappedUrl = result.url.startsWith('http') ? result.url : `/uploads/${result.url.replace(/\\/g, '/')}`;
			setCoverUrl(mappedUrl);
			setForm((prev) => ({ ...prev, coverImage: result.url }));
			queryClient.invalidateQueries({ queryKey: ['event'] });
		} catch {
			alert('Erro ao enviar imagem');
		} finally {
			setUploadingCover(false);
		}
	}

	async function handleGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file || !isEditing || !existingEvent) return;
		setUploadingGallery(true);
		try {
			const result = await uploadGalleryImage(existingEvent.id, file);
			const mappedUrl = result.url.startsWith('http') ? result.url : `/uploads/${result.url.replace(/\\/g, '/')}`;
			setGalleryUrls((prev) => [...prev, mappedUrl]);
			queryClient.invalidateQueries({ queryKey: ['event'] });
		} catch {
			alert('Erro ao enviar imagem');
		} finally {
			setUploadingGallery(false);
		}
	}

	async function handleGalleryDelete(index: number) {
		if (!isEditing || !existingEvent) return;
		try {
			await deleteGalleryImage(existingEvent.id, index);
			setGalleryUrls((prev) => prev.filter((_, i) => i !== index));
			queryClient.invalidateQueries({ queryKey: ['event'] });
		} catch {
			alert('Erro ao remover imagem');
		}
	}

	if (isEditing && loadingEvent) {
		return (
			<div className="flex items-center justify-center py-20">
				<div className="w-8 h-8 border-2 border-flag border-t-transparent rounded-full animate-spin" />
			</div>
		);
	}

	return (
		<div className="max-w-2xl">
			<div className="mb-8">
				<h1 className="font-display text-3xl font-black uppercase text-ink tracking-tight">
					{isEditing ? 'Editar Evento' : 'Novo Evento'}
				</h1>
			</div>

			<form onSubmit={handleSubmit} className="space-y-5">
				{error && (
					<div className="bg-red-50 border border-red-200 rounded-sm px-4 py-3 text-red-700 text-sm">
						{error}
					</div>
				)}

				<div className="bg-white border border-gray-border/60 rounded-lg p-5 space-y-4">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div className="sm:col-span-2">
							<label className="label-caps text-ink-mute text-xs block mb-1">Título *</label>
							<input required value={form.title} onChange={(e) => update('title', e.target.value)}
								className="w-full border border-gray-border/60 rounded-sm px-3 py-2 text-sm text-ink focus:outline-none focus:border-flag transition-colors" />
						</div>
						<div>
							<label className="label-caps text-ink-mute text-xs block mb-1">Slug</label>
							<input value={form.slug} onChange={(e) => update('slug', e.target.value)}
								className="w-full border border-gray-border/60 rounded-sm px-3 py-2 text-sm text-ink focus:outline-none focus:border-flag transition-colors"
								placeholder="deixar vazio para auto-gerar" />
						</div>
						<div>
							<label className="label-caps text-ink-mute text-xs block mb-1">Subtítulo</label>
							<input value={form.subtitle} onChange={(e) => update('subtitle', e.target.value)}
								className="w-full border border-gray-border/60 rounded-sm px-3 py-2 text-sm text-ink focus:outline-none focus:border-flag transition-colors" />
						</div>
					</div>

					<div>
						<label className="label-caps text-ink-mute text-xs block mb-1">Descrição Curta *</label>
						<textarea required rows={2} value={form.description} onChange={(e) => update('description', e.target.value)}
							className="w-full border border-gray-border/60 rounded-sm px-3 py-2 text-sm text-ink focus:outline-none focus:border-flag transition-colors resize-none" />
					</div>

					<div>
						<label className="label-caps text-ink-mute text-xs block mb-1">Descrição Completa</label>
						<textarea rows={4} value={form.fullDescription} onChange={(e) => update('fullDescription', e.target.value)}
							className="w-full border border-gray-border/60 rounded-sm px-3 py-2 text-sm text-ink focus:outline-none focus:border-flag transition-colors resize-y" />
					</div>
				</div>

				<div className="bg-white border border-gray-border/60 rounded-lg p-5 space-y-4">
					<h2 className="label-caps text-ink-mute text-xs uppercase tracking-wider">Datas</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div>
							<label className="label-caps text-ink-mute text-xs block mb-1">Data Início</label>
							<input type="date" value={form.startDate} onChange={(e) => update('startDate', e.target.value)}
								className="w-full border border-gray-border/60 rounded-sm px-3 py-2 text-sm text-ink focus:outline-none focus:border-flag transition-colors" />
						</div>
						<div>
							<label className="label-caps text-ink-mute text-xs block mb-1">Data Fim</label>
							<input type="date" value={form.endDate} onChange={(e) => update('endDate', e.target.value)}
								className="w-full border border-gray-border/60 rounded-sm px-3 py-2 text-sm text-ink focus:outline-none focus:border-flag transition-colors" />
						</div>
						<div>
							<label className="label-caps text-ink-mute text-xs block mb-1">Display Date *</label>
							<input required value={form.displayDate} onChange={(e) => update('displayDate', e.target.value)}
								className="w-full border border-gray-border/60 rounded-sm px-3 py-2 text-sm text-ink focus:outline-none focus:border-flag transition-colors"
								placeholder="ex: MAI · 2026" />
						</div>
						<div>
							<label className="label-caps text-ink-mute text-xs block mb-1">Display Date Long *</label>
							<input required value={form.displayDateLong} onChange={(e) => update('displayDateLong', e.target.value)}
								className="w-full border border-gray-border/60 rounded-sm px-3 py-2 text-sm text-ink focus:outline-none focus:border-flag transition-colors"
								placeholder="ex: 11 a 14 de Maio de 2026" />
						</div>
					</div>
				</div>

				<div className="bg-white border border-gray-border/60 rounded-lg p-5 space-y-4">
					<h2 className="label-caps text-ink-mute text-xs uppercase tracking-wider">Classificação</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div>
							<label className="label-caps text-ink-mute text-xs block mb-1">Tipo *</label>
							<select required value={form.type} onChange={(e) => update('type', e.target.value)}
								className="w-full border border-gray-border/60 rounded-sm px-3 py-2 text-sm text-ink focus:outline-none focus:border-flag transition-colors">
								{EVENT_TYPES.map((t) => (
									<option key={t.value} value={t.value}>{t.label}</option>
								))}
							</select>
						</div>
						<div>
							<label className="label-caps text-ink-mute text-xs block mb-1">Estado</label>
							<select value={form.status} onChange={(e) => update('status', e.target.value)}
								className="w-full border border-gray-border/60 rounded-sm px-3 py-2 text-sm text-ink focus:outline-none focus:border-flag transition-colors">
								{STATUS_OPTIONS.map((s) => (
									<option key={s.value} value={s.value}>{s.label}</option>
								))}
							</select>
						</div>
					</div>

					<label className="flex items-center gap-3 cursor-pointer">
						<input type="checkbox" checked={form.featured} onChange={(e) => update('featured', e.target.checked)}
							className="w-4 h-4 rounded border-gray-border/60 text-flag focus:ring-flag" />
						<span className="text-sm text-ink">Evento em destaque (featured)</span>
					</label>
				</div>

				<div className="bg-white border border-gray-border/60 rounded-lg p-5 space-y-4">
					<h2 className="label-caps text-ink-mute text-xs uppercase tracking-wider">Localização</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div>
							<label className="label-caps text-ink-mute text-xs block mb-1">País (ISO) *</label>
							<input required maxLength={3} value={form.country} onChange={(e) => update('country', e.target.value.toUpperCase())}
								className="w-full border border-gray-border/60 rounded-sm px-3 py-2 text-sm text-ink focus:outline-none focus:border-flag transition-colors"
								placeholder="ex: ANG" />
						</div>
						<div>
							<label className="label-caps text-ink-mute text-xs block mb-1">Nome do País *</label>
							<input required value={form.countryName} onChange={(e) => update('countryName', e.target.value)}
								className="w-full border border-gray-border/60 rounded-sm px-3 py-2 text-sm text-ink focus:outline-none focus:border-flag transition-colors"
								placeholder="ex: Angola" />
						</div>
						<div>
							<label className="label-caps text-ink-mute text-xs block mb-1">Cidade</label>
							<input value={form.city} onChange={(e) => update('city', e.target.value)}
								className="w-full border border-gray-border/60 rounded-sm px-3 py-2 text-sm text-ink focus:outline-none focus:border-flag transition-colors" />
						</div>
						<div>
							<label className="label-caps text-ink-mute text-xs block mb-1">Local/Venue</label>
							<input value={form.venue} onChange={(e) => update('venue', e.target.value)}
								className="w-full border border-gray-border/60 rounded-sm px-3 py-2 text-sm text-ink focus:outline-none focus:border-flag transition-colors" />
						</div>
					</div>
				</div>

				<div className="bg-white border border-gray-border/60 rounded-lg p-5 space-y-4">
					<h2 className="label-caps text-ink-mute text-xs uppercase tracking-wider">Imagem de Capa</h2>
					{coverUrl && (
						<div className="relative aspect-video rounded overflow-hidden bg-gray-border/30">
							<img src={coverUrl} alt="Capa" className="w-full h-full object-cover" />
						</div>
					)}
					{isEditing && (
						<div>
							<label className="label-caps text-ink-mute text-xs block mb-1">Upload de imagem</label>
							<input type="file" accept="image/*" onChange={handleCoverUpload} disabled={uploadingCover}
								className="w-full text-sm text-ink file:mr-3 file:py-1.5 file:px-3 file:rounded-sm file:border-0 file:bg-flag file:text-white file:text-xs file:label-caps file:cursor-pointer hover:file:bg-flag-dark transition-colors" />
							{uploadingCover && <p className="text-xs text-ink-mute mt-1">A enviar...</p>}
						</div>
					)}
					{!isEditing && (
						<p className="text-xs text-ink-mute">Guarde o evento primeiro para poder fazer upload de imagens.</p>
					)}
				</div>

				{isEditing && (
					<div className="bg-white border border-gray-border/60 rounded-lg p-5 space-y-4">
						<h2 className="label-caps text-ink-mute text-xs uppercase tracking-wider">Galeria de Imagens</h2>

						{galleryUrls.length > 0 && (
							<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
								{galleryUrls.map((url, i) => (
									<div key={i} className="relative aspect-video rounded overflow-hidden bg-gray-border/30 group">
										<img src={url} alt={`Galeria ${i + 1}`} className="w-full h-full object-cover" />
										<button type="button" onClick={() => handleGalleryDelete(i)}
											className="absolute top-1 right-1 w-6 h-6 bg-red-600/80 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">
											&times;
										</button>
									</div>
								))}
							</div>
						)}

						<div>
							<label className="label-caps text-ink-mute text-xs block mb-1">Adicionar imagem</label>
							<input type="file" accept="image/*" onChange={handleGalleryUpload} disabled={uploadingGallery}
								className="w-full text-sm text-ink file:mr-3 file:py-1.5 file:px-3 file:rounded-sm file:border-0 file:bg-flag file:text-white file:text-xs file:label-caps file:cursor-pointer hover:file:bg-flag-dark transition-colors" />
							{uploadingGallery && <p className="text-xs text-ink-mute mt-1">A enviar...</p>}
						</div>
					</div>
				)}

				<div className="flex items-center gap-3 pt-2">
					<button type="submit" disabled={saving}
						className="px-6 py-2.5 bg-flag hover:bg-flag-dark disabled:opacity-50 text-white label-caps text-sm rounded-sm transition-colors">
						{saving ? 'A guardar...' : isEditing ? 'Guardar alterações' : 'Criar evento'}
					</button>
					<Link to="/ot/eventos"
						className="px-6 py-2.5 bg-white border border-gray-border/60 hover:bg-gray-border-soft text-ink label-caps text-sm rounded-sm transition-colors">
						Cancelar
					</Link>
				</div>
			</form>
		</div>
	);
}
