import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { motion } from 'motion/react';
import { Button } from '../components/Button';
import { motion as m, stagger } from '../styles/tokens';
import { fetchEventos } from '../data/events';
import type { Evento } from '../data/events';

const container = {
	hidden: {},
	show: { transition: { staggerChildren: stagger.wide } },
};

const item = {
	hidden: { opacity: 0, y: 32 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: m.duration.slow, ease: m.ease.out },
	},
};

const accentMap: Record<string, { css: string; rgb: string }> = {
	flag: { css: 'var(--color-flag)', rgb: '181, 72, 42' },
	sky: { css: 'var(--color-sky)', rgb: '20, 121, 193' },
	navy: { css: 'var(--color-navy)', rgb: '26, 43, 74' },
};

function SkeletonCard() {
	return (
		<div className="col-span-12 sm:col-span-6 animate-pulse">
			<div className="bg-gray-border/40 rounded-lg overflow-hidden min-h-[320px] flex flex-col justify-end p-6 sm:p-8">
				<div className="space-y-3">
					<div className="h-3 w-28 bg-gray-border/60 rounded" />
					<div className="h-7 w-3/4 bg-gray-border/60 rounded" />
					<div className="h-4 w-1/2 bg-gray-border/40 rounded" />
					<div className="h-4 w-full bg-gray-border/30 rounded" />
				</div>
			</div>
		</div>
	);
}

export function Agenda() {
	useDocumentTitle('Agenda');

	const [events, setEvents] = useState<Evento[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchEventos().then((data) => {
			setEvents(data);
			setLoading(false);
		});
	}, []);

	return (
		<>
			{/* ===== HERO ===== */}
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
									<p className="text-white/50 label-caps mb-1">
										EVENTOS · 2024–2025
									</p>
									<p className="font-display text-3xl sm:text-4xl font-black text-white leading-tight">
										Alto{' '}
										<span className="text-flag">
											perfil
										</span>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ===== EVENTS ===== */}
			<section className="relative bg-cream-50 py-20 sm:py-28 overflow-hidden">
				<div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
					<div className="grid grid-cols-12 gap-6 mb-14 sm:mb-20">
						<div className="col-span-12 lg:col-span-6">
							<span className="accent-bar-flag block mb-4" />
							<h2 className="font-display font-black uppercase leading-[0.86] tracking-tight text-[clamp(2.5rem,6.5vw,5rem)]">
								Eventos em{' '}
								<span className="text-flag">destaque</span>.
							</h2>
						</div>
						<div className="col-span-12 lg:col-span-4 lg:col-start-9 flex items-end">
							<p className="text-ink-mute text-sm sm:text-base leading-relaxed">
								Missões oficiais, recepções de Estado e
								facilitação de negócios — o registo da nossa
								agenda institucional.
							</p>
						</div>
					</div>

					{loading ? (
						<div className="grid grid-cols-12 gap-5 sm:gap-6">
							<SkeletonCard />
							<SkeletonCard />
							<SkeletonCard />
						</div>
					) : (
						<motion.div
							initial="hidden"
							whileInView="show"
							viewport={{ once: true, margin: '-100px' }}
							variants={container}
							className="grid grid-cols-12 gap-5 sm:gap-6"
						>
							{events.map((event, i) => {
								const accent = accentMap[event.accent];
								const hasPhoto = event.photos?.[0]?.src;
								return (
									<motion.article
										key={event.id}
										variants={item}
										className={`col-span-12 sm:col-span-6 relative group ${events.length % 2 !== 0 && i === events.length - 1 ? 'sm:col-start-4' : ''}`}
									>
										<Link
											to={`/agenda/${event.id}`}
											className="block h-full"
										>
											<div
												className={`relative rounded-lg overflow-hidden transition-all duration-500 min-h-[340px] sm:min-h-[380px] flex flex-col justify-end ${i % 2 === 1 ? 'sm:translate-y-8' : ''} group-hover:-translate-y-0.5`}
											>
												{/* Background image or gradient */}
												{hasPhoto ? (
													<>
														<img
															src={event.photos![0].src}
															alt={event.photos![0].alt}
															className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
														/>
														<div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/70 to-navy/20" />
													</>
												) : (
													<div
														className="absolute inset-0"
														style={{
															background: `linear-gradient(135deg, ${accent.css}, ${accent.css}99)`,
														}}
													/>
												)}

												{/* Content overlay */}
												<div className="relative p-6 sm:p-8 flex flex-col justify-end min-h-[340px] sm:min-h-[380px]">
													<div className="mb-auto">
														<span
															className="label-caps inline-block px-2.5 py-1 rounded-sm bg-white/10 backdrop-blur-sm text-white border border-white/20"
														>
															{event.type} · {event.country}
														</span>
													</div>

													<div className="mt-auto">
														<h3 className="font-display text-2xl sm:text-3xl font-black uppercase leading-tight tracking-tight text-white">
															{event.title}
														</h3>

														{event.subtitle && (
															<p className="mt-1.5 text-white/70 text-lg font-semibold">
																{event.subtitle}
															</p>
														)}

														<p className="mt-3 text-white/50 leading-relaxed text-sm sm:text-base line-clamp-2">
															{event.description}
														</p>

														<div className="mt-4 flex items-center gap-2 text-white/40 group-hover:text-white/70 transition-colors">
															<span className="label-caps text-xs">Saber mais</span>
															<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform">
																<path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
															</svg>
														</div>
													</div>
												</div>
											</div>
										</Link>
									</motion.article>
								);
							})}
						</motion.div>
					)}
				</div>
			</section>

			{/* ===== CTA ===== */}
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
