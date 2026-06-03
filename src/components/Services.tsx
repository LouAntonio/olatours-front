import { motion } from 'motion/react';
import { motion as m, stagger } from '../styles/tokens';
import { Button } from './Button';

type Service = {
	n: 'I' | 'II' | 'III';
	key: string;
	title: string;
	intro: string;
	points: string[];
	tag: string;
	tone: 'sky' | 'navy' | 'flag';
};

const services: Service[] = [
	{
		n: 'I',
		key: 'negocios',
		title: 'Turismo de Negócios',
		intro: 'A logística discreta que faz uma visita oficial parecer simples — porque nós tratamos do que não se vê.',
		points: [
			'Transporte executivo dedicado',
			'Gestão de logística para delegações',
			'Auxílio em eventos e conferências empresariais',
			'Recepção e protocolo em aeroporto',
		],
		tag: 'EXECUTIVO',
		tone: 'flag',
	},
	{
		n: 'II',
		key: 'investimento',
		title: 'Turismo de Investimento',
		intro: 'Abrimos portas institucionais em Angola e na África subsariana para quem decide onde o capital se aplica.',
		points: [
			'Atracção de investidores e fundos',
			'Reuniões com decisores institucionais',
			'Abertura de portas governamentais',
			'Visitas estratégicas a projectos e ZEE',
		],
		tag: 'INSTITUCIONAL',
		tone: 'navy',
	},
	{
		n: 'III',
		key: 'frota',
		title: 'Transporte & Frota',
		intro: 'Operação mensal, traslados de aeroporto e suporte em conferências — para equipas que precisam de pontualidade todos os dias.',
		points: [
			'Transporte mensal para funcionários',
			'Traslados executivos aeroporto ↔ hotel',
			'Suporte em conferências e feiras',
			'Relatórios de serviço mensais',
		],
		tag: 'OPERACIONAL',
		tone: 'flag',
	},
];

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

