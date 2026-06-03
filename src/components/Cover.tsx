import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Badge } from './Badge';
import { motion as m, stagger } from '../styles/tokens';

const SLIDES = [
	'https://images.unsplash.com/photo-1569949381669-ecf31ae8f613?w=1600&q=80',
	'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1600&q=80',
	'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600&q=80',
	'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80',
	'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=1600&q=80',
];

const coverStagger = {
	hidden: {},
	show: {
		transition: { staggerChildren: stagger.base, delayChildren: 0.2 },
	},
};

const coverItem = {
	hidden: { opacity: 0, y: 24 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: m.duration.base, ease: m.ease.out },
	},
};

const features = [
	{ label: 'Operação', value: 'Angola + Mundo', hint: '54 países' },
	{ label: 'Experiência', value: 'Desde 2014', hint: '10+ anos' },
	{ label: 'Resposta', value: '24h úteis', hint: 'Proposta personalizada' },
];

export function Cover() {
	const [active, setActive] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setActive((prev) => (prev + 1) % SLIDES.length);
		}, 6000);
		return () => clearInterval(timer);
	}, []);

	return (
		<section id="capa" className="relative h-dvh overflow-hidden bg-navy">
			<div className="absolute inset-0">
				{SLIDES.map((src, i) => (
					<div
						key={i}
						className="absolute inset-0 transition-opacity duration-[1200ms] ease-out"
						style={{ opacity: active === i ? 1 : 0 }}
					>
						<img
							src={src}
							alt=""
							className={`h-full w-full object-cover ${active === i ? 'hero-zoom' : ''}`}
							draggable={false}
						/>
					</div>
				))}
				<div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/50 to-black/70" />
			</div>

			<div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-start px-5 sm:px-8 pt-20 sm:pt-24">
				<motion.div
					variants={coverStagger}
					initial="hidden"
					animate="show"
				>
					<motion.div
						variants={coverItem}
						className="mb-6 flex items-center gap-3"
					>
						<span className="h-px w-10 sm:w-16 bg-sky" />
						<Badge variant="sky" dot>
							Viagens Corporativas · Mobilidade Executiva
						</Badge>
					</motion.div>

					<motion.h1
						variants={coverItem}
						className="font-display font-black uppercase leading-[0.85] tracking-tight text-[clamp(3rem,10vw,8rem)] text-white max-w-5xl"
					>
						<span className="block">Ola Tours</span>
						<span className="block relative">
							<span className="relative z-10">Corporat</span>
							<span className="text-flag italic font-normal tracking-normal normal-case font-sans font-light">
								ivo.
							</span>
						</span>
					</motion.h1>

					<motion.div variants={coverItem} className="mt-6">
						<span className="block w-10 h-px bg-sky mb-5" />
						<p className="text-base sm:text-lg leading-relaxed text-white/80 max-w-xl">
							Viagens corporativas, mobilidade executiva,
							investimento e facilitação de negócios em Angola e
							na África subsariana.
						</p>
					</motion.div>

					<motion.div variants={coverItem} className="mt-6">
						<p className="label-caps text-sky/60">
							Excelência em mobilidade executiva desde 2014
						</p>
					</motion.div>

					<motion.div
						variants={coverItem}
						className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 border-t border-white/20 pt-5 max-w-3xl"
					>
						{features.map((f) => (
							<div
								key={f.label}
								className="flex items-center gap-3"
							>
								<span className="h-2 w-2 shrink-0 rounded-full bg-sky" />
								<div>
									<p className="label-caps text-white/50">
										{f.label}
									</p>
									<p className="font-display text-xl sm:text-2xl font-black leading-tight text-white">
										{f.value}
									</p>
									<p className="text-sm text-white/50">
										{f.hint}
									</p>
								</div>
							</div>
						))}
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
