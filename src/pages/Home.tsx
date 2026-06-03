import { motion } from 'motion/react';
import { motion as m, stagger } from '../styles/tokens';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { Cover } from '../components/Cover';
import { WhyUs } from '../components/WhyUs';
import { Testimonials } from '../components/Testimonials';

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

type Product = {
	n: '01' | '02' | '03';
	code: string;
	brand: string;
	title: string;
	intro: string;
	features: string[];
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
		intro: 'Uma missão empresarial em Angola começa muito antes do avião. Trata-se de logística, agenda e acesso — tudo alinhado.',
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

export function Home() {
	useDocumentTitle('Home');

	return (
		<>
			<Cover />

			{/* ===== A NOSSA HISTÓRIA ===== */}
			<section className="relative bg-white py-20 sm:py-28 overflow-hidden">
				<div className="pointer-events-none absolute -bottom-8 -left-8 select-none">
					<span
						className="font-display font-black text-[clamp(12rem,25vw,24rem)] leading-none opacity-[0.12]"
						style={{ color: 'rgba(181, 72, 42, 0.3)' }}
					>
						2014
					</span>
				</div>

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
								<span className="float-left text-5xl sm:text-7xl font-display font-black leading-none text-flag mr-3 mt-1">
									A
								</span>{' '}
								Ola Tours nasceu em 2014, em Luanda, da
								convicção de que o turismo corporativo em Angola
								merecia um padrão mais elevado. Não se tratava
								apenas de transporte — tratava-se de confiança,
								pontualidade e um conhecimento profundo do
								terreno.
							</motion.p>

							<motion.p
								variants={item}
								className="mt-6 text-xl sm:text-2xl leading-relaxed text-ink-soft"
							>
								Hoje, operamos em 54 países, recebemos Chefes de
								Estado e delegações do Banco Mundial, e somos
								reconhecidos institucionalmente como uma
								referência no sector. Mas o nosso foco continua
								o mesmo: fazer com que cada viagem seja uma
								extensão natural da estratégia de quem a
								contrata.
							</motion.p>

							<motion.div
								variants={item}
								className="mt-10 flex items-center gap-4"
							>
								<span className="h-px flex-1 bg-gray-border" />
								<span className="label-caps text-ink-mute shrink-0">
									OLA TOURS · DESDE 2014
								</span>
								<span className="h-px flex-1 bg-gray-border" />
							</motion.div>
						</div>
					</motion.div>
				</div>
			</section>

			{/* ===== SERVIÇOS ESPECIALIZADOS ===== */}
			<section className="relative bg-gray-light py-20 sm:py-28 overflow-hidden">
				<div className="pointer-events-none absolute inset-0 opacity-[0.02]">
					<div className="corporate-grid h-full w-full" />
				</div>

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

			{/* ===== OS 3 PRODUTOS ===== */}
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

			<WhyUs />
			<Testimonials />
		</>
	);
}
