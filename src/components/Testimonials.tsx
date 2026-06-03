import { motion } from 'motion/react';
import { motion as m, stagger } from '../styles/tokens';

type Testimonial = {
	id: string;
	quote: string;
	name: string;
	title: string;
	country: string;
	visitDate: string;
};

const testimonials: Testimonial[] = [
	{
		id: 'ssh',
		quote: 'Eu e minha equipa fomos muito bem tratados durante a minha estadia em Angola. Agradeço a todos os envolvidos na organização da nossa estadia.',
		name: 'Samia Suluhu Hassan',
		title: 'Presidente da República da Tanzânia',
		country: 'TZA',
		visitDate: 'JUL · 2024',
	},
	{
		id: 'nd',
		quote: 'A equipa da Ola Tours foi muito profissional, pontual e compartilhou comigo informações interessantes sobre a história de Angola durante a nossa visita ao Museu da Escravatura em Luanda.',
		name: 'Ndiamé Diop',
		title: 'Vice-presidente regional do Banco Mundial para África Oriental e Austral',
		country: 'WBG',
		visitDate: 'OUT · 2024',
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

export function Testimonials() {
	return (
		<section
			id="testemunhos"
			className="relative bg-gray-light py-20 sm:py-28 overflow-hidden"
		>
			<div className="pointer-events-none absolute -top-8 -right-8 select-none">
				<span
					className="font-display font-black text-[clamp(6rem,15vw,14rem)] leading-none"
					style={{ color: 'rgba(181, 72, 42, 0.3)' }}
				>
					TESTEMUNHOS
				</span>
			</div>

			<div className="pointer-events-none absolute inset-0 opacity-[0.02]">
				<div className="corporate-grid h-full w-full" />
			</div>

			<div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
				<div className="grid grid-cols-12 gap-6 mb-14 sm:mb-20">
					<div className="col-span-12 lg:col-span-5">
						<span className="accent-bar-flag block mb-4" />
						<h2 className="font-display font-black uppercase leading-[0.86] tracking-tight text-[clamp(2.5rem,6.5vw,5rem)]">
							O que <span className="text-flag">dizem</span> os
							nossos clientes.
						</h2>
					</div>

					<div className="col-span-12 lg:col-span-6 lg:col-start-7 flex items-end">
						<div>
							<p className="text-xl sm:text-2xl leading-relaxed text-ink-soft border-l-2 border-flag pl-5">
								O feedback dos nossos clientes é importante para
								nós, para que possamos continuar a prestar um
								serviço especializado.
							</p>
							<div className="mt-6 label-caps text-ink-mute flex items-center gap-3">
								<span className="h-px w-10 bg-gray-border" />
								<span>FONTE · DIRECTA · AUTORIZADA</span>
							</div>
						</div>
					</div>
				</div>

				<motion.div
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, margin: '-80px' }}
					variants={container}
					className="grid grid-cols-12 gap-6 sm:gap-8"
				>
					{testimonials.map((t) => (
						<TestimonialCard key={t.id} t={t} />
					))}
				</motion.div>
			</div>
		</section>
	);
}

function TestimonialCard({ t }: { t: Testimonial }) {
	const year = t.visitDate.split('·').pop()?.trim() ?? '';

	return (
		<motion.article variants={item} className="col-span-12 lg:col-span-6">
			<div className="relative border border-gray-border rounded-r-lg overflow-hidden transition-all duration-500 card-elevated bg-white">
				<div className="absolute left-0 top-0 bottom-0 w-2 bg-flag" />

				<div className="pointer-events-none absolute top-1 right-4 select-none">
					<span
						className="font-display font-black text-[clamp(3rem,6vw,5rem)] leading-none"
						style={{ color: 'rgba(181, 72, 42, 0.2)' }}
					>
						{year}
					</span>
				</div>

				<div className="p-6 sm:p-8 pl-8 sm:pl-10">
					<div className="flex items-center justify-end gap-4 mb-6">
						<span className="label-caps text-ink-mute shrink-0">
							{t.visitDate}
						</span>
					</div>

					<svg
						viewBox="0 0 80 60"
						fill="none"
						aria-hidden="true"
						className="h-8 sm:h-10 w-auto mb-3 text-flag/40"
					>
						<text
							x="0"
							y="55"
							fontFamily="Barlow Condensed, sans-serif"
							fontWeight="700"
							fontSize="80"
							fill="currentColor"
						>
							”
						</text>
					</svg>

					<blockquote className="text-xl sm:text-2xl leading-[1.4] text-ink">
						{t.quote}
					</blockquote>

					<div className="mt-6 pt-5 border-t border-gray-border">
						<p className="font-display text-lg sm:text-xl font-black leading-tight text-ink">
							{t.name}
						</p>
						<p className="mt-1 text-sm text-ink-soft leading-snug">
							{t.title}
						</p>
					</div>
				</div>
			</div>
		</motion.article>
	);
}
