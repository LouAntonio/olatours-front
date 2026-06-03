import { motion } from 'motion/react';
import { motion as m, stagger } from '../styles/tokens';

const pillars = [
	{
		n: '01',
		key: 'Reconhecimento',
		title: 'Reconhecimento institucional',
		body: 'A Ola Tours foi eleita a melhor empresa de turismo em Angola em 2023, no Startup Summit realizado pelo Ministério da Economia. Em 2025, foi escolhida como uma das empresas em que os investidores podem confiar, pelo Ministério do Turismo.',
		tag: '2023 · 2025',
		color: 'sky',
	},
	{
		n: '02',
		key: 'Resultados',
		title: 'Resultados garantidos',
		body: 'Conhecemos Angola e o continente africano. Entendemos o sistema e entregamos soluções completas — sem improviso. Cada operação tem dono, plano B e relatório final.',
		tag: 'EXECUÇÃO NO TERRENO',
		color: 'flag',
	},
	{
		n: '03',
		key: 'Discrição',
		title: 'Discrição absoluta',
		body: 'Trabalhamos com empresas, instituições públicas e investidores que precisam de confiança, discrição, acesso institucional e execução sem ruído. NDA por defeito. Protocolo por princípio.',
		tag: 'NDA · GDPR',
		color: 'navy',
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

const colorMap: Record<
	string,
	{ accent: string; border: string; chip: string }
> = {
	sky: {
		accent: 'text-sky',
		border: 'border-sky',
		chip: 'bg-sky-50 text-sky border-sky/30',
	},
	flag: {
		accent: 'text-flag',
		border: 'border-flag',
		chip: 'bg-flag-50 text-flag border-flag/30',
	},
	navy: {
		accent: 'text-navy',
		border: 'border-navy',
		chip: 'bg-navy-50 text-navy border-navy/30',
	},
};

export function WhyUs() {
	return (
		<section
			id="porque-nos"
			className="relative bg-gray-light py-20 sm:py-28 overflow-hidden"
		>
			<div className="mx-auto max-w-[1400px] px-5 sm:px-8">
				<div className="grid grid-cols-12 gap-6 mb-12 sm:mb-16">
					<div className="col-span-12 lg:col-span-4">
						<span className="accent-bar-flag block mb-4" />
						<h2 className="font-display font-black uppercase leading-[0.86] tracking-tight text-[clamp(2.5rem,6.5vw,5rem)]">
							Porquê a{' '}
							<span className="text-flag">Ola Tours</span>
						</h2>
					</div>

					<div className="col-span-12 lg:col-span-7 lg:col-start-6 lg:pt-2">
						<p className="text-xl sm:text-2xl leading-relaxed text-ink-soft">
							Somos uma empresa angolana especializada em viagens
							corporativas, logística corporativa, mobilidade
							executiva e facilitação de negócios. Operamos onde
							outros improvisam — e entregamos onde outros
							prometem.
						</p>

						<div className="mt-6 flex items-center gap-3">
							<span className="label-caps text-ink-mute">
								Ola Tours · desde 2014
							</span>
							<span className="h-px w-8 bg-gray-border" />
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
					{pillars.map((p) => {
						const c = colorMap[p.color];
						return (
							<motion.article
								key={p.n}
								variants={item}
								className="col-span-12 md:col-span-4 bg-white border border-gray-border rounded-lg overflow-hidden hover:shadow-card-hover transition-shadow"
							>
								<div
									className={`h-1 w-full bg-${p.color}`}
									style={{
										background:
											p.color === 'sky'
												? 'var(--color-sky)'
												: p.color === 'flag'
													? 'var(--color-flag)'
													: 'var(--color-navy)',
									}}
								/>
								<div className="p-6 sm:p-8">
									<div className="flex items-baseline justify-between mb-5">
										<span className="font-display text-5xl sm:text-6xl font-black text-ink leading-none">
											{p.n}
										</span>
										<span
											className={`label-caps px-2 py-1 border rounded-sm ${c.chip}`}
										>
											{p.tag}
										</span>
									</div>
									<h3 className="font-display text-2xl sm:text-3xl font-black uppercase leading-tight tracking-tight text-ink">
										{p.title}
									</h3>
									<p className="mt-4 text-ink-soft leading-relaxed">
										{p.body}
									</p>
								</div>
							</motion.article>
						);
					})}
				</motion.div>
			</div>
		</section>
	);
}
