import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { motion } from 'motion/react';
import { Button } from '../components/Button';
import { motion as m, stagger } from '../styles/tokens';
import { useEvents } from '../hooks/useEvents';
import type { Evento } from '../data/events';

const MONTH_ORDER: Record<string, number> = {
	JAN: 1,
	FEV: 2,
	FEB: 2,
	MAR: 3,
	ABR: 4,
	APR: 4,
	MAI: 5,
	MAY: 5,
	JUN: 6,
	JUL: 7,
	AGO: 8,
	AUG: 8,
	SET: 9,
	SEP: 9,
	OUT: 10,
	OCT: 10,
	NOV: 11,
	DEZ: 12,
	DEC: 12,
};

const MONTH_LABEL: Record<string, string> = {
	JAN: 'Janeiro',
	FEV: 'Fevereiro',
	MAR: 'Março',
	ABR: 'Abril',
	MAI: 'Maio',
	JUN: 'Junho',
	JUL: 'Julho',
	AGO: 'Agosto',
	SET: 'Setembro',
	OUT: 'Outubro',
	NOV: 'Novembro',
	DEZ: 'Dezembro',
};

function parseMonthKey(date: string): {
	abbr: string;
	year: number;
	sortKey: string;
} {
	const m = date.match(/([A-Za-zÀ-ÿ]{3,})/);
	const y = date.match(/(\d{4})/);
	const abbr = m ? m[1].substring(0, 3).toUpperCase() : 'JAN';
	const year = y ? parseInt(y[1], 10) : 2026;
	const order = MONTH_ORDER[abbr] ?? 1;
	return { abbr, year, sortKey: `${year}-${String(order).padStart(2, '0')}` };
}

function parseDay(date: string): number {
	const d = date.match(/^(\d+)/);
	return d ? parseInt(d[1], 10) : 1;
}

type MonthGroup = {
	sortKey: string;
	abbr: string;
	year: number;
	label: string;
	events: Evento[];
};

function groupByMonth(events: Evento[]): MonthGroup[] {
	const groups = new Map<string, MonthGroup>();

	for (const event of events) {
		const { abbr, year, sortKey } = parseMonthKey(event.date);
		if (!groups.has(sortKey)) {
			groups.set(sortKey, {
				sortKey,
				abbr,
				year,
				label: `${MONTH_LABEL[abbr] ?? abbr} ${year}`,
				events: [],
			});
		}
		groups.get(sortKey)!.events.push(event);
	}

	const sorted = Array.from(groups.values()).sort((a, b) =>
		a.sortKey.localeCompare(b.sortKey),
	);

	for (const group of sorted) {
		group.events.sort((a, b) => parseDay(a.date) - parseDay(b.date));
	}

	return sorted;
}

const container = {
	hidden: {},
	show: { transition: { staggerChildren: stagger.tight } },
};

const item = {
	hidden: { opacity: 0, y: 24 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: m.duration.base, ease: m.ease.out },
	},
};

const accentMap: Record<string, { css: string; rgb: string }> = {
	flag: { css: 'var(--color-flag)', rgb: '181, 72, 42' },
	sky: { css: 'var(--color-sky)', rgb: '20, 121, 193' },
	navy: { css: 'var(--color-navy)', rgb: '26, 43, 74' },
};

type CardProps = { event: Evento; accent: { css: string; rgb: string } };

function FeaturedCard({ event, accent }: CardProps) {
	const hasPhoto = event.photos?.[0]?.src;
	return (
		<motion.article
			variants={item}
			className="col-span-12 lg:col-span-6 relative group"
		>
			<Link to={`/agenda/${event.slug}`} className="block h-full">
				<div className="relative rounded-lg overflow-hidden min-h-[400px] sm:min-h-[460px] flex flex-col justify-end">
					{hasPhoto ? (
						<>
							<img
								src={event.photos![0].src}
								alt={event.photos![0].alt}
								className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/60 to-navy/20" />
						</>
					) : (
						<div
							className="absolute inset-0"
							style={{
								background: `linear-gradient(135deg, ${accent.css}, ${accent.css}99)`,
							}}
						/>
					)}

					<div className="absolute top-4 left-4 z-10">
						<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-white/10 backdrop-blur-sm text-white/80 border border-white/15 label-caps text-[10px]">
							{event.date}
						</span>
					</div>

					<div className="absolute top-0 right-0 z-10">
						<div
							className="w-16 h-px"
							style={{ background: accent.css, opacity: 0.5 }}
						/>
						<div
							className="w-px h-16 ml-auto"
							style={{ background: accent.css, opacity: 0.5 }}
						/>
					</div>

					<div className="relative p-6 sm:p-8 flex flex-col justify-end min-h-[400px] sm:min-h-[460px]">
						<div className="mb-auto">
							<span
								className="label-caps inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm"
								style={{ background: accent.css }}
							>
								<span className="h-1.5 w-1.5 rounded-full bg-white/70" />
								{event.type} · {event.countryName}
							</span>
						</div>

						<div className="mt-auto">
							<h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase leading-[0.86] tracking-tight text-white">
								{event.title}
							</h3>

							{event.subtitle && (
								<p className="mt-2 text-white/70 text-lg sm:text-xl font-semibold">
									{event.subtitle}
								</p>
							)}

							<p className="mt-3 text-white/50 leading-relaxed text-sm sm:text-base line-clamp-2">
								{event.description}
							</p>

							<div className="mt-6 flex items-center gap-2 text-white/40 group-hover:text-white/70 transition-colors">
								<span className="label-caps text-xs">
									Saber mais
								</span>
								<svg
									viewBox="0 0 24 24"
									fill="none"
									aria-hidden="true"
									className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform"
								>
									<path
										d="M5 12h14M13 6l6 6-6 6"
										stroke="currentColor"
										strokeWidth="1.5"
									/>
								</svg>
							</div>
						</div>
					</div>
				</div>
			</Link>
		</motion.article>
	);
}