export function Services() {
	return (
		<>
			{/* ===== HERO ===== */}
			<section className="relative bg-navy min-h-dvh flex items-center pt-16 sm:pt-20 pb-12 sm:pb-16 overflow-hidden">
				<div className="pointer-events-none absolute inset-0 opacity-[0.03]">
					<div
						className="corporate-grid h-full w-full"
						style={{ backgroundSize: '64px 64px' }}
					/>
				</div>

				<div className="pointer-events-none absolute -top-8 right-0 sm:right-8 select-none">
					<span className="font-display font-black text-[clamp(8rem,20vw,18rem)] leading-none text-white/[0.04]">
						SERVIÇOS
					</span>
				</div>

				<div className="pointer-events-none absolute top-0 right-0 w-48 h-48 sm:w-80 sm:h-80 border-r border-t border-white/[0.04] rounded-tr-[100px] corner-pulse" />

				<div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
					<div className="grid grid-cols-12 gap-6">
						<div className="col-span-12 lg:col-span-8">
							<div className="flex items-center gap-3 mb-6">
								<span className="h-px w-8 bg-flag/40" />
								<span className="label-caps text-flag tracking-[0.18em]">
									SERVIÇOS · EXECUTIVO · INSTITUCIONAL ·
									OPERACIONAL
								</span>
							</div>

							<h1 className="font-display font-black uppercase leading-[0.82] tracking-tight text-[clamp(3.5rem,10vw,8rem)] text-white">
								O que <span className="text-flag">fazemos</span>
								.
							</h1>

							<p className="mt-6 text-lg sm:text-xl leading-relaxed text-white/70 max-w-2xl">
								Em todos os serviços que prestamos, prezamos
								pela pontualidade, privacidade e excelência.
								Três práticas. Zero atalhos.
							</p>
						</div>

						<div className="col-span-12 lg:col-span-4 flex flex-col justify-end items-start sm:items-end pt-8 lg:pt-0">
							<div className="relative">
								<div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-flag/40" />
								<div className="border-l-2 border-flag pl-5">
									<p className="text-white/50 label-caps mb-2">
										PRINCÍPIOS
									</p>
									<div className="flex flex-wrap gap-2">
										{[
											'Pontualidade',
											'Privacidade',
											'Excelência',
										].map((p, i) => (
											<span
												key={p}
												className="label-caps px-2.5 py-1 border border-white/20 text-white/80 rounded-sm hover:border-flag hover:text-flag transition-colors"
											>
												0{i + 1} {p}
											</span>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ===== SERVICES GRID ===== */}
			<section className="relative bg-gray-light py-20 sm:py-28 overflow-hidden">
				<div className="pointer-events-none absolute inset-0 opacity-[0.02]">
					<div className="corporate-grid h-full w-full" />
				</div>

				<div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
					<div className="grid grid-cols-12 gap-6 mb-14 sm:mb-20">
						<div className="col-span-12 lg:col-span-6">
							<span className="accent-bar-flag block mb-4" />
							<h2 className="font-display font-black uppercase leading-[0.86] tracking-tight text-[clamp(2.5rem,6.5vw,5rem)]">
								Serviços{' '}
								<span className="text-flag">
									especializados
								</span>
								.
							</h2>
						</div>
						<div className="col-span-12 lg:col-span-4 lg:col-start-9 flex items-end">
							<p className="text-ink-mute text-sm sm:text-base leading-relaxed">
								Cada serviço é desenhado para manter o mesmo
								padrão de excelência, pontualidade e
								privacidade.
							</p>
						</div>
					</div>

					<motion.div
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, margin: '-100px' }}
						variants={container}
						className="grid grid-cols-12 gap-5 sm:gap-6"
					>
						{services.map((s, i) => {
							const accent = accentMap[s.tone];
							return (
								<motion.article
									key={s.key}
									variants={item}
									className="col-span-12 sm:col-span-6 lg:col-span-4 relative group"
								>
									<div
										className={`relative bg-white border border-gray-border rounded-b-lg overflow-hidden transition-all duration-500 card-elevated ${i % 2 === 1 ? 'lg:translate-y-8' : ''}`}
									>
										<div className="pointer-events-none absolute top-2 right-4 select-none">
											<span
												className="font-display font-black text-[clamp(3rem,5vw,4rem)] leading-none"
												style={{
													color: `rgba(${accent.rgb}, 0.15)`,
												}}
											>
												{s.n}
											</span>
										</div>

										<div
											className="h-1.5 w-full"
											style={{ background: accent.css }}
										/>

										<div className="p-6 sm:p-8">
											<div className="flex items-center gap-3 mb-4">
												<span
													className="h-1.5 w-1.5 rounded-full"
													style={{
														background: accent.css,
													}}
												/>
												<span
													className="label-caps"
													style={{
														color: accent.css,
													}}
												>
													{s.tag}
												</span>
											</div>

											<h3 className="font-display text-2xl sm:text-3xl font-black uppercase leading-tight tracking-tight text-ink">
												{s.title}
											</h3>

											<p className="mt-3 text-ink-soft leading-relaxed">
												{s.intro}
											</p>

											<div className="rule my-5" />

											<ul className="space-y-3">
												{s.points.map((p, j) => (
													<li
														key={p}
														className="flex items-start gap-3 text-ink leading-relaxed"
													>
														<span
															className="label-caps mt-1 shrink-0 w-6"
															style={{
																color: accent.css,
															}}
														>
															0{j + 1}
														</span>
														<span>{p}</span>
													</li>
												))}
											</ul>

											<div className="mt-6 pt-5 border-t border-gray-border flex items-center justify-between">
												<span className="label-caps text-ink-mute">
													{s.tag}
												</span>
												<svg
													viewBox="0 0 24 24"
													fill="none"
													aria-hidden="true"
													className="h-5 w-5 text-ink-mute group-hover:text-flag group-hover:translate-x-1 transition-all"
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
								</motion.article>
							);
						})}
					</motion.div>
				</div>
			</section>

			{/* ===== CTA ===== */}
			<section className="relative bg-white py-20 sm:py-28 overflow-hidden">
				<div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-border to-transparent" />
				<div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-border to-transparent" />

				<div className="pointer-events-none absolute -top-8 -right-8 select-none">
					<span className="font-display font-black text-[clamp(6rem,15vw,14rem)] leading-none text-flag/[0.12]">
						SERVIÇOS
					</span>
				</div>

				<div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 text-center">
					<span className="accent-bar-flag block mx-auto mb-4" />
					<h2 className="font-display font-black uppercase leading-[0.86] tracking-tight text-[clamp(2.5rem,6.5vw,5rem)]">
						Três práticas.{' '}
						<span className="text-flag">Zero atalhos</span>.
					</h2>
					<p className="mt-6 text-xl sm:text-2xl leading-relaxed text-ink-soft max-w-2xl mx-auto">
						Pontualidade, privacidade e excelência — o padrão que
						aplicamos em cada serviço, todos os dias.
					</p>
					<div className="mt-10">
						<Button
							as="a"
							href="/contacto"
							variant="flag"
							size="lg"
						>
							Solicitar serviço
						</Button>
					</div>
				</div>
			</section>
		</>
	);
}
