import { motion } from 'motion/react';
import { Seal } from './Seal';
import { motion as m, stagger } from '../styles/tokens';

const pillars = [
	{
		n: '01',
		key: 'Reconhecimento',
		title: 'Reconhecimento institucional',
		body: 'A Ola Tours foi eleita a melhor empresa de turismo em Angola em 2023, no Startup Summit realizado pelo Ministério da Economia. Em 2025, foi escolhida como uma das empresas em que os investidores podem confiar, pelo Ministério do Turismo.',
		tag: '2023 · 2025',
		tone: 'ochre' as const,
	},
	{
		n: '02',
		key: 'Resultados',
		title: 'Resultados garantidos',
		body: 'Conhecemos Angola e o continente africano. Entendemos o sistema e entregamos soluções completas — sem improviso. Cada operação tem dono, plano B e relatório final.',
		tag: 'EXECUÇÃO NO TERRENO',
		tone: 'terracotta' as const,
	},
	{
		n: '03',
		key: 'Discrição',
		title: 'Discrição absoluta',
		body: 'Trabalhamos com empresas, instituições públicas e investidores que precisam de confiança, discrição, acesso institucional e execução sem ruído. NDA por defeito. Protocolo por princípio.',
		tag: 'NDA · GDPR',
		tone: 'moss' as const,
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

export function WhyUs() {
	return (
		<section
			id="porque-nos"
			className="relative bg-paper py-20 sm:py-28 overflow-hidden paper-grain"
		>
			<div className="mx-auto max-w-[1400px] px-5 sm:px-8">
				<div className="grid grid-cols-12 gap-6 mb-12 sm:mb-16">
					<div className="col-span-12 lg:col-span-4">
						<div className="flex items-center gap-3">
							<span className="font-display text-2xl sm:text-3xl font-black text-terracotta leading-none">
								03
							</span>
							<span className="h-px w-12 sm:w-20 bg-ink" />
							<span className="eyebrow text-ink-soft">
								Porquê nós
							</span>
						</div>
					</div>

					<div className="col-span-12 lg:col-span-8">
						<p className="mono-caps text-terracotta mb-4">
							[ Manifesto · 03 de 07 ]
						</p>
						<h2 className="font-display font-black uppercase leading-[0.86] tracking-tight text-[clamp(2.5rem,6.5vw,5rem)]">
							Porquê a{' '}
							<span className="text-terracotta">Ola Tours</span>{' '}
							<span className="font-serif italic font-medium text-ink-soft normal-case tracking-normal">
								Corporativo.
							</span>
						</h2>
					</div>
				</div>

				<motion.div
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, margin: '-100px' }}
					variants={container}
					className="grid grid-cols-12 gap-6 sm:gap-8"
				>
					<motion.div
						variants={item}
						className="col-span-12 lg:col-span-7"
					>
						<p className="drop-cap font-serif text-xl sm:text-2xl leading-[1.45] text-ink">
							Somos uma empresa angolana especializada em viagens
							corporativas, logística corporativa, mobilidade
							executiva e facilitação de negócios. Operamos onde
							outros improvisam — e entregamos onde outros
							prometem.
						</p>

						<div className="mt-10 flex items-center gap-4 mono-caps text-ink-soft">
							<span className="h-px w-12 bg-ink" />
							<span>Ola Tours · desde 2014</span>
						</div>
					</motion.div>

					<motion.aside
						variants={item}
						className="col-span-12 lg:col-span-5 flex items-center justify-center lg:justify-end"
					>
						<div className="text-ochre">
							<Seal
								text="RECONHECIDA · APROVADA"
								subtext="M.E. 2023 / M.T. 2025"
								number="01"
								tone="ochre"
								size="lg"
							/>
						</div>
					</motion.aside>
				</motion.div>

				<div className="mt-16 sm:mt-20 border-t-2 border-ink pt-2">
					<motion.div
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, margin: '-80px' }}
						variants={container}
						className="grid grid-cols-12 gap-6 sm:gap-8"
					>
						{pillars.map((p) => (
							<motion.article
								key={p.n}
								variants={item}
								className="col-span-12 md:col-span-4 pt-8 border-t border-ink/15 relative"
							>
								<div className="absolute -top-px left-0 right-0 h-[2px] bg-terracotta" />
								<div className="flex items-baseline justify-between mb-5">
									<span className="font-display text-5xl sm:text-6xl font-black text-ink leading-none">
										{p.n}
									</span>
									<span
										className={[
											'label-caps px-2 py-1 border',
											p.tone === 'terracotta'
												? 'border-terracotta text-terracotta'
												: p.tone === 'ochre'
													? 'border-ochre text-ochre-dark'
													: 'border-moss text-moss',
										].join(' ')}
									>
										{p.tag}
									</span>
								</div>
								<h3 className="font-display text-2xl sm:text-3xl font-black uppercase leading-tight tracking-tight">
									{p.title}
								</h3>
								<p className="mt-4 text-ink-soft leading-relaxed">
									{p.body}
								</p>
							</motion.article>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
}