function CompactCard({ event, accent }: CardProps) {
	const hasPhoto = event.photos?.[0]?.src;
	return (
		<motion.article
			variants={item}
			className="col-span-12 sm:col-span-6 lg:col-span-4 relative group"
		>
			<Link to={`/agenda/${event.slug}`} className="block h-full">
				<div className="relative h-full rounded-lg overflow-hidden border border-gray-border/60 bg-white transition-all duration-500 card-elevated">
					<div className="relative aspect-[16/9] overflow-hidden">
						{hasPhoto ? (
							<>
								<img
									src={event.photos![0].src}
									alt={event.photos![0].alt}
									className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
							</>
						) : (
							<div
								className="absolute inset-0"
								style={{
									background: `linear-gradient(135deg, ${accent.css}, ${accent.css}cc)`,
								}}
							/>
						)}
						<div className="absolute bottom-2 left-2">
							<span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-white/90 backdrop-blur-sm text-ink label-caps text-[10px]">
								{event.date}
							</span>
						</div>
					</div>

					<div className="p-4 sm:p-5">
						<div className="flex items-center gap-2 mb-2">
							<span
								className="label-caps text-[10px]"
								style={{ color: accent.css }}
							>
								{event.type}
							</span>
							<span className="text-ink-mute/40">·</span>
							<span className="label-caps text-[10px] text-ink-mute">
								{event.countryName}
							</span>
						</div>

						<h3 className="font-display text-lg sm:text-xl font-black uppercase leading-tight tracking-tight text-ink">
							{event.title}
						</h3>

						{event.subtitle && (
							<p className="mt-0.5 text-ink-mute text-sm leading-snug">
								{event.subtitle}
							</p>
						)}

						<p className="mt-2 text-ink-mute text-xs leading-relaxed line-clamp-1">
							{event.description}
						</p>

						<div className="mt-3 flex items-center gap-1 text-ink-mute/60 group-hover:text-flag/70 transition-colors">
							<span className="label-caps text-[10px]">
								Saber mais
							</span>
							<svg
								viewBox="0 0 16 16"
								fill="none"
								aria-hidden="true"
								className="h-2.5 w-2.5 group-hover:translate-x-0.5 transition-transform"
							>
								<path
									d="M3 8h10M8.5 3.5L13 8l-4.5 4.5"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="square"
								/>
							</svg>
						</div>
					</div>
				</div>
			</Link>
		</motion.article>
	);
}

function SkeletonFeatured() {
	return (
		<div className="col-span-12 lg:col-span-6 animate-pulse">
			<div className="bg-gray-border/40 rounded-lg overflow-hidden min-h-[400px] flex flex-col justify-end p-6 sm:p-8">
				<div className="space-y-3">
					<div className="h-3 w-28 bg-gray-border/60 rounded" />
					<div className="h-8 w-3/4 bg-gray-border/60 rounded" />
					<div className="h-4 w-1/2 bg-gray-border/40 rounded" />
					<div className="h-4 w-full bg-gray-border/30 rounded" />
				</div>
			</div>
		</div>
	);
}

function SkeletonCompact() {
	return (
		<div className="col-span-12 sm:col-span-6 lg:col-span-4 animate-pulse">
			<div className="bg-gray-border/40 rounded-lg overflow-hidden">
				<div className="aspect-video bg-gray-border/50" />
				<div className="p-4 space-y-2">
					<div className="h-2.5 w-20 bg-gray-border/60 rounded" />
					<div className="h-5 w-3/4 bg-gray-border/60 rounded" />
					<div className="h-3 w-full bg-gray-border/30 rounded" />
				</div>
			</div>
		</div>
	);
}

