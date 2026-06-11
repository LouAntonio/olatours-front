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
			className="relative bg-cream py-14 sm:py-20 overflow-hidden"
		>
			<div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
				<div className="grid grid-cols-12 gap-6 mb-8 sm:mb-12">
					<div className="col-span-12 lg:col-span-5">
						<span className="accent-bar-flag block mb-3" />
						<h2 className="font-display font-black uppercase leading-[0.86] tracking-tight text-[clamp(2rem,5vw,3.5rem)]">
							O que <span className="text-flag">dizem</span> os
							nossos clientes.
						</h2>
					</div>

					<div className="col-span-12 lg:col-span-6 lg:col-start-7 flex items-end">
						<div>
							<p className="text-base sm:text-lg leading-relaxed text-ink-soft border-l-2 border-flag pl-4">
								O feedback dos nossos clientes é importante para
								nós, para que possamos continuar a prestar um
								serviço especializado.
							</p>
							<div className="mt-4 label-caps text-ink-mute flex items-center gap-3">
								<span className="h-px w-8 bg-gray-border" />
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
	return (
		<motion.article variants={item} className="col-span-12 lg:col-span-6">
			<div className="relative border border-gray-border/60 rounded-lg overflow-hidden transition-all duration-500 card-elevated bg-white">
				<div className="p-5 sm:p-6">
					<div className="flex items-center justify-between mb-4">
						<span className="font-editorial text-4xl sm:text-5xl leading-none text-flag/30 font-bold italic">
							&ldquo;
						</span>
						<span className="label-caps text-ink-mute shrink-0">
							{t.visitDate}
						</span>
					</div>

					<blockquote className="text-base sm:text-lg leading-[1.4] text-ink font-editorial">
						{t.quote}
					</blockquote>

					<div className="mt-4 pt-4 border-t border-gray-border/50">
						<p className="font-display text-base sm:text-lg font-black leading-tight text-ink">
							{t.name}
						</p>
						<p className="mt-0.5 text-sm text-ink-soft leading-snug">
							{t.title}
						</p>
					</div>
				</div>
			</div>
		</motion.article>
	);
}
