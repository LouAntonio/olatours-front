import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { motion } from 'motion/react';
import { motion as m, stagger } from '../styles/tokens';

const milestones = [
	{
		year: '2014',
		title: 'Fundação',
		body: 'A Ola Tours nasce em Luanda com a missão de elevar o padrão do turismo corporativo em Angola.',
		accent: 'flag' as const,
	},
	{
		year: '2023',
		title: 'Reconhecimento Nacional',
		body: 'Eleita a melhor empresa de turismo em Angola no Startup Summit, promovido pelo Ministério da Economia.',
		accent: 'sky' as const,
	},
	{
		year: '2024',
		title: 'Operação Internacional',
		body: 'Recepção de altas delegações — incluindo a Presidente da Tanzânia e o Vice-Presidente do Banco Mundial para África.',
		accent: 'navy' as const,
	},
	{
		year: '2025',
		title: 'Confiança Institucional',
		body: 'Escolhida como uma das empresas em que os investidores podem confiar, pelo Ministério do Turismo.',
		accent: 'flag' as const,
	},
];

const values = [
	{
		n: '01',
		title: 'Pontualidade',
		body: 'O tempo dos nossos clientes é o nosso activo mais valioso. Cada operação cumpre o minuto prometido.',
		accent: 'flag' as const,
	},
	{
		n: '02',
		title: 'Privacidade',
		body: 'NDA por defeito. Protocolo por princípio. Discrição absoluta em todas as operações.',
		accent: 'navy' as const,
	},
	{
		n: '03',
		title: 'Excelência',
		body: 'Cada serviço tem dono, plano B e relatório final. Não entregamos menos do que o melhor.',
		accent: 'sky' as const,
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

export function Sobre() {
	useDocumentTitle('Sobre');

	return (
		<>
			{/* ===== HERO ===== */}
			<section className="relative bg-navy min-h-dvh flex items-center pt-16 sm:pt-20 pb-12 sm:pb-16 overflow-hidden grain">
				<div className="pointer-events-none absolute top-0 right-0 w-48 h-48 sm:w-80 sm:h-80 border-r border-t border-white/[0.04] rounded-tr-[100px] corner-pulse" />

				<div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
					<div className="grid grid-cols-12 gap-6">
						<div className="col-span-12">
							<div className="flex items-center gap-3 mb-6">
								<span className="h-px w-8 bg-flag/40" />
								<span className="label-caps text-flag tracking-[0.18em]">
									DESDE 2014
								</span>
							</div>

							<h1 className="font-display font-black uppercase leading-[0.82] tracking-tight text-[clamp(3.5rem,10vw,8rem)] text-white">
								Sobre a{' '}
								<span className="text-flag">Ola Tours</span>
							</h1>

							<p className="mt-6 text-lg sm:text-xl leading-relaxed text-white/70 max-w-2xl">
								Somos uma empresa angolana especializada em
								viagens corporativas, logística executiva e
								facilitação de negócios. Operamos onde outros
								improvisam — e entregamos onde outros prometem.
							</p>

							<div className="mt-10 flex flex-wrap gap-8 sm:gap-12">
								{[
									{
										value: '10+',
										label: 'Anos de experiência',
									},
									{ value: '54', label: 'Países' },
									{ value: '1000+', label: 'Clientes' },
								].map((s) => (
									<div key={s.label}>
										<p className="font-display text-4xl sm:text-5xl font-black leading-none text-white">
											{s.value}
										</p>
										<p className="label-caps text-white/60 mt-1.5">
											{s.label}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ===== HISTORY ===== */}
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

			{/* ===== MILESTONES ===== */}
			<section className="relative bg-cream-50 py-20 sm:py-28 overflow-hidden">
				{/* Background decorative diamonds */}
				<div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.025] select-none">
					<div className="absolute top-[12%] left-[3%] w-24 h-24 rotate-45 rounded-xl border-2 border-navy" />
					<div className="absolute top-[45%] right-[6%] w-40 h-40 rotate-45 rounded-2xl border-2 border-flag" />
					<div className="absolute bottom-[15%] left-[20%] w-16 h-16 rotate-45 rounded-lg border-2 border-sky" />
					<div className="absolute top-[70%] right-[30%] w-12 h-12 rotate-45 rounded-md border-2 border-navy" />
				</div>

				<div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
					<motion.div
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, margin: '-80px' }}
						variants={container}
						className="grid grid-cols-12 gap-6 mb-14 sm:mb-20"
					>
						<div className="col-span-12 lg:col-span-6">
							<motion.div variants={item}>
								<span className="accent-bar-flag block mb-4" />
								<h2 className="font-display font-black uppercase leading-[0.86] tracking-tight text-[clamp(2.5rem,6.5vw,5rem)]">
									Marcos{' '}
									<span className="text-flag">
										importantes
									</span>
									.
								</h2>
							</motion.div>
						</div>
						<div className="col-span-12 lg:col-span-4 lg:col-start-9 flex items-end">
							<motion.p
								variants={item}
								className="text-ink-mute text-sm sm:text-base leading-relaxed"
							>
								Da fundação à confiança institucional — uma
								década de crescimento consistente.
							</motion.p>
						</div>
					</motion.div>

					<div className="relative">
						{/* Desktop central connector line (gradient, subtle) */}
						<div className="hidden lg:block absolute left-1/2 top-[1.75rem] bottom-8 w-px -translate-x-px bg-gradient-to-b from-gray-border via-gray-border to-transparent" />

						<motion.div
							initial="hidden"
							whileInView="show"
							viewport={{ once: true, margin: '-100px' }}
							variants={container}
						>
							{milestones.map((m, i) => {
								const accent = accentMap[m.accent];
								const isLeft = i % 2 === 0;
								return (
									<motion.div
										key={m.year}
										variants={item}
										className="relative pb-16 sm:pb-24 last:pb-0 group"
									>
										<div className="grid grid-cols-12 gap-4 sm:gap-6">
											{/* Diamond connector (desktop only) */}
											<div
												className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center z-10"
												style={{
													top: 'calc(1.5rem + 4px)',
												}}
											>
												<div
													className="w-[22px] h-[22px] rotate-45 rounded-sm border-[3px] bg-white transition-all duration-700 ease-out hover:rotate-[135deg] hover:scale-110 cursor-default"
													style={{
														borderColor: accent.css,
													}}
												>
													<div
														className="absolute inset-[5px] rounded-sm transition-colors duration-500"
														style={{
															background:
																accent.css,
														}}
													/>
												</div>
											</div>

											{/* Year — massive typographic element */}
											<div
												className={`col-span-12 lg:col-span-5 ${isLeft ? '' : 'lg:col-start-8'}`}
											>
												<div
													className={`flex flex-col ${isLeft ? 'lg:items-end' : ''}`}
												>
													<span
														className="font-display font-black leading-[0.78] tracking-tight text-[clamp(3.5rem,12vw,7rem)] block select-none transition-opacity duration-500 group-hover:opacity-40"
														style={{
															color: `color-mix(in srgb, ${accent.css} 15%, transparent)`,
														}}
													>
														{m.year}
													</span>
													{/* Mobile accent bar (hidden desktop) */}
													<div
														className="lg:hidden w-10 h-1 rounded-full -mt-1 mb-3"
														style={{
															background:
																accent.css,
														}}
													/>
												</div>
											</div>

											{/* Center spacer (desktop only) */}
											<div className="hidden lg:block col-span-2" />

											{/* Content card */}
											<div
												className={`col-span-12 lg:col-span-5 ${isLeft ? 'lg:col-start-8' : ''}`}
											>
												<div className="relative bg-white border border-gray-border/40 rounded-xl p-6 sm:p-8 shadow-sm transition-all duration-500 hover:shadow-lg hover:-translate-y-0.5 cursor-default">
													{/* Top accent bar */}
													<div
														className="absolute top-0 left-6 right-6 h-0.5 rounded-full transition-all duration-500 group-hover:left-3 group-hover:right-3"
														style={{
															background:
																accent.css,
														}}
													/>
													<h3 className="font-display text-xl sm:text-2xl font-black uppercase leading-tight tracking-tight text-ink pt-1">
														{m.title}
													</h3>
													<p className="mt-3 text-ink-soft leading-relaxed text-sm sm:text-base">
														{m.body}
													</p>
												</div>
											</div>
										</div>
									</motion.div>
								);
							})}
						</motion.div>
					</div>
				</div>
			</section>

			{/* ===== STATS ===== */}
			<section className="relative bg-navy py-20 sm:py-24 overflow-hidden grain">
				<div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
				<div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

				<div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
					<motion.div
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, margin: '-80px' }}
						variants={container}
						className="grid grid-cols-12 gap-5 sm:gap-6"
					>
						{[
							{
								label: 'Experiência',
								value: '10+',
								hint: 'Desde 2014',
								accent: 'flag',
							},
							{
								label: 'Operação',
								value: '54',
								hint: 'Países',
								accent: 'sky',
							},
							{
								label: 'Clientes',
								value: '1000+',
								hint: 'Empresas e instituições',
								accent: 'flag',
							},
							{
								label: 'Reconhecimento',
								value: '2',
								hint: 'Prémios (2023 · 2025)',
								accent: 'sky',
							},
						].map((s) => {
							const accent = accentMap[s.accent];
							return (
								<motion.div
									key={s.label}
									variants={item}
									className="col-span-6 sm:col-span-3"
								>
									<div className="stat-glow relative border border-white/[0.08] rounded-lg p-6 sm:p-8 text-center h-full flex flex-col items-center justify-center bg-white/[0.02] backdrop-blur-sm">
										<div
											className="absolute top-0 left-4 right-4 h-px"
											style={{
												background: accent.css,
												opacity: 0.5,
											}}
										/>
										<p className="label-caps text-white/40 mb-3">
											{s.label}
										</p>
										<p className="font-display text-5xl sm:text-7xl font-black leading-none text-white tracking-tight">
											{s.value}
										</p>
										<p className="mt-3 text-xs sm:text-sm text-white/40">
											{s.hint}
										</p>
									</div>
								</motion.div>
							);
						})}
					</motion.div>
				</div>
			</section>

			{/* ===== VALUES ===== */}
			<section className="relative bg-white py-20 sm:py-28 overflow-hidden">
				<div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
					<div className="grid grid-cols-12 gap-6 mb-14 sm:mb-20">
						<div className="col-span-12 lg:col-span-5">
							<span className="accent-bar-flag block mb-4" />
							<h2 className="font-display font-black uppercase leading-[0.86] tracking-tight text-[clamp(2.5rem,6.5vw,5rem)]">
								Os nossos{' '}
								<span className="text-flag">princípios</span>.
							</h2>
						</div>
						<div className="col-span-12 lg:col-span-6 lg:col-start-7 flex items-end">
							<p className="text-xl sm:text-2xl leading-relaxed text-ink-soft border-l-2 border-flag pl-5">
								Três práticas. Zero atalhos. Em todos os
								serviços que prestamos, prezamos pela
								pontualidade, privacidade e excelência.
							</p>
						</div>
					</div>

					<motion.div
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, margin: '-80px' }}
						variants={container}
						className="grid grid-cols-12 gap-6 sm:gap-8"
					>
						{values.map((v, i) => {
							const accent = accentMap[v.accent];
							return (
								<motion.article
									key={v.n}
									variants={item}
									className={`col-span-12 md:col-span-4 ${i === 1 ? 'md:translate-y-8' : ''}`}
								>
									<div className="relative border border-gray-border/60 rounded-lg overflow-hidden transition-all duration-500 card-elevated bg-white">
										<div className="p-6 sm:p-8">
											<div className="flex items-center gap-3 mb-4">
												<span
													className="label-caps"
													style={{
														color: accent.css,
													}}
												>
													0{v.n}
												</span>
											</div>
											<h3 className="font-display text-2xl sm:text-3xl font-black uppercase leading-tight tracking-tight text-ink">
												{v.title}
											</h3>
											<p className="mt-4 text-ink-soft leading-relaxed text-base sm:text-lg">
												{v.body}
											</p>
										</div>
									</div>
								</motion.article>
							);
						})}
					</motion.div>
				</div>
			</section>
		</>
	);
}
