import { motion } from 'motion/react';
import { motion as m, stagger } from '../styles/tokens';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { Cover } from '../components/Cover';
import { Testimonials } from '../components/Testimonials';
import { PartnersSlider } from '../components/PartnersSlider';
import { Button } from '../components/Button';

type Tone = 'flag' | 'navy' | 'sky';

type Service = {
	n: 'I' | 'II' | 'III';
	key: string;
	title: string;
	intro: string;
	points: string[];
	tag: string;
	tone: Tone;
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

const accentMap: Record<Tone, { css: string; rgb: string }> = {
	flag: { css: 'var(--color-flag)', rgb: '181, 72, 42' },
	navy: { css: 'var(--color-navy)', rgb: '26, 43, 74' },
	sky: { css: 'var(--color-sky)', rgb: '20, 121, 193' },
};

export function Home() {
	useDocumentTitle('Home');

	return (
		<>
			<Cover />

			{/* ===== A NOSSA HISTÓRIA ===== */}
			<section className="relative bg-white py-20 sm:py-28 overflow-hidden">
				<div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
					<motion.div
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, margin: '-80px' }}
						variants={container}
						className="grid grid-cols-12 gap-6 sm:gap-8"
					>
						<div className="col-span-12 lg:col-span-5">
							<motion.div variants={item}>
								<span className="accent-bar-flag block mb-4" />
								<h2 className="font-display font-black uppercase leading-[0.86] tracking-tight text-[clamp(2.5rem,6.5vw,5rem)]">
									A nossa{' '}
									<span className="text-flag">história</span>.
								</h2>
							</motion.div>
						</div>

						<div className="col-span-12 lg:col-span-7 lg:pt-2">
							<motion.p
								variants={item}
								className="text-xl sm:text-2xl leading-relaxed text-ink-soft"
							>
								<span className="float-left text-5xl sm:text-7xl font-editorial font-bold leading-none text-flag mr-3 mt-1">
									A
								</span>{' '}
								Ola Tours nasceu em 2014, em Luanda, da
								convicção de que o turismo corporativo em Angola
								merecia um padrão mais elevado. Não se tratava
								apenas de transporte — tratava-se de confiança,
								pontualidade e um conhecimento profundo do
								terreno.
							</motion.p>

							<motion.div variants={item} className="mt-8">
								<Button
									as="a"
									href="/sobre"
									variant="outline"
									size="lg"
								>
									Saber mais
								</Button>
							</motion.div>
						</div>
					</motion.div>
				</div>
			</section>

			{/* ===== SERVIÇOS ESPECIALIZADOS ===== */}
			<section className="relative bg-cream-50 py-20 sm:py-28 overflow-hidden">
				<div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
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
						{services.map((s) => {
							const accent = accentMap[s.tone];
							return (
								<motion.article
									key={s.key}
									variants={item}
									className="col-span-12 sm:col-span-6 lg:col-span-4 relative group"
								>
									<div className="relative bg-white border border-gray-border/60 rounded-lg overflow-hidden transition-all duration-500 card-elevated">
										<div className="p-6 sm:p-8">
											<div className="flex items-center gap-3 mb-4">
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

											<div className="mt-6 pt-5 border-t border-gray-border/50 flex items-center justify-between">
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

			<Testimonials />
			<PartnersSlider />
		</>
	);
}
