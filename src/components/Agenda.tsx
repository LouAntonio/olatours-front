import { motion } from 'motion/react';
import { motion as m, stagger } from '../styles/tokens';

const items = [
	{
		n: '01',
		title: 'Serviços',
		hint: 'Negócios, investimento e mobilidade executiva',
		anchor: 'servicos',
	},
	{
		n: '02',
		title: 'Produtos',
		hint: 'Mobilidade, missões empresariais e eventos',
		anchor: 'produtos',
	},
	{
		n: '03',
		title: 'Testemunhos',
		hint: 'A voz de quem viajou connosco',
		anchor: 'testemunhos',
	},
	{
		n: '04',
		title: 'Contacto',
		hint: 'Email, telefone e proposta em 24h',
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
			className="relative bg-navy text-white py-20 sm:py-28 overflow-hidden"
		>
			<div className="pointer-events-none absolute inset-0 opacity-[0.04]">
				<div className="corporate-grid h-full w-full" />
			</div>

			<div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
				<div className="grid grid-cols-12 gap-6 mb-14 sm:mb-20">
					<div className="col-span-12 lg:col-span-4">
						<span className="accent-bar block mb-4" />
						<h2 className="font-display font-black uppercase leading-[0.86] tracking-tight text-[clamp(2.75rem,7vw,5.5rem)]">
							A nossa <span className="text-sky">agenda</span>
						</h2>
					</div>
					<div className="col-span-12 lg:col-span-7 lg:col-start-6 lg:pt-2">
						<p className="text-lg text-white/70 leading-relaxed">
							Quatro paragens. O essencial sobre como a Ola Tours
							Corporativo opera em Angola, para empresas,
							instituições e investidores.
						</p>
					</div>
				</div>

				<motion.ol
					variants={listVariants}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, margin: '-80px' }}
					className="border-t-2 border-white/20"
				>
					{items.map((it) => (
						<motion.li
							key={it.n}
							variants={itemVariants}
							className="group border-b border-white/10"
						>
							<a
								href={`#${it.anchor}`}
								className="grid grid-cols-12 items-baseline gap-4 py-6 sm:py-7 transition-colors hover:bg-white/[0.04] -mx-2 px-2"
							>
								<span className="col-span-2 sm:col-span-1 font-sans font-bold text-sm text-white/40 group-hover:text-sky transition-colors">
									{it.n}
								</span>
								<span className="col-span-10 sm:col-span-8 font-display text-2xl sm:text-4xl md:text-5xl font-black uppercase leading-none tracking-tight group-hover:text-sky transition-colors">
									{it.title}
								</span>
								<span className="hidden sm:inline col-span-3 text-sm text-white/50 leading-snug sm:text-right">
									{it.hint}
								</span>
								<span className="hidden sm:inline-flex col-span-1 justify-end">
									<svg
										viewBox="0 0 24 24"
										fill="none"
										aria-hidden="true"
										className="h-5 w-5 text-white/30 group-hover:text-sky group-hover:translate-x-1 transition-all"
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

				<div className="mt-10 flex items-center gap-4 text-sm text-white/40">
					<span className="h-px w-8 bg-white/30" />
					<span>OLA TOURS CORPORATIVO · LUANDA</span>
				</div>
			</div>
		</section>
	);
}
