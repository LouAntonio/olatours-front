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

			<div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-center items-center px-5 sm:px-8 pb-48 sm:pb-36">
				<motion.div
					variants={coverStagger}
					initial="hidden"
					animate="show"
				>
					<motion.div
						variants={coverItem}
						className="mb-8 flex items-center justify-center gap-4"
					>
						<span className="h-px w-8 bg-white/20" />
						<Badge variant="sky" dot>
							Viagens Corporativas · Mobilidade Executiva
						</Badge>
						<span className="h-px w-8 bg-white/20" />
					</motion.div>
					<motion.div
						variants={coverItem}
						className="mt-6 sm:mt-8 text-center"
					>
						<p className="text-base sm:text-lg leading-relaxed text-white/70 max-w-2xl mx-auto">
							Viagens corporativas, mobilidade executiva,
							investimento e facilitação de negócios em{' '}
							<span className="text-flag font-medium">
								Angola
							</span>{' '}
							e na{' '}
							<span className="text-flag font-medium">
								África subsariana
							</span>
							.
						</p>
					</motion.div>

					<motion.div
						variants={coverItem}
						className="mt-5 text-center"
					>
						<p className="label-caps text-sky/50 tracking-[0.18em]">
							Excelência em mobilidade executiva desde{' '}
							<span className="text-flag font-semibold">
								2014
							</span>
						</p>
					</motion.div>
				</motion.div>
			</div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					duration: m.duration.slow,
					ease: m.ease.out,
					delay: 0.8,
				}}
				className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/60 to-transparent pt-12 sm:pt-16"
			>
				<div className="mx-auto max-w-[1400px] px-5 sm:px-8 pb-5 sm:pb-6">
					<div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0 border-t border-white/10 pt-5">
						{features.map((f) => (
							<div
								key={f.label}
								className="flex items-center justify-center sm:px-6 sm:border-r sm:border-white/10 last:border-r-0 w-full sm:w-auto"
							>
								<div className="text-center">
									<p className="label-caps text-white/40">
										{f.label}
									</p>
									<p className="font-display text-xl sm:text-2xl font-black leading-tight text-white">
										{f.value === 'Angola + Mundo' ? (
											<>
												<span className="text-flag">
													Angola
												</span>{' '}
												+ Mundo
											</>
										) : f.value === 'Desde 2014' ? (
											<>
												Desde{' '}
												<span className="text-flag">
													2014
												</span>
											</>
										) : (
											f.value
										)}
									</p>
									<p className="text-xs text-white/40 mt-0.5">
										{f.hint}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</motion.div>
		</section>
	);
}
