import { motion } from 'motion/react';
import { Button } from './Button';
import { motion as m, stagger } from '../styles/tokens';

type Tone = 'flag' | 'navy' | 'sky';

type Product = {
	n: '01' | '02' | '03';
	code: string;
	brand: string;
	title: string;
	intro: string;
	features: string[];
	tone: Tone;
};

const products: Product[] = [
	{
		n: '01',
		code: 'OLA · MC',
		brand: 'Ola Mobilidade Corporativa',
		title: 'Transporte executivo sob contrato.',
		intro: 'Para equipas e executivos que precisam de pontualidade diária, motoristas de confiança e relatórios mensais.',
		features: [
			'Transporte Executivo',
			'Transfers Aeroporto ↔ Hotel',
			'Motoristas profissionais que falam inglês',
			'Relatórios de serviço mensais',
		],
		tone: 'flag',
	},
	{
		n: '02',
		code: 'OLA · ME',
		brand: 'Ola Missões Empresariais',
		title: 'Delegações que chegam prontas.',
		intro: 'Uma missão empresarial em Angola começa muito antes do avião. Trata-se de logística, agenda e acesso - tudo alinhado.',
		features: [
			'Organização de delegações empresariais',
			'Agendamento de reuniões estratégicas',
			'Visitas a projectos e Zonas Económicas Especiais',
			'Logística completa: hotel, transporte e protocolo',
		],
		tone: 'navy',
	},
	{
		n: '03',
		code: 'OLA · ED',
		brand: 'Ola Eventos e Delegações',
		title: 'Eventos onde o detalhe é o produto.',
		intro: 'Conferências, cimeiras, recepções oficiais. Operamos o evento no terreno enquanto os nossos clientes aparecem no momento certo.',
		features: [
			'Logística completa de eventos',
			'Trabalho em campo',
			'Protocolo e recepção',
		],
		tone: 'sky',
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

export function Products() {
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
						PRODUTOS
					</span>
				</div>

				<div className="pointer-events-none absolute top-0 right-0 w-48 h-48 sm:w-80 sm:h-80 border-r border-t border-white/[0.04] rounded-tr-[100px] corner-pulse" />

				<div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
					<div className="grid grid-cols-12 gap-6">
						<div className="col-span-12 lg:col-span-8">
							<div className="flex items-center gap-3 mb-6">
								<span className="h-px w-8 bg-flag/40" />
								<span className="label-caps text-flag tracking-[0.18em]">
									PRODUTOS · MOBILIDADE · MISSÕES · EVENTOS
								</span>
							</div>

							<h1 className="font-display font-black uppercase leading-[0.82] tracking-tight text-[clamp(3.5rem,10vw,8rem)] text-white">
								Os nossos{' '}
								<span className="text-flag">produtos</span>.
							</h1>

							<p className="mt-6 text-lg sm:text-xl leading-relaxed text-white/70 max-w-2xl">
								Os nossos produtos garantem o melhor retorno
								sobre o investimento no sector de viagens. Três
								formatos. Um padrão.
							</p>
						</div>

						<div className="col-span-12 lg:col-span-4 flex flex-col justify-end items-start sm:items-end pt-8 lg:pt-0">
							<div className="relative">
								<div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-flag/40" />
								<div className="border-l-2 border-flag pl-5">
									<p className="text-white/50 label-caps mb-2">
										FOCO
									</p>
									<div className="flex flex-wrap gap-2">
										{[
											'ROI',
											'PREVISIBILIDADE',
											'ESCALA',
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

			{/* ===== PRODUCTS GRID ===== */}
			<section className="relative bg-gray-light py-20 sm:py-28 overflow-hidden">
				<div className="pointer-events-none absolute inset-0 opacity-[0.02]">
					<div className="corporate-grid h-full w-full" />
				</div>

				<div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
					<div className="grid grid-cols-12 gap-6 mb-14 sm:mb-20">
						<div className="col-span-12 lg:col-span-6">
							<span className="accent-bar-flag block mb-4" />
							<h2 className="font-display font-black uppercase leading-[0.86] tracking-tight text-[clamp(2.5rem,6.5vw,5rem)]">
								Três formatos.{' '}
								<span className="text-flag">Um padrão</span>.
							</h2>
						</div>
						<div className="col-span-12 lg:col-span-4 lg:col-start-9 flex items-end">
							<p className="text-ink-mute text-sm sm:text-base leading-relaxed">
								Cada produto é desenhado para garantir o melhor
								retorno sobre o investimento no sector de
								viagens.
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
						{products.map((p, i) => {
							const accent = accentMap[p.tone];
							return (
								<motion.article
									key={p.n}
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
												{p.n}
											</span>
										</div>

										<div
											className="h-1.5 w-full"
											style={{ background: accent.css }}
										/>

										<div className="p-6 sm:p-8">
											<div className="flex items-center gap-3 mb-3">
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
													{p.code}
												</span>
												{i === 0 && (
													<span className="label-caps px-2 py-0.5 border border-flag/40 text-flag rounded-sm ml-auto">
														Best seller
													</span>
												)}
											</div>

											<p
												className="label-caps mb-3"
												style={{ color: accent.css }}
											>
												{p.brand}
											</p>

											<h3 className="font-display text-2xl sm:text-3xl font-black uppercase leading-tight tracking-tight text-ink">
												{p.title}
											</h3>

											<p className="mt-3 text-ink-soft leading-relaxed">
												{p.intro}
											</p>

											<div className="rule my-5" />

											<p className="label-caps text-ink-mute mb-3">
												O que inclui
											</p>

											<ul className="space-y-3">
												{p.features.map((f) => (
													<li
														key={f}
														className="flex items-start gap-3 text-ink leading-relaxed"
													>
														<span
															className="mt-2 inline-block h-1 w-2 shrink-0 rounded-sm"
															style={{
																background:
																	accent.css,
															}}
														/>
														<span className="flex-1">
															{f}
														</span>
													</li>
												))}
											</ul>

											<div className="mt-6 pt-5 border-t border-gray-border flex items-center justify-between">
												<span className="label-caps text-ink-mute">
													PRODUTO {p.n} / 03
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
						PRODUTOS
					</span>
				</div>

				<div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 text-center">
					<span className="accent-bar-flag block mx-auto mb-4" />
					<h2 className="font-display font-black uppercase leading-[0.86] tracking-tight text-[clamp(2.5rem,6.5vw,5rem)]">
						Pronto para o próximo{' '}
						<span className="text-flag">olá</span>?
					</h2>
					<p className="mt-6 text-xl sm:text-2xl leading-relaxed text-ink-soft max-w-2xl mx-auto">
						Conte-nos a operação. Enviamos uma proposta em 48h.
					</p>
					<div className="mt-10">
						<Button
							as="a"
							href="/contacto"
							variant="flag"
							size="lg"
						>
							Pedir proposta
						</Button>
					</div>
				</div>
			</section>
		</>
	);
}
