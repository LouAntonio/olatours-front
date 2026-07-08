import { useAuthStore } from '../../stores/auth.ts';
import { useAdminEvents } from '../../hooks/useEvents.ts';

export function AdminDashboard() {
	const user = useAuthStore((s) => s.user);
	const { data, isLoading } = useAdminEvents(1, 100);

	const total = data?.total ?? 0;
	const published = data?.events.filter((e) => e.featured !== undefined).length ?? 0;

	return (
		<div>
			<div className="mb-8">
				<h1 className="font-display text-3xl font-black uppercase text-ink tracking-tight">
					Dashboard
				</h1>
				<p className="mt-1 text-ink-mute text-sm">
					Bem-vindo, {user?.name}. Aqui está o resumo do seu conteúdo.
				</p>
			</div>

			{isLoading ? (
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
					{[1, 2, 3].map((i) => (
						<div key={i} className="bg-white border border-gray-border/60 rounded-lg p-6 animate-pulse">
							<div className="h-3 w-20 bg-gray-border/60 rounded mb-3" />
							<div className="h-8 w-16 bg-gray-border/60 rounded" />
						</div>
					))}
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
					<div className="bg-white border border-gray-border/60 rounded-lg p-6 card-elevated">
						<p className="label-caps text-ink-mute text-xs mb-1">Total de Eventos</p>
						<p className="font-display text-4xl font-black text-navy">{total}</p>
					</div>
					<div className="bg-white border border-gray-border/60 rounded-lg p-6 card-elevated">
						<p className="label-caps text-ink-mute text-xs mb-1">Publicados</p>
						<p className="font-display text-4xl font-black text-flag">{published}</p>
					</div>
					<div className="bg-white border border-gray-border/60 rounded-lg p-6 card-elevated">
						<p className="label-caps text-ink-mute text-xs mb-1">Administradores</p>
						<p className="font-display text-4xl font-black text-sky">1</p>
					</div>
				</div>
			)}

			<div className="mt-10">
				<h2 className="font-display text-xl font-black uppercase text-ink tracking-tight mb-4">
					Últimos Eventos
				</h2>
				{isLoading ? (
					<div className="space-y-3">
						{[1, 2, 3].map((i) => (
							<div key={i} className="bg-white border border-gray-border/60 rounded-lg p-4 animate-pulse">
								<div className="h-4 w-3/4 bg-gray-border/60 rounded" />
							</div>
						))}
					</div>
				) : data && data.events.length > 0 ? (
					<div className="space-y-2">
						{data.events.slice(0, 5).map((event) => (
							<div
								key={event.id}
								className="bg-white border border-gray-border/60 rounded-lg px-4 py-3 flex items-center justify-between"
							>
								<div className="min-w-0 flex-1">
									<p className="text-sm font-semibold text-ink truncate">{event.title}</p>
									<p className="text-xs text-ink-mute">{event.date} · {event.type}</p>
								</div>
								<span className="label-caps text-[10px] text-ink-mute shrink-0 ml-3">
									{event.countryName}
								</span>
							</div>
						))}
					</div>
				) : (
					<p className="text-ink-mute text-sm">Nenhum evento encontrado.</p>
				)}
			</div>
		</div>
	);
}
