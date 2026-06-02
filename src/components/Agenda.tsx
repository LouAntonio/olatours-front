import { motion } from 'motion/react';
import { motion as m, stagger } from '../styles/tokens';

const items = [
	{
		n: '01',
		title: 'Porquê nós?',
		hint: 'Reconhecimento, resultados e a nossa forma de trabalhar',
		anchor: 'porque-nos',
	},
	{
		n: '02',
		title: 'Nossos serviços',
		hint: 'Negócios, investimento e mobilidade executiva',
		anchor: 'servicos',
	},
	{
		n: '03',
		title: 'Nossos produtos',
		hint: 'Mobilidade, missões empresariais e eventos',
		anchor: 'produtos',
	},
	{
		n: '04',
		title: 'Testemunhos de clientes',
		hint: 'A voz de quem viajou connosco',
		anchor: 'testemunhos',
	},
	{
		n: '05',
		title: 'Contacte-nos',
		hint: 'Email, telefone e morada',
		anchor: 'contacto',
	},
];

const itemVariants = {
	hidden: { opacity: 0, y: 18 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: m.duration.base, ease: m.ease.out },
	},
};

const listVariants = {
	hidden: {},
	show: { transition: { staggerChildren: stagger.tight } },
};

export function Agenda() {
	return (
		<section
			id="agenda"
			className="relative bg-ink text-paper py-20 sm:py-28 overflow-hidden"
		>
			<Watermark />

			<div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
				<div className="grid grid-cols-12 gap-6 mb-14 sm:mb-20">
					<div className="col-span-12 lg:col-span-4">
						<div className="flex items-center gap-3">
							<span className="font-display text-2xl sm:text-3xl font-black text-terracotta leading-none">
								02
							</span>
							<span className="h-px w-12 sm:w-20 bg-paper" />
							<span className="eyebrow text-paper/70">
								Sumário executivo
							</span>
						</div>
					</div>
					<div className="col-span-12 lg:col-span-8">
						<h2 className="font-display font-black uppercase leading-[0.86] tracking-tight text-[clamp(2.75rem,7vw,5.5rem)]">
							A nossa{' '}
							<span className="text-terracotta">agenda</span>{' '}
							<span className="font-serif italic font-medium text-paper/85 normal-case tracking-normal">
								de hoje.
							</span>
						</h2>
						<p className="mt-6 max-w-xl font-serif text-lg text-paper/70 leading-relaxed">
							Cinco paragens. Quinze minutos. O essencial sobre
							como a Ola Tours Corporativo opera em Angola, para
							empresas, instituições e investidores.
						</p>
					</div>
				</div>

				<motion.ol
					variants={listVariants}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, margin: '-80px' }}
					className="relative border-t-2 border-paper"
				>
					{items.map((it) => (
						<motion.li
							key={it.n}
							variants={itemVariants}
							className="group border-b border-paper/20"
						>
							<a
								href={`#${it.anchor}`}
								className="grid grid-cols-12 items-baseline gap-4 py-6 sm:py-7 transition-colors hover:bg-paper/[0.04] -mx-2 px-2"
							>
								<span className="col-span-2 sm:col-span-1 font-mono text-sm text-paper/50 group-hover:text-terracotta transition-colors">
									{it.n}
								</span>
								<span className="col-span-10 sm:col-span-7 font-display text-2xl sm:text-4xl md:text-5xl font-black uppercase leading-none tracking-tight group-hover:text-terracotta transition-colors">
									{it.title}
								</span>
								<span className="hidden sm:inline col-span-3 text-sm text-paper/60 leading-snug">
									{it.hint}
								</span>
								<span className="hidden sm:inline-flex col-span-1 justify-end">
									<svg
										viewBox="0 0 24 24"
										fill="none"
										aria-hidden="true"
										className="h-5 w-5 text-paper/40 group-hover:text-terracotta group-hover:translate-x-1 transition-all"
									>
										<path
											d="M5 12h14M13 6l6 6-6 6"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="square"
										/>
									</svg>
								</span>
							</a>
						</motion.li>
					))}
				</motion.ol>

				<div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mono-caps text-paper/50">
					<span>FIM DO SUMÁRIO · 05 / 05</span>
					<span>OLA TOURS CORPORATIVO · DOSSIER Nº 01 / 26</span>
				</div>
			</div>
		</section>
	);
}

function Watermark() {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 1400 700"
			className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]"
		>
			<text
				x="50%"
				y="50%"
				textAnchor="middle"
				dominantBaseline="middle"
				fontFamily="Barlow Condensed, sans-serif"
				fontWeight="900"
				fontSize="420"
				letterSpacing="-12"
				fill="#F4EFE6"
			>
				AGENDA
			</text>
		</svg>
	);
}
