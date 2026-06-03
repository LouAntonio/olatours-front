import { motion } from 'motion/react';
import { motion as m, stagger } from '../styles/tokens';

const pillars = [
	{
		n: '01',
		key: 'Reconhecimento',
		title: 'Reconhecimento institucional',
		body: 'A Ola Tours foi eleita a melhor empresa de turismo em Angola em 2023, no Startup Summit realizado pelo Ministério da Economia. Em 2025, foi escolhida como uma das empresas em que os investidores podem confiar, pelo Ministério do Turismo.',
		tag: '2023 · 2025',
		color: 'sky' as const,
	},
	{
		n: '02',
		key: 'Resultados',
		title: 'Resultados garantidos',
		body: 'Conhecemos Angola e o continente africano. Entendemos o sistema e entregamos soluções completas — sem improviso. Cada operação tem dono, plano B e relatório final.',
		tag: 'EXECUÇÃO NO TERRENO',
		color: 'flag' as const,
	},
	{
		n: '03',
		key: 'Discrição',
		title: 'Discrição absoluta',
		body: 'Trabalhamos com empresas, instituições públicas e investidores que precisam de confiança, discrição, acesso institucional e execução sem ruído. NDA por defeito. Protocolo por princípio.',
		tag: 'NDA · GDPR',
		color: 'navy' as const,
	},
];

const container = {
	hidden: {},
	show: { transition: { staggerChildren: stagger.wide } },
};

const item = {
	hidden: { opacity: 0, y: 28 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: m.duration.base, ease: m.ease.out },
	},
};

const accentMap: Record<string, { css: string; rgb: string }> = {
	sky: { css: 'var(--color-sky)', rgb: '20, 121, 193' },
	flag: { css: 'var(--color-flag)', rgb: '181, 72, 42' },
	navy: { css: 'var(--color-navy)', rgb: '26, 43, 74' },
};

export function WhyUs() {
	return (
		<section
			id="porque-nos"
			className="relative bg-gray-light py-20 sm:py-28 overflow-hidden"
		>
			<div className="pointer-events-none absolute -top-8 -right-8 select-none">
				<span
					className="font-display font-black text-[clamp(6rem,15vw,14rem)] leading-none"
					style={{ color: 'rgba(181, 72, 42, 0.3)' }}
				>
					PORQUÊ
				</span>
			</div>

			<div className="pointer-events-none absolute inset-0 opacity-[0.02]">
				<div className="corporate-grid h-full w-full" />
			</div>

			<div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
				<div className="grid grid-cols-12 gap-6 mb-14 sm:mb-20">
					<div className="col-span-12 lg:col-span-5">
						<span className="accent-bar-flag block mb-4" />
						<h2 className="font-display font-black uppercase leading-[0.86] tracking-tight text-[clamp(2.5rem,6.5vw,5rem)]">
							Porquê a{' '}
							<span className="text-flag">Ola Tours</span>
						</h2>
					</div>

					<div className="col-span-12 lg:col-span-6 lg:col-start-7 flex items-end">
						<div>
							<p className="text-xl sm:text-2xl leading-relaxed text-ink-soft border-l-2 border-flag pl-5">
								Somos uma empresa angolana especializada em
								viagens corporativas, logística corporativa,
								mobilidade executiva e facilitação de negócios.
								Operamos onde outros improvisam — e entregamos
								onde outros prometem.
							</p>
							<div className="mt-6 flex items-center gap-3">
								<span className="label-caps text-ink-mute">
									Ola Tours · desde 2014
								</span>
								<span className="h-px w-8 bg-gray-border" />
							</div>
						</div>
					</div>
				</div>

				<motion.div
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, margin: '-100px' }}
					variants={container}
					className="grid grid-cols-12 gap-6 sm:gap-8"
				>
					{pillars.map((p, i) => {
						const accent = accentMap[p.color];
						return (
							<motion.article
								key={p.n}
								variants={item}
								className={`col-span-12 md:col-span-4 ${i === 1 ? 'md:translate-y-8' : ''}`}
							>
								<div
									className="relative border border-gray-border rounded-r-lg overflow-hidden transition-all duration-500 card-elevated"
									style={{
										background: `color-mix(in srgb, ${accent.css} 6%, white)`,
									}}
								>
									<div
										className="absolute left-0 top-0 bottom-0 w-2"
										style={{ background: accent.css }}
									/>

									<div className="pointer-events-none absolute -top-2 right-4 select-none">
										<span
											className="font-display font-black text-[clamp(4rem,8vw,7rem)] leading-none"
											style={{
												color: `rgba(${accent.rgb}, 0.3)`,
											}}
										>
											{p.n}
										</span>
									</div>

									<div className="p-6 sm:p-8 pl-8 sm:pl-10">
										<div className="flex items-center gap-3 mb-4">
											<span
												className="h-px flex-1"
												style={{
													background: `color-mix(in srgb, ${accent.css} 40%, transparent)`,
												}}
											/>
											<span
												className="label-caps"
												style={{ color: accent.css }}
											>
												{p.tag}
											</span>
										</div>
										<h3 className="font-display text-2xl sm:text-3xl font-black uppercase leading-tight tracking-tight text-ink">
											{p.title}
										</h3>
										<p className="mt-4 text-ink-soft leading-relaxed text-base sm:text-lg">
											{p.body}
										</p>
									</div>
								</div>
							</motion.article>
						);
					})}
				</motion.div>
			</div>
		</section>
	);
}