export function Agenda() {
	useDocumentTitle('Agenda');

	const { data: events = [], isLoading } = useEvents();

	const monthGroups = useMemo(() => groupByMonth(events), [events]);

	return (
		<>
			<section className="relative bg-navy min-h-dvh flex items-center pt-16 sm:pt-20 pb-12 sm:pb-16 overflow-hidden grain">
				<div className="pointer-events-none absolute top-0 right-0 w-48 h-48 sm:w-80 sm:h-80 border-r border-t border-white/[0.04] rounded-tr-[100px] corner-pulse" />

				<div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
					<div className="grid grid-cols-12 gap-6">
						<div className="col-span-12 lg:col-span-8">
							<div className="flex items-center gap-3 mb-6">
								<span className="h-px w-8 bg-flag/40" />
								<span className="label-caps text-flag tracking-[0.18em]">
									EVENTOS · 2024–2025
								</span>
							</div>

							<h1 className="font-display font-black uppercase leading-[0.82] tracking-tight text-[clamp(3.5rem,10vw,8rem)] text-white">
								Agenda de{' '}
								<span className="text-flag">Eventos</span>
							</h1>

							<p className="mt-6 text-lg sm:text-xl leading-relaxed text-white/70 max-w-2xl">
								A Ola Tours já recebeu Chefes de Estado, altos
								representantes de instituições financeiras
								internacionais e delegações empresariais.
								Conheça os eventos que marcaram a nossa agenda.
							</p>
						</div>

						<div className="col-span-12 lg:col-span-4 flex flex-col justify-end items-start sm:items-end pt-8 lg:pt-0">
							<div className="relative">
								<div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-flag/40" />
								<div className="border-l-2 border-flag pl-5">
									<p className="text-white/50 label-caps mb-2">
										AGENDA
									</p>
									<div className="flex flex-wrap gap-2">
										{[
											'CORPORATIVO',
											'INSTITUCIONAL',
											'EXPERIÊNCIAS',
										].map((p) => (
											<span
												key={p}
												className="label-caps px-2.5 py-1 border border-white/20 text-white/80 rounded-sm hover:border-flag hover:text-flag transition-colors"
											>
												{p}
											</span>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="relative bg-cream-50 py-20 sm:py-28">
				<div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
					<div className="grid grid-cols-12 gap-6 mb-14 sm:mb-20">
						<div className="col-span-12 lg:col-span-6">
							<span className="accent-bar-flag block mb-4" />
							<h2 className="font-display font-black uppercase leading-[0.86] tracking-tight text-[clamp(2.5rem,6.5vw,5rem)]">
								Linha do{' '}
								<span className="text-flag">tempo</span>.
							</h2>
						</div>
						<div className="col-span-12 lg:col-span-4 lg:col-start-9 flex items-end">
							<p className="text-ink-mute text-sm sm:text-base leading-relaxed">
								Missões oficiais, recepções de Estado,
								facilitação de negócios e experiências — o
								registo completo da nossa agenda.
							</p>
						</div>
					</div>

					{isLoading ? (
						<div className="grid grid-cols-12 gap-5 sm:gap-6">
							<SkeletonFeatured />
							<SkeletonFeatured />
							<SkeletonCompact />
							<SkeletonCompact />
							<SkeletonCompact />
						</div>
					) : (
						<div className="space-y-12 sm:space-y-16">
							{monthGroups.map((group) => (
								<div key={group.sortKey}>
									<div className="sticky top-16 sm:top-[72px] z-10 bg-cream-50/90 backdrop-blur-md -mx-5 sm:-mx-8 px-5 sm:px-8 py-3.5 sm:py-4 border-b border-gray-border/40 mb-6 sm:mb-8">
										<div className="flex items-center gap-4">
											<span className="accent-bar-flag shrink-0" />
											<h3 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight text-ink">
												{group.label}
											</h3>
											<span className="h-px flex-1 bg-gray-border/60" />
											<span className="label-caps text-ink-mute text-[10px] shrink-0">
												{group.events.length}{' '}
												{group.events.length === 1
													? 'evento'
													: 'eventos'}
											</span>
										</div>
									</div>

									<motion.div
										initial="hidden"
										whileInView="show"
										viewport={{
											once: true,
											margin: '-60px',
										}}
										variants={container}
										className="grid grid-cols-12 gap-5 sm:gap-6"
									>
										{group.events.map((event) => {
											const accent =
												accentMap[event.accent];
											return event.featured ? (
												<FeaturedCard
													key={event.id}
													event={event}
													accent={accent}
												/>
											) : (
												<CompactCard
													key={event.id}
													event={event}
													accent={accent}
												/>
											);
										})}
									</motion.div>
								</div>
							))}
						</div>
					)}
				</div>
			</section>

			<section className="relative bg-white py-20 sm:py-28 overflow-hidden">
				<div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 text-center">
					<span className="accent-bar-flag block mx-auto mb-4" />
					<h2 className="font-display font-black uppercase leading-[0.86] tracking-tight text-[clamp(2.5rem,6.5vw,5rem)]">
						O próximo evento{' '}
						<span className="text-flag">pode ser o seu</span>.
					</h2>
					<p className="mt-6 text-xl sm:text-2xl leading-relaxed text-ink-soft max-w-2xl mx-auto">
						Conte-nos a sua visão. Organizamos a logística, o
						protocolo e a recepção — para que a sua delegação só
						precise de aparecer.
					</p>
					<div className="mt-10">
						<Button
							as="a"
							href="/contacto"
							variant="flag"
							size="lg"
						>
							Solicitar evento
						</Button>
					</div>
				</div>
			</section>
		</>
	);
}
