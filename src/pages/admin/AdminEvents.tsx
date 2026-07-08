import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdminEvents, deleteEvent } from '../../hooks/useEvents.ts';
import { useQueryClient } from '@tanstack/react-query';

export function AdminEvents() {
	const queryClient = useQueryClient();
	const [page, setPage] = useState(1);
	const { data, isLoading, isError } = useAdminEvents(page, 20);
	const [deleting, setDeleting] = useState<string | null>(null);

	async function handleDelete(id: string) {
		if (!window.confirm('Tem a certeza que deseja eliminar este evento?')) return;
		setDeleting(id);
		try {
			await deleteEvent(id);
			queryClient.invalidateQueries({ queryKey: ['events'] });
		} catch {
			alert('Erro ao eliminar evento');
		} finally {
			setDeleting(null);
		}
	}

	return (
		<div>
			<div className="flex items-center justify-between mb-8">
				<div>
					<h1 className="font-display text-3xl font-black uppercase text-ink tracking-tight">
						Eventos
					</h1>
					<p className="mt-1 text-ink-mute text-sm">
						{data ? `${data.total} evento(s) registado(s)` : 'Gerir eventos'}
					</p>
				</div>
				<Link
					to="/ot/eventos/novo"
					className="inline-flex items-center gap-2 px-4 py-2.5 bg-flag hover:bg-flag-dark text-white label-caps text-sm rounded-sm transition-colors"
				>
					<svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
						<path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" />
					</svg>
					Novo Evento
				</Link>
			</div>

			{isLoading ? (
				<div className="bg-white border border-gray-border/60 rounded-lg overflow-hidden">
					<div className="p-6 space-y-4">
						{[1, 2, 3, 4, 5].map((i) => (
							<div key={i} className="h-12 bg-gray-border/40 animate-pulse rounded" />
						))}
					</div>
				</div>
			) : isError ? (
				<div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-700 text-sm">
					Erro ao carregar eventos.
				</div>
			) : data && data.events.length > 0 ? (
				<>
					<div className="bg-white border border-gray-border/60 rounded-lg overflow-hidden">
						<table className="w-full text-sm">
							<thead>
								<tr className="border-b border-gray-border/60 bg-cream-50">
									<th className="text-left px-4 py-3 label-caps text-ink-mute text-[10px]">Título</th>
									<th className="text-left px-4 py-3 label-caps text-ink-mute text-[10px] hidden sm:table-cell">
										Tipo
									</th>
									<th className="text-left px-4 py-3 label-caps text-ink-mute text-[10px] hidden md:table-cell">
										País
									</th>
									<th className="text-left px-4 py-3 label-caps text-ink-mute text-[10px] hidden sm:table-cell">
										Data
									</th>
									<th className="text-right px-4 py-3 label-caps text-ink-mute text-[10px]">
										Ações
									</th>
								</tr>
							</thead>
							<tbody>
								{data.events.map((event) => (
									<tr key={event.id} className="border-b border-gray-border/30 hover:bg-cream-50/50 transition-colors">
										<td className="px-4 py-3.5">
											<p className="font-semibold text-ink truncate max-w-[200px] sm:max-w-xs">
												{event.title}
											</p>
										</td>
										<td className="px-4 py-3.5 text-ink-mute hidden sm:table-cell">
											{event.type}
										</td>
										<td className="px-4 py-3.5 text-ink-mute hidden md:table-cell">
											{event.countryName}
										</td>
										<td className="px-4 py-3.5 text-ink-mute hidden sm:table-cell">
											{event.date}
										</td>
										<td className="px-4 py-3.5 text-right">
											<div className="flex items-center justify-end gap-2">
												<Link
													to={`/ot/eventos/${event.slug}/editar`}
													className="label-caps text-[10px] text-sky hover:text-sky-dark transition-colors"
												>
													Editar
												</Link>
												<button
													type="button"
													onClick={() => handleDelete(event.id)}
													disabled={deleting === event.id}
													className="label-caps text-[10px] text-red-500 hover:text-red-600 transition-colors disabled:opacity-50"
												>
													{deleting === event.id ? 'A eliminar...' : 'Eliminar'}
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{data.total > 20 && (
						<div className="flex items-center justify-between mt-5">
							<p className="text-xs text-ink-mute">
								Página {page} de {Math.ceil(data.total / 20)}
							</p>
							<div className="flex gap-2">
								<button
									type="button"
									onClick={() => setPage((p) => Math.max(1, p - 1))}
									disabled={page <= 1}
									className="px-3 py-1.5 bg-white border border-gray-border/60 rounded-sm label-caps text-xs text-ink hover:bg-gray-border-soft transition-colors disabled:opacity-40"
								>
									Anterior
								</button>
								<button
									type="button"
									onClick={() => setPage((p) => p + 1)}
									disabled={page >= Math.ceil(data.total / 20)}
									className="px-3 py-1.5 bg-white border border-gray-border/60 rounded-sm label-caps text-xs text-ink hover:bg-gray-border-soft transition-colors disabled:opacity-40"
								>
									Seguinte
								</button>
							</div>
						</div>
					)}
				</>
			) : (
				<div className="bg-white border border-gray-border/60 rounded-lg p-10 text-center">
					<p className="text-ink-mute text-sm">Nenhum evento encontrado.</p>
					<Link
						to="/ot/eventos/novo"
						className="mt-4 inline-flex items-center gap-2 text-flag hover:text-flag-dark label-caps text-sm transition-colors"
					>
						Criar primeiro evento
					</Link>
				</div>
			)}
		</div>
	);
}
